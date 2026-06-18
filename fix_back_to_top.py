import os
import re

file_path = "assets/js/main.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(
    r"document\.body\.addEventListener\('click',\s*e\s*=>\s*\{\s*const link = e\.target\.closest\('a'\);\s*if \(!link\) return;\s*const href = link\.getAttribute\('href'\);\s*if \(!href \|\| href\.startsWith\('#'\) \|\| href\.startsWith\('http'\) \|\| href\.startsWith\('mailto'\) \|\|\s*href\.startsWith\('tel'\) \|\| link\.getAttribute\('target'\) === '_blank'\) return;\s*e\.preventDefault\(\);\s*navigateTo\(link\.href\);\s*\}\);",
    re.MULTILINE | re.DOTALL
)

new_code = """document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;
  
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.getAttribute('target') === '_blank') {
          if (link.getAttribute('aria-label') === 'Back to top' || href === '#') {
            e.preventDefault();
            if (window.lenis) {
              window.lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
          return;
        }
  
        e.preventDefault();
        navigateTo(link.href);
      });"""

content, num_replacements = pattern.subn(new_code, content)

if num_replacements > 0:
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully patched main.js using regex")
else:
    print("Code still not found.")
