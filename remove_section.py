import os

file_path = "pages/case-studies.html"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# The section starts at line 585 and ends at 704 (inclusive, 1-indexed)
# Let's dynamically find it just in case line numbers shifted slightly
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "<!-- SECTION 4: CLINICAL JOURNEY TIMELINE -->" in line:
        start_idx = i
    if start_idx != -1 and i > start_idx and "</section>" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    del lines[start_idx:end_idx+1]
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print("Successfully removed the Clinical Fitting Journey section.")
else:
    print("Could not find the section boundaries.")
