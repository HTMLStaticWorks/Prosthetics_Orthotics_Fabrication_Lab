import os

file_path = "pages/case-studies.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the group div classes
old_class = 'class="flex-1 flex flex-col items-center group"'
new_class = 'class="h-full flex-1 flex flex-col items-center justify-end group"'

content = content.replace(old_class, new_class)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Replaced {content.count(new_class)} instances to fix bar heights.")
