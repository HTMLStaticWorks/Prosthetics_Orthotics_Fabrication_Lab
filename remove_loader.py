import os

file_path = "assets/js/main.js"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find start and end indices
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "// 1. Create loader elements dynamically" in line:
        start_idx = i
    if start_idx != -1 and "function hideLoader()" in line:
        # The hideLoader function ends 3 lines down from here
        end_idx = i + 3
        break

if start_idx != -1 and end_idx != -1:
    replacement = [
        "  // 1. Loader functions (disabled)\n",
        "  function showLoader() {}\n",
        "  function hideLoader() {}\n\n"
    ]
    # Replace lines
    lines[start_idx:end_idx+1] = replacement
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print("Successfully removed the SPA preloader overlay.")
else:
    print("Could not find the preloader logic bounds.")
