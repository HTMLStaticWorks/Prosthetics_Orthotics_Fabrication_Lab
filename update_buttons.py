import os
import re

def update_button_classes(match):
    tag = match.group(0)
    # Check if it's a white-style button or the previous Explore Solutions edit
    if ('glass-panel' in tag and ('text-gray-900' in tag or 'text-gray-600' in tag)) or \
       ('bg-white' in tag and 'text-brand-primary' in tag) or \
       ('bg-brand-primary/60' in tag):
        
        # Remove the offending classes
        tag = re.sub(r'\b(glass-panel|bg-white|bg-brand-primary/60|text-gray-\d+|text-brand-primary|hover:bg-gray-[^\s]+|dark:[^\s\"]+|border-[^\s\"]+)\b', '', tag)
        
        # Inject the new classes
        tag = re.sub(r'class="([^"]*)"', r'class="\1 bg-brand-secondary hover:bg-brand-secondary/90 text-white border-transparent shadow-md"', tag)
        
        # Clean up multiple spaces
        tag = re.sub(r'\s+', ' ', tag).replace(' "', '"')
        return tag
    return tag

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace a and button tags
            new_content = re.sub(r'<a [^>]+>|<button [^>]+>', update_button_classes, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f'Updated buttons in {f}')
