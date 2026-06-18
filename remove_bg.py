import re

with open('pages/services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the patient-journey section
start_tag = '<section id="patient-journey"'
end_tag = '</section>'
start_idx = content.find(start_tag)
if start_idx != -1:
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    section_content = content[start_idx:end_idx]
    
    # Remove the immersive background blocks
    bg_regex = r'<!-- ═══ IMMERSIVE BACKGROUND SYSTEM ═══ -->.*?id="pj-canvas"></div>'
    section_content = re.sub(bg_regex, '', section_content, flags=re.DOTALL)
    
    # Remove inline style for padding that might have dark colors or keep it?
    # style="padding: 100px 0 120px;" is fine.
    
    # Change text colors
    section_content = section_content.replace('text-white', 'text-gray-900')
    section_content = section_content.replace('text-slate-400', 'text-gray-600')
    
    # Tweak badges and nodes that use dark rgba
    section_content = section_content.replace('background: rgba(0,0,0,0.6)', 'background: rgba(255,255,255,0.9)')
    section_content = section_content.replace('border: 1px solid rgba(255,255,255,0.1)', 'border: 1px solid rgba(0,0,0,0.1)')
    
    # Replace the section in the full content
    new_content = content[:start_idx] + section_content + content[end_idx:]
    
    with open('pages/services.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated patient journey section.')
else:
    print('Could not find patient-journey section.')
