import re

file_path = "pages/home2.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the ridiculous repeated dark classes and text-gray-600 with text-brand-light
pattern = r'text-gray-600(?: dark:text-gray-600)*(?: dark:text-brand-light)*'
new_content = re.sub(pattern, 'text-brand-light', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Fixed text visibility in CTA section.")
