import os
import glob
import re

# Get all html files
base_dir = r"c:\Users\Shalani A\Documents\Shalan\Client Projects(JUNE)\Prosthetics & Orthotics Fabrication Lab\Prosthetics_Orthotics_Fabrication_Lab"
html_files = [os.path.join(base_dir, 'index.html')] + glob.glob(os.path.join(base_dir, 'pages', '*.html'))

for file_path in html_files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update <div id="nav-container"> to be fixed
    content = content.replace('<div id="nav-container">', '<div id="nav-container" class="fixed top-0 left-0 right-0 z-[100] w-full">')
    
    # 2. Update actual-content to have pt-[80px]
    # In some files it might be <div class="actual-content opacity-0 flex-1 flex flex-col">
    # Let's use regex in case of slight spacing differences
    content = re.sub(r'<div class="actual-content opacity-0 flex-1 flex flex-col">', 
                     r'<div class="actual-content opacity-0 flex-1 flex flex-col pt-[80px]">', 
                     content)
    
    # 3. Remove sticky top-0 z-50 from nav
    content = content.replace('sticky top-0 z-50 ', '')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Updated all HTML files for fixed header.")
