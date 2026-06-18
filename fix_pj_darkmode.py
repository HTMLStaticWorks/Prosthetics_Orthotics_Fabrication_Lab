import os
import re

file_path = "pages/services.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Isolate the patient journey section
match = re.search(r'(<section id="patient-journey".*?</section>)', content, re.DOTALL)
if match:
    section_html = match.group(1)
    
    # 1. Add dark theme background to the section itself
    section_html = section_html.replace('class="relative overflow-hidden"', 'class="relative overflow-hidden bg-white dark:bg-black"')
    
    # 2. Fix text colors inside the section
    # headings and dark text
    section_html = section_html.replace('text-gray-900', 'text-gray-900 dark:text-white')
    # body text
    section_html = section_html.replace('text-gray-600', 'text-gray-600 dark:text-gray-400')
    # slate text
    section_html = section_html.replace('text-slate-500', 'text-slate-500 dark:text-gray-400')
    
    # Also, some SVG icons in the center nodes have text-gray-900, which will now be text-gray-900 dark:text-white. That's fine.
    # The stats text also have text-gray-900, which will become dark:text-white. That's perfect.
    
    # Replace in the main content
    new_content = content[:match.start()] + section_html + content[match.end():]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully updated patient journey section for dark mode!")
else:
    print("Could not find patient journey section.")
