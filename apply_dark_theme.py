import os
import glob
import re

files = glob.glob('**/*.html', recursive=True)
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # Backgrounds
    new_content = new_content.replace('dark:bg-gray-955', 'dark:bg-black')
    new_content = new_content.replace('dark:bg-gray-950', 'dark:bg-black')
    new_content = new_content.replace('dark:bg-gray-900/40', 'dark:bg-[#0A0A0A]')
    new_content = new_content.replace('dark:bg-gray-900/50', 'dark:bg-[#0A0A0A]')
    new_content = new_content.replace('dark:bg-gray-900', 'dark:bg-[#111111]')
    new_content = new_content.replace('dark:bg-gray-855', 'dark:bg-[#171717]')
    new_content = new_content.replace('dark:bg-gray-850', 'dark:bg-[#171717]')
    new_content = new_content.replace('dark:bg-gray-800', 'dark:bg-[#171717]')
    
    # Opacities
    new_content = new_content.replace('bg-gray-950/40', 'bg-gray-900/10 dark:bg-black/40')
    new_content = new_content.replace('bg-gray-950/80', 'bg-white/80 dark:bg-black/80')
    new_content = new_content.replace('bg-gray-900/50', 'bg-gray-100/50 dark:bg-[#0A0A0A]')
    
    # Borders
    new_content = new_content.replace('dark:border-gray-900', 'dark:border-[#171717]')
    new_content = new_content.replace('dark:border-gray-800', 'dark:border-[#222222]')
    
    # Hero Sections
    new_content = new_content.replace(
        'bg-gradient-to-r from-brand-primary to-indigo-900 text-white',
        'bg-gradient-to-r from-brand-light to-white dark:from-black dark:to-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-brand-primary via-brand-primary to-indigo-950 text-white',
        'bg-gradient-to-br from-brand-light via-white to-brand-light/50 dark:from-black dark:via-[#0A0A0A] dark:to-black text-gray-900 dark:text-white transition-colors duration-300'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-brand-primary via-indigo-900 to-brand-purple text-white',
        'bg-gradient-to-br from-brand-light via-white to-brand-light/50 dark:from-black dark:via-[#0A0A0A] dark:to-black text-gray-900 dark:text-white transition-colors duration-300'
    )
    
    # Remove lingering text-brand-light / text-white / border-white/20 in light-mode hero sections
    # Wait, doing this globally is safer via targeted replaces where they matter.
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
