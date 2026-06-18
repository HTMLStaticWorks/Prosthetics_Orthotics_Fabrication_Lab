import os

file_path = "assets/js/case-studies-animations.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the start
if 'document.addEventListener("DOMContentLoaded", () => {' in content:
    content = content.replace(
        'document.addEventListener("DOMContentLoaded", () => {', 
        'function initCaseStudiesAnimations() {'
    )
    
    # Replace the end
    # We need to find the last }); and replace it.
    if content.endswith('});\n') or content.endswith('});'):
        # rsplit to replace only the last occurrence
        content = content.rsplit('});', 1)
        content = '}\n\nif (document.readyState === "loading") {\n  document.addEventListener("DOMContentLoaded", initCaseStudiesAnimations);\n} else {\n  initCaseStudiesAnimations();\n}'.join(content)
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully patched case-studies-animations.js")
else:
    print("Could not find DOMContentLoaded wrapper.")
