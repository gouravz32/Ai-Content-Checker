// Test Function for AI Text Humanizer
// Run this in browser console to test the tool

window.testAIHumanizer = function() {
    console.log('🧪 Testing AI Text Humanizer...');
    
    // Test data
    const testText = "Furthermore, it is essential to utilize comprehensive solutions that leverage advanced methodologies. Moreover, one must optimize the implementation process to ensure maximum efficiency.";
    
    // Step 1: Fill input
    const inputElement = document.getElementById('inputText');
    if (inputElement) {
        inputElement.value = testText;
        inputElement.dispatchEvent(new Event('input'));
        console.log('✅ Test text added to input');
    } else {
        console.error('❌ Input element not found');
        return;
    }
    
    // Step 2: Trigger analysis
    setTimeout(() => {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            console.log('🚀 Clicking analyze button...');
            analyzeBtn.click();
        } else {
            console.error('❌ Analyze button not found');
        }
    }, 500);
    
    console.log('🧪 Test initiated. Check for results...');
};

// Auto-run test after 2 seconds
setTimeout(() => {
    if (window.location.search.includes('debug=1')) {
        console.log('🚀 Auto-running test in debug mode...');
        window.testAIHumanizer();
    }
}, 2000);
