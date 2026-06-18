import os
import glob
import re

files = glob.glob('**/*.html', recursive=True)

# We want to replace text-white and text-brand-light with text-gray-900 dark:text-white
# BUT only within the context of the hero section elements.
# Since these classes might be used elsewhere safely (like inside buttons or dark mode footers),
# let's be very specific about replacing them inside headings or specific paragraphs in hero sections.

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # 1. Replace text-white in H1
    new_content = re.sub(
        r'<h1([^>]*)text-white([^>]*)>',
        r'<h1\1text-gray-900 dark:text-white\2>',
        new_content
    )
    
    # 2. Replace text-brand-light in P below H1
    new_content = re.sub(
        r'<p([^>]*)text-brand-light([^>]*)>',
        r'<p\1text-gray-600 dark:text-brand-light\2>',
        new_content
    )
    
    # 3. Replace text-brand-light/90 in P
    new_content = re.sub(
        r'<p([^>]*)text-brand-light/90([^>]*)>',
        r'<p\1text-gray-600 dark:text-brand-light/90\2>',
        new_content
    )

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
