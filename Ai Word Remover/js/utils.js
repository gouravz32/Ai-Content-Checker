/**
 * Utility Functions for AI Text Humanizer
 * Common helper functions used across the application
 */

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle function to limit the rate of function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Generate a unique ID
 * @param {number} length - Length of the ID
 * @returns {string} Unique ID
 */
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Format file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format date in a human readable format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return d.toLocaleDateString();
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Strip HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile device
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check if device supports touch
 * @returns {boolean} True if touch device
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get browser information
 * @returns {Object} Browser info
 */
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Chrome')) {
        browser = 'Chrome';
        version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Edge')) {
        browser = 'Edge';
        version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    }

    return { browser, version };
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const result = document.execCommand('copy');
            document.body.removeChild(textArea);
            return result;
        }
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
}

/**
 * Download text as file
 * @param {string} text - Text content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
function downloadTextFile(text, filename, mimeType = 'text/plain') {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
        word-wrap: break-word;
    `;

    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.background = colors[type] || colors.info;

    // Add icon
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const icon = document.createElement('i');
    icon.className = icons[type] || icons.info;
    icon.style.marginRight = '8px';
    
    notification.appendChild(icon);
    notification.appendChild(document.createTextNode(message));

    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
    `;
    closeBtn.onclick = () => removeNotification(notification);
    notification.appendChild(closeBtn);

    document.body.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

/**
 * Remove notification with animation
 * @param {HTMLElement} notification - Notification element
 */
function removeNotification(notification) {
    if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

/**
 * Load external component/template
 * @param {string} url - URL of the component
 * @param {string} containerId - ID of container element
 * @returns {Promise<boolean>} Success status
 */
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = html;
            return true;
        }
        
        console.warn(`Container with ID '${containerId}' not found`);
        return false;
    } catch (error) {
        console.error(`Failed to load component from ${url}:`, error);
        return false;
    }
}

/**
 * Animate element with CSS class
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class
 * @param {number} duration - Animation duration in milliseconds
 * @returns {Promise} Promise that resolves when animation completes
 */
function animateElement(element, animationClass, duration = 1000) {
    return new Promise((resolve) => {
        element.classList.add(animationClass);
        
        setTimeout(() => {
            element.classList.remove(animationClass);
            resolve();
        }, duration);
    });
}

/**
 * Scroll to element smoothly
 * @param {HTMLElement|string} element - Element or selector
 * @param {Object} options - Scroll options
 */
function scrollToElement(element, options = {}) {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    
    if (target) {
        const defaultOptions = {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        };
        
        target.scrollIntoView({ ...defaultOptions, ...options });
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height * threshold) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width * threshold) >= 0);
    
    return vertInView && horInView;
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Set URL parameter without page reload
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
function setUrlParameter(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
}

/**
 * Local storage helper with JSON support
 */
const storage = {
    /**
     * Set item in localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },

    /**
     * Get item from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    },

    /**
     * Clear all localStorage
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculate reading time
 * @param {string} text - Text to analyze
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
function calculateReadingTime(text, wordsPerMinute = 200) {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Promise that resolves with function result
 */
async function retry(fn, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            if (i === maxRetries) {
                throw lastError;
            }
            
            await sleep(delay * Math.pow(2, i)); // Exponential backoff
        }
    }
}

/**
 * Performance measurement utility
 */
const perf = {
    /**
     * Start performance measurement
     * @param {string} name - Measurement name
     */
    start(name) {
        performance.mark(`${name}-start`);
    },

    /**
     * End performance measurement
     * @param {string} name - Measurement name
     * @returns {number} Duration in milliseconds
     */
    end(name) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measure = performance.getEntriesByName(name)[0];
        return measure.duration;
    },

    /**
     * Get all performance measurements
     * @returns {Array} Array of performance entries
     */
    getAll() {
        return performance.getEntriesByType('measure');
    }
};

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Export functions for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        deepClone,
        generateId,
        formatFileSize,
        formatDate,
        escapeHtml,
        stripHtml,
        isMobile,
        isTouchDevice,
        getBrowserInfo,
        copyToClipboard,
        downloadTextFile,
        showNotification,
        loadComponent,
        animateElement,
        scrollToElement,
        isInViewport,
        getUrlParameter,
        setUrlParameter,
        storage,
        isValidEmail,
        isValidUrl,
        formatNumber,
        calculateReadingTime,
        sleep,
        retry,
        perf
    };
}