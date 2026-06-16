document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrengthMeter();
  initFormValidations();
});

// Password Eye Toggler
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the corresponding input inside the parent or sibling
      const input = btn.previousElementSibling;
      if (!input || input.tagName !== 'INPUT') return;
      
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Toggle eye icon
      const eyeIcon = btn.querySelector('.eye-icon');
      const eyeOffIcon = btn.querySelector('.eye-off-icon');
      
      if (eyeIcon && eyeOffIcon) {
        eyeIcon.classList.toggle('hidden');
        eyeOffIcon.classList.toggle('hidden');
      }
    });
  });
}

// Password Strength Meter
function initPasswordStrengthMeter() {
  const passwordInput = document.getElementById('signup-password');
  const strengthBar = document.getElementById('password-strength-bar');
  const strengthText = document.getElementById('password-strength-text');
  
  if (!passwordInput || !strengthBar) return;
  
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;
    
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    
    // Reset strength bar style
    strengthBar.className = 'h-1.5 rounded-full transition-all duration-300 w-0';
    
    if (val.length === 0) {
      if (strengthText) strengthText.textContent = '';
      return;
    }
    
    if (score <= 2) {
      strengthBar.classList.add('w-1/3', 'bg-red-500');
      if (strengthText) {
        strengthText.textContent = 'Weak';
        strengthText.className = 'text-xs text-red-500 font-medium';
      }
    } else if (score === 3 || score === 4) {
      strengthBar.classList.add('w-2/3', 'bg-yellow-500');
      if (strengthText) {
        strengthText.textContent = 'Moderate';
        strengthText.className = 'text-xs text-yellow-500 font-medium';
      }
    } else if (score >= 5) {
      strengthBar.classList.add('w-full', 'bg-green-500');
      if (strengthText) {
        strengthText.textContent = 'Strong';
        strengthText.className = 'text-xs text-green-500 font-medium';
      }
    }
  });
}

// Form Validations
function initFormValidations() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        // Clear previous error styles
        clearInputError(input);
        
        if (!input.value.trim()) {
          isValid = false;
          showInputError(input, 'This field is required.');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          showInputError(input, 'Please enter a valid email address.');
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
          isValid = false;
          showInputError(input, 'Please enter a valid phone number.');
        } else if (input.type === 'checkbox' && !input.checked) {
          isValid = false;
          showInputError(input, 'You must agree to the terms to proceed.');
        } else if (input.id === 'signup-password' && input.value.length < 8) {
          isValid = false;
          showInputError(input, 'Password must be at least 8 characters long.');
        } else if (input.id === 'signup-confirm-password') {
          const mainPass = document.getElementById('signup-password')?.value;
          if (input.value !== mainPass) {
            isValid = false;
            showInputError(input, 'Passwords do not match.');
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Scroll to the first error
        const firstError = form.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Successful submission mock/alert
        e.preventDefault();
        showFormSuccessModal(form);
      }
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^\+?[\d\s\-()]{7,20}$/;
  return re.test(String(phone).toLowerCase());
}

function showInputError(input, message) {
  input.classList.add('border-red-500', 'focus:ring-red-500');
  input.classList.remove('border-gray-300', 'focus:ring-purple-500', 'dark:border-gray-700');
  
  // Find or create error label
  let errorEl = input.parentNode.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'error-message text-xs text-red-500 mt-1';
    // Append properly depending on password wrapper structures
    if (input.parentNode.classList.contains('relative') && input.nextElementSibling?.classList.contains('password-toggle')) {
      input.parentNode.parentNode.appendChild(errorEl);
    } else {
      input.parentNode.appendChild(errorEl);
    }
  }
  errorEl.textContent = message;
}

function clearInputError(input) {
  input.classList.remove('border-red-500', 'focus:ring-red-500');
  input.classList.add('border-gray-300', 'dark:border-gray-700');
  
  let errorEl = input.parentNode.querySelector('.error-message');
  if (!errorEl && input.parentNode.classList.contains('relative') && input.nextElementSibling?.classList.contains('password-toggle')) {
    errorEl = input.parentNode.parentNode.querySelector('.error-message');
  }
  if (errorEl) {
    errorEl.remove();
  }
}

// Success feedback modal for demonstration
function showFormSuccessModal(form) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';
  
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const successTitle = isRTL ? 'تم بنجاح!' : 'Success!';
  const successText = isRTL 
    ? 'تم إرسال نموذجك بنجاح. سنقوم بمراجعة طلبك والتواصل معك قريبًا.' 
    : 'Your submission has been received successfully. A lab coordinator will follow up shortly.';
  const closeBtn = isRTL ? 'إغلاق' : 'Close';

  modal.innerHTML = `
    <div class="glass-panel p-8 rounded-2xl max-w-md w-full mx-4 text-center shadow-xl scale-95 transition-transform duration-300">
      <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${successTitle}</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6">${successText}</p>
      <button class="px-6 py-2 bg-purple-950 dark:bg-sky-500 text-white rounded-xl font-medium hover:bg-purple-900 dark:hover:bg-sky-400 transition-colors shadow-lg shadow-purple-900/20 dark:shadow-sky-500/20">
        ${closeBtn}
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate active state scale
  setTimeout(() => {
    modal.querySelector('.glass-panel').classList.remove('scale-95');
    modal.querySelector('.glass-panel').classList.add('scale-100');
  }, 10);
  
  modal.querySelector('button').addEventListener('click', () => {
    modal.remove();
    form.reset();
    
    // Clear password strength indicator if applicable
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    if (strengthBar) strengthBar.className = 'h-1.5 rounded-full transition-all duration-300 w-0';
    if (strengthText) strengthText.textContent = '';
  });
}
