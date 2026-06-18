import re

filepath = 'assets/js/main.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_footer = """const MASTER_FOOTER = `
    <footer class="bg-white text-gray-700 dark:bg-[#0A0A0A] dark:text-gray-300 border-t border-gray-200 dark:border-[#171717] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <!-- Column 1: Branding -->
          <div class="space-y-4">
            <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-brand-secondary">
                <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6s2-8 6-8 8 2.5 8 6.5-1.5 5-4.5 6.5-4 1.5-7 1z" />
                <circle cx="12" cy="10" r="3" />
                <path d="M12 13v7M9 20h6" />
              </svg>
              <span class="font-heading font-semibold text-xl text-gray-900 dark:text-white tracking-wide">ApexFlex</span>
            </a>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              State-of-the-art orthotics and prosthetics fabrication lab. Restoring patient confidence and biological walking capacity via advanced design.
            </p>
            <!-- Social Icons -->
            <div class="flex space-x-4 rtl:space-x-reverse pt-2">
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="LinkedIn">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="Twitter">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="YouTube">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation Links -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Solutions</h4>
            <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><a href="index.html" class="hover:text-brand-secondary transition-colors">Home 1</a></li>
              <li><a href="pages/home2.html" class="hover:text-brand-secondary transition-colors">Home 2</a></li>
              <li><a href="pages/about.html" class="hover:text-brand-secondary transition-colors">About Journey</a></li>
              <li><a href="pages/services.html" class="hover:text-brand-secondary transition-colors">Lab Services</a></li>
            </ul>
          </div>

          <!-- Column 3: Resources -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Resources</h4>
            <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><a href="pages/case-studies.html" class="hover:text-brand-secondary transition-colors">Case Analytics</a></li>
              <li><a href="pages/blog.html" class="hover:text-brand-secondary transition-colors">Clinical Blog</a></li>
              <li><a href="pages/contact.html" class="hover:text-brand-secondary transition-colors">Contact & Map</a></li>
              <li><a href="pages/login.html" class="hover:text-brand-secondary transition-colors">Portal Access</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact Info -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Lab Contact</h4>
            <address class="not-italic text-xs text-gray-600 dark:text-gray-400 space-y-2">
              <p class="flex items-start"><i data-lucide="map-pin" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 mt-0.5 flex-shrink-0"></i> 104 Bio-Medical Dr, Suite D, Seattle, WA 98101</p>
              <p class="flex items-center"><i data-lucide="phone" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> +1 (800) 555-0199</p>
              <p class="flex items-center"><i data-lucide="mail" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> support@apexflexlab.com</p>
              <p class="flex items-center"><i data-lucide="clock" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> Mon-Fri: 8:00 AM - 5:00 PM</p>
            </address>
          </div>

        </div>

        <!-- Bottom Copyright Bar -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-[#171717] text-center text-xs text-gray-600 dark:text-gray-500 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>© 2026 ApexFlex, Inc. All rights reserved.</p>
          <a href="#" class="p-2.5 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all border border-gray-200 dark:border-[#222222] hover:border-brand-secondary flex items-center justify-center" aria-label="Back to top">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  `;"""

new_content = re.sub(r'const MASTER_FOOTER = `.*?`;', new_footer, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
    print("Footer updated successfully.")
