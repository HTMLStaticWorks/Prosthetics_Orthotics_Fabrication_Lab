import os
import re

files_to_fix = [
    'pages/about.html',
    'pages/blog.html',
    'pages/case-studies.html',
    'pages/contact.html',
    'pages/services.html'
]

for filepath in files_to_fix:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the incorrectly modified h1 text color back to text-white
        new_content = re.sub(
            r'<h1([^>]*)text-gray-900 dark:text-white([^>]*)>',
            r'<h1\1text-white\2>',
            content
        )
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Restored h1 text-white in {filepath}")
        else:
            print(f"No changes needed in {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
