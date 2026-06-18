import os
import glob
import re

base_dir = r"c:\Users\Shalani A\Documents\Shalan\Client Projects(JUNE)\Prosthetics & Orthotics Fabrication Lab\Prosthetics_Orthotics_Fabrication_Lab"
html_files = [os.path.join(base_dir, 'index.html')] + glob.glob(os.path.join(base_dir, 'pages', '*.html'))

for file_path in html_files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We want to add dark:bg-[#0A0A0A] dark:text-gray-100 to the body tag if it's not there
    # Current body tag: <body class="bg-white text-gray-900 min-h-screen flex flex-col font-sans transition-colors duration-300">
    # Let's use regex to replace <body class="..."> safely
    
    def replace_body_class(match):
        class_str = match.group(1)
        # Check if already has dark mode classes
        if 'dark:bg-[#0A0A0A]' not in class_str and 'dark:bg-black' not in class_str:
            class_str += ' dark:bg-[#0A0A0A] dark:text-gray-100'
        return f'<body class="{class_str}">'
    
    new_content = re.sub(r'<body\s+class="([^"]+)">', replace_body_class, content)
    
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")
