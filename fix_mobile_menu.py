import re

file_path = "assets/js/main.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_function = """  function updateActiveNavLink(targetPath) {
    const targetBasename = targetPath.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu-link').forEach(a => {
      const origHref = a.getAttribute('data-orig-href') || a.getAttribute('href');
      if (!origHref) return;
      const linkBasename = origHref.split('/').pop();
      
      if (linkBasename === targetBasename) {
        a.className = 'nav-menu-link text-[#0F4C81] dark:text-[#67E8F9] font-bold';
      } else {
        a.className = 'nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300';
      }
    });
  }"""

new_function = """  function updateActiveNavLink(targetPath) {
    const targetBasename = targetPath.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu-link').forEach(a => {
      const origHref = a.getAttribute('data-orig-href') || a.getAttribute('href');
      if (!origHref) return;
      const linkBasename = origHref.split('/').pop();
      
      const isMobile = a.closest('#mobile-menu') !== null;
      
      if (linkBasename === targetBasename) {
        if (isMobile) {
          a.className = 'nav-menu-link block w-full px-3 py-2.5 rounded-xl text-brand-primary dark:text-brand-secondary bg-brand-light dark:bg-[#171717] font-semibold';
        } else {
          a.className = 'nav-menu-link text-brand-primary dark:text-brand-secondary font-bold';
        }
      } else {
        if (isMobile) {
          a.className = 'nav-menu-link block w-full px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors font-medium text-gray-700 dark:text-gray-300';
        } else {
          a.className = 'nav-menu-link hover:text-brand-primary dark:hover:text-brand-secondary transition-colors font-medium text-gray-700 dark:text-gray-300';
        }
      }
    });
  }"""

if old_function in content:
    content = content.replace(old_function, new_function)
    print("Function replaced exactly.")
else:
    # Fallback to regex if whitespace is different
    pattern = re.compile(r"  function updateActiveNavLink\(targetPath\).*?\}\n  \}", re.DOTALL)
    content = pattern.sub(new_function, content)
    print("Function replaced using regex.")

# ALSO, the mobile menu drawer has `<div class="px-4 pt-2 pb-6 space-y-2">`. The user says "mobile menu does not open in a proper vertical list ... Add proper spacing (gap-4 or gap-5) between menu items. Center-align menu items or left-align consistently".
# Let's change space-y-2 to flex flex-col space-y-4 to be safe.
content = content.replace(
    '<div class="px-4 pt-2 pb-6 space-y-2">',
    '<div class="px-4 pt-4 pb-8 flex flex-col space-y-3">'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
