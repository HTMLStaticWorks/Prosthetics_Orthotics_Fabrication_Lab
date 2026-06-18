import os

filepath = 'index.html'

old_vars = [
    "'var(--color-primary)'",
    "'var(--color-secondary)'",
    "'var(--color-accent)'",
    "'var(--color-dark)'",
    "'var(--color-light)'"
]

new_vars = [
    "'rgb(var(--rgb-primary) / <alpha-value>)'",
    "'rgb(var(--rgb-secondary) / <alpha-value>)'",
    "'rgb(var(--rgb-accent) / <alpha-value>)'",
    "'rgb(var(--rgb-dark) / <alpha-value>)'",
    "'rgb(var(--rgb-light) / <alpha-value>)'"
]

try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = content
    for old, new in zip(old_vars, new_vars):
        new_content = new_content.replace(old, new)
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
except Exception as e:
    print(f"Error on {filepath}: {e}")
