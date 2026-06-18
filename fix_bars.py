import os

file_path = "pages/case-studies.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The conflicting class is: w-full bg-gray-200 dark:bg-[#171717] h-0 rounded-t-lg transition-all duration-700 bg-brand-primary group-hover:bg-brand-secondary
# And for the last bar: w-full bg-gray-200 dark:bg-[#171717] h-0 rounded-t-lg transition-all duration-700 bg-brand-secondary

content = content.replace(
    'class="w-full bg-gray-200 dark:bg-[#171717] h-0 rounded-t-lg transition-all duration-700 bg-brand-primary group-hover:bg-brand-secondary"',
    'class="w-full h-0 rounded-t-lg transition-all duration-700 bg-brand-primary group-hover:bg-brand-secondary"'
)

content = content.replace(
    'class="w-full bg-gray-200 dark:bg-[#171717] h-0 rounded-t-lg transition-all duration-700 bg-brand-secondary"',
    'class="w-full h-0 rounded-t-lg transition-all duration-700 bg-brand-secondary"'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed conflicting background classes on graph bars.")
