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
        
        # We want the h1 in the header/hero section to be purely text-white.
        # Find <h1 ...> and clean up its classes.
        def clean_h1(match):
            attrs = match.group(1)
            # Remove all erroneous text colors
            attrs = re.sub(r'\btext-gray-900\b', '', attrs)
            attrs = re.sub(r'\bdark:text-gray-900\b', '', attrs)
            attrs = re.sub(r'\bdark:text-white\b', '', attrs)
            attrs = re.sub(r'\btext-white\b', '', attrs)
            # Normalize spaces
            attrs = re.sub(r'\s+', ' ', attrs)
            return f'<h1{attrs} text-white>'

        content = re.sub(r'<h1([^>]*)>', clean_h1, content)
        
        # Let's also check if there are paragraph texts that got corrupted.
        def clean_p(match):
            attrs = match.group(1)
            # If this is the specific hero paragraph that had text-brand-light originally
            if 'text-gray-600' in attrs or 'dark:text-brand-light' in attrs:
                attrs = re.sub(r'\btext-gray-600\b', '', attrs)
                attrs = re.sub(r'\bdark:text-gray-600\b', '', attrs)
                attrs = re.sub(r'\bdark:text-brand-light(?:/90)?\b', '', attrs)
                attrs = re.sub(r'\btext-brand-light(?:/90)?\b', '', attrs)
                attrs = re.sub(r'\s+', ' ', attrs)
                return f'<p{attrs} text-brand-light/90>'
            return match.group(0)

        # Apply clean_p only to the first paragraph in the hero section. 
        # Actually, let's just restore any paragraph that has text-gray-600 AND dark:text-brand-light
        content = re.sub(r'<p([^>]*(?:text-gray-600|dark:text-brand-light)[^>]*)>', clean_p, content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned headers in {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
