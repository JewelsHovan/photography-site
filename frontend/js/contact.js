document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.character-count');
    const eventDateInput = document.getElementById('event-date');
    const formOverlay = document.querySelector('.form-overlay');

    // Set minimum date to today + 2 weeks
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    eventDateInput.min = minDate.toISOString().split('T')[0];

    // Character counter for message
    messageTextarea.addEventListener('input', function() {
        const remaining = this.value.length;
        charCount.textContent = `${remaining}/500`;
        
        if (remaining >= 450) {
            charCount.style.color = '#ff4444';
        } else {
            charCount.style.color = '#666';
        }
    });

    // Form validation
    const validateField = (field) => {
        const parent = field.parentElement;
        parent.classList.remove('error', 'success');
        
        // Remove existing error message
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (!field.checkValidity()) {
            parent.classList.add('error');
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getErrorMessage(field)}`;
            parent.appendChild(errorMessage);
            return false;
        }

        parent.classList.add('success');
        return true;
    };

    // Custom error messages
    const getErrorMessage = (field) => {
        if (field.validity.valueMissing) {
            return 'This field is required';
        }
        if (field.validity.typeMismatch) {
            return field.type === 'email' 
                ? 'Please enter a valid email address'
                : 'Please enter a valid value';
        }
        if (field.validity.patternMismatch && field.type === 'tel') {
            return 'Please enter a valid phone number';
        }
        if (field.validity.tooLong) {
            return `Maximum ${field.maxLength} characters allowed`;
        }
        if (field.id === 'event-date' && new Date(field.value) < minDate) {
            return 'Please select a date at least 2 weeks from today';
        }
        return 'Please enter a valid value';
    };

    // Live validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value) {
                validateField(input);
            }
        });
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Show loading overlay
        formOverlay.classList.add('active');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="text-align: center; padding: 20px; background: #e8f5e9; border-radius: 8px; margin-top: 20px;">
                    <i class="fas fa-check-circle" style="color: #00c851; font-size: 48px;"></i>
                    <h3 style="color: #00c851; margin: 10px 0;">Message Sent Successfully!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                </div>
            `;
            form.innerHTML = '';
            form.appendChild(successMessage);

        } catch (error) {
            // Show error message
            const errorBanner = document.createElement('div');
            errorBanner.className = 'error-message';
            errorBanner.style.padding = '10px';
            errorBanner.style.marginBottom = '20px';
            errorBanner.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                Something went wrong. Please try again or contact us directly.
            `;
            form.insertBefore(errorBanner, form.firstChild);
            
            // Re-enable submit button
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }

        // Hide loading overlay
        formOverlay.classList.remove('active');
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});
