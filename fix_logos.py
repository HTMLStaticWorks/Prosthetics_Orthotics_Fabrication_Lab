import os
import glob
import re

canonical_logo_root = """<a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse" style="display: flex !important; flex-direction: row !important; align-items: center !important; gap: 8px !important;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#0F4C81] dark:text-[#67E8F9]" style="flex-shrink: 0 !important;">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6s2-8 6-8 8 2.5 8 6.5-1.5 5-4.5 6.5-4 1.5-7 1z" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 13v7M9 20h6" />
                </svg>
                <span class="font-heading font-semibold text-2xl tracking-tight bg-gradient-to-r from-[#0F4C81] via-[#0F4C81] to-[#14B8A6] bg-clip-text text-transparent dark:from-[#67E8F9] dark:via-[#67E8F9] dark:to-[#67E8F9]">
                  ApexFlex
                </span>
              </a>"""

canonical_logo_parent = canonical_logo_root.replace('href="index.html"', 'href="../index.html"')

def replace_logos(filepath, is_auth=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find an <a> tag that contains the SVG logo path and the word ApexFlex
    # The SVG path is `M4.5 16.5c-1.5...`
    # We will match the entire <a> ... </a> block.
    pattern = r'<a[^>]*href=["\'](?:(?:../)?index\.html)?["\'][^>]*>\s*<svg[^>]*>.*?<path d="M4\.5 16\.5c-1\.5-1\.5-2\.5-3\.5-2\.5-6.*?<\/svg>\s*<span[^>]*>\s*ApexFlex\s*<\/span>\s*<\/a>'
    
    new_content = re.sub(
        pattern,
        canonical_logo_parent if is_auth else canonical_logo_root,
        content,
        flags=re.DOTALL
    )

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated logos in {filepath}")

replace_logos('assets/js/main.js', False)
replace_logos('index.html', False)
replace_logos('pages/login.html', True)
replace_logos('pages/signup.html', True)
