import re

file_path = "pages/services.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix the main stats strip container
old_container = """<div class="mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden pj-fade-up"
            style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(16px);">"""

new_container = """<div class="mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden pj-fade-up bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 backdrop-blur-md">"""

content = content.replace(old_container, new_container)

# 2. Fix the inner borders
content = content.replace('border-r border-white/5', 'border-r border-gray-200 dark:border-white/5')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated stats strip styles successfully!")
