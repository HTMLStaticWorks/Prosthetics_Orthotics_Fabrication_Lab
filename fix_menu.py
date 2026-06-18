import os

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Add flex flex-col to mobile menu inner wrapper
            content = content.replace('<div class="px-4 pt-2 pb-6 space-y-2">', '<div class="px-4 pt-2 pb-6 space-y-2 flex flex-col">')
            
            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
print('Fixed mobile menu layout across all files.')
