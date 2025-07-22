// Test Sample for AI Detection
console.log('🧪 Creating test sample with guaranteed AI words...');

window.TEST_AI_SAMPLE = `
In order to utilize the comprehensive methodology, we must leverage our innovative approach to facilitate the optimization process. Furthermore, this cutting-edge paradigm will enhance our ability to streamline operations. Moreover, the implementation of this robust solution will demonstrate our commitment to delivering exceptional results.

The utilize of advanced algorithms will ensure that we can comprehensively analyze the data. Additionally, this will allow us to optimize performance metrics while maintaining the highest standards of quality. Consequently, our clients will benefit from this transformative approach to problem-solving.
`;

// Function to automatically fill test sample
window.fillTestSample = function() {
    const inputText = document.getElementById('inputText');
    if (inputText) {
        inputText.value = window.TEST_AI_SAMPLE;
        console.log('✅ Test sample filled in input field');
        
        // Trigger input event to update word count
        const event = new Event('input', { bubbles: true });
        inputText.dispatchEvent(event);
        
        // Auto-scroll to input
        inputText.scrollIntoView({ behavior: 'smooth' });
        inputText.focus();
        
        return true;
    }
    return false;
};

// Add test button to page
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn && !document.getElementById('testBtn')) {
            const testBtn = document.createElement('button');
            testBtn.id = 'testBtn';
            testBtn.className = 'btn btn-secondary';
            testBtn.innerHTML = '🧪 Fill Test Sample';
            testBtn.style.marginLeft = '10px';
            testBtn.onclick = window.fillTestSample;
            
            analyzeBtn.parentNode.insertBefore(testBtn, analyzeBtn.nextSibling);
            console.log('✅ Test button added');
        }
    }, 2000);
});

console.log('✅ Test sample system ready!');
