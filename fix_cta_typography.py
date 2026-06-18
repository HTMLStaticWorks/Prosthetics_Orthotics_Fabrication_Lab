import re

file_path = "pages/case-studies.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix the H2
content = content.replace(
    '<h2 class="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">',
    '<h2 class="text-3xl sm:text-5xl font-extrabold font-heading text-gray-950 dark:text-white tracking-tight leading-tight">'
)

# 2. Fix the P
content = content.replace(
    '<p class="text-sm sm:text-base text-gray-300 max-w-xl font-normal leading-relaxed">',
    '<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl font-normal leading-relaxed">'
)

# 3. Fix the secondary button
old_button = '<a href="contact.html" class="px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-2xl text-center font-bold transition-all border border-white/20 magnetic-btn">'
new_button = '<a href="contact.html" class="px-8 py-4 glass-panel hover:bg-gray-100 dark:hover:bg-white/10 text-brand-primary dark:text-white rounded-2xl text-center font-bold transition-all border-gray-200 dark:border-white/20 magnetic-btn">'
content = content.replace(old_button, new_button)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated case-studies CTA section typography for light mode.")
