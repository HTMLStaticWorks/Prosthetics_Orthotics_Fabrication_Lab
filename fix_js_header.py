import os

file_path = r"assets\js\main.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove sticky top-0 z-50 from MASTER_HEADER
content = content.replace(
    '<nav class="glass-panel sticky top-0 z-50 transition-colors duration-300',
    '<nav class="glass-panel transition-colors duration-300'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated MASTER_HEADER in main.js")
