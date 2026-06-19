import os
import re

html_files = [
    'index.html',
    'pages/home2.html',
    'pages/about.html',
    'pages/blog.html',
    'pages/case-studies.html',
    'pages/contact.html',
    'pages/services.html',
    'pages/signup.html',
    'pages/login.html'
]

insertion_code = """          <div class="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2">
            <!-- Theme Toggle -->
            <button class="theme-toggle flex-1 flex items-center justify-center p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-200" aria-label="Toggle theme">
              <i data-lucide="moon" class="w-5 h-5 theme-toggle-moon"></i>
              <i data-lucide="sun" class="w-5 h-5 theme-toggle-sun hidden"></i>
            </button>
            
            <!-- RTL Toggle -->
            <button class="rtl-toggle flex-1 flex items-center justify-center p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-200" aria-label="Toggle RTL mode">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>
          </div>
"""

for fname in html_files:
    if not os.path.exists(fname): continue
    
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
        
    modified = False
        
    # 1. Clean the mobile header area
    # We want to find: <div class="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">
    # And everything up to <button id="mobile-menu-btn"
    
    # Let's split the document exactly at the mobile header div
    search_str = '<div class="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">'
    if search_str in content:
        parts = content.split(search_str)
        # The second part contains our toggles and the mobile menu btn
        sub_parts = parts[1].split('<button id="mobile-menu-btn"', 1)
        
        if len(sub_parts) == 2:
            between_str = sub_parts[0]
            # If there's theme-toggle or rtl-toggle in between_str, we remove them by replacing between_str with whitespace
            if 'theme-toggle' in between_str or 'rtl-toggle' in between_str:
                parts[1] = '\n              <button id="mobile-menu-btn"' + sub_parts[1]
                content = parts[0] + search_str + parts[1]
                modified = True
                print(f"Removed toggles from header in {fname}")

    # 2. Insert into mobile drawer
    # Check if the drawer already has the toggles
    # We search for: <div id="mobile-menu"
    if '<div id="mobile-menu"' in content:
        drawer_parts = content.split('<div id="mobile-menu"')
        drawer_content = drawer_parts[1]
        
        # Determine if it already has the toggles
        if 'class="theme-toggle' not in drawer_content:
            # We need to insert it
            # Let's find a good insertion point. 
            # In index.html, it's just before <div class="border-t border-gray-200 dark:border-gray-200 my-2"></div>
            # Or <div class="border-t border-gray-200 dark:border-gray-850 my-2"></div>
            
            border_match = re.search(r'<div class="border-t border-gray-200 dark:border-gray-[^>]+ my-2"></div>', drawer_content)
            if border_match:
                border_str = border_match.group(0)
                drawer_parts[1] = drawer_content.replace(border_str, insertion_code + '          ' + border_str)
                content = drawer_parts[0] + '<div id="mobile-menu"' + drawer_parts[1]
                modified = True
                print(f"Inserted toggles into drawer in {fname}")
            else:
                # If no border found, maybe insert before <a href="signup.html"
                signup_match = re.search(r'<a href="[^"]*signup\.html"[^>]*>', drawer_content)
                if signup_match:
                    signup_str = signup_match.group(0)
                    drawer_parts[1] = drawer_content.replace(signup_str, insertion_code + '          ' + signup_str)
                    content = drawer_parts[0] + '<div id="mobile-menu"' + drawer_parts[1]
                    modified = True
                    print(f"Inserted toggles into drawer (before signup) in {fname}")

    if modified:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(content)
