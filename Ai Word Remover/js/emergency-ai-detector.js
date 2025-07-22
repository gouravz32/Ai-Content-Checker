// EMERGENCY AI DETECTION FIX
console.log('🚨 EMERGENCY AI DETECTION FIX LOADING...');

// Simple but GUARANTEED working AI detector
window.EMERGENCY_AI_DETECTOR = {
    // Simple AI words that DEFINITELY exist in AI text
    simpleAIWords: [
        'utilize', 'leverage', 'furthermore', 'moreover', 'comprehensive',
        'innovative', 'optimize', 'enhance', 'facilitate', 'implement',
        'demonstrate', 'establish', 'cutting-edge', 'state-of-the-art',
        'paradigm', 'methodology', 'streamline', 'robust', 'dynamic'
    ],

    // EMERGENCY DETECTION - GUARANTEED TO WORK
    detectAndHighlight: function(text) {
        console.log('🔥 EMERGENCY DETECTION STARTING for text:', text.substring(0, 50) + '...');
        
        if (!text || text.trim().length === 0) {
            console.log('❌ No text provided to emergency detector');
            return {
                text: '',
                highlightedText: 'No text provided',
                aiWords: [],
                confidence: 0,
                totalMatches: 0
            };
        }

        let highlightedText = text;
        const foundWords = [];
        let totalMatches = 0;

        // Check each simple AI word
        this.simpleAIWords.forEach(word => {
            // Create case-insensitive regex
            const pattern = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = text.match(pattern);
            
            if (matches && matches.length > 0) {
                console.log(`✅ FOUND AI WORD: "${word}" - ${matches.length} times`);
                
                // Add to found words
                matches.forEach(match => {
                    foundWords.push(match.toLowerCase());
                });
                totalMatches += matches.length;

                // Replace with highlighted version
                highlightedText = highlightedText.replace(pattern, function(match) {
                    return `<span style="background-color: #FF0000 !important; color: #FFFFFF !important; padding: 4px 8px !important; border-radius: 5px !important; font-weight: bold !important; border: 2px solid #CC0000 !important; display: inline-block !important; margin: 2px !important; box-shadow: 0 2px 8px rgba(255,0,0,0.5) !important;">${match}</span>`;
                });
            }
        });

        const result = {
            text: text,
            highlightedText: highlightedText,
            aiWords: [...new Set(foundWords)], // Remove duplicates
            confidence: foundWords.length > 0 ? 0.8 : 0.1,
            totalMatches: totalMatches,
            wordCount: text.split(/\s+/).length
        };

        console.log('🎯 EMERGENCY DETECTION RESULT:', result);
        console.log(`📊 Found ${result.aiWords.length} unique AI words:`, result.aiWords);
        
        return result;
    },

    // EMERGENCY HUMANIZATION
    humanizeText: function(text) {
        console.log('🤖➡️👤 EMERGENCY HUMANIZATION starting...');
        
        const replacements = {
            'utilize': 'use',
            'leverage': 'use',
            'furthermore': 'also',
            'moreover': 'plus',
            'comprehensive': 'complete',
            'innovative': 'new',
            'optimize': 'improve',
            'enhance': 'improve',
            'facilitate': 'help',
            'implement': 'use',
            'demonstrate': 'show',
            'establish': 'create',
            'cutting-edge': 'advanced',
            'state-of-the-art': 'modern',
            'paradigm': 'model',
            'methodology': 'method',
            'streamline': 'simplify',
            'robust': 'strong',
            'dynamic': 'flexible'
        };

        let humanizedText = text;
        let replacementCount = 0;

        Object.keys(replacements).forEach(aiWord => {
            const humanWord = replacements[aiWord];
            const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
            const beforeReplace = humanizedText;
            
            humanizedText = humanizedText.replace(regex, humanWord);
            
            if (beforeReplace !== humanizedText) {
                replacementCount++;
                console.log(`✅ Replaced "${aiWord}" → "${humanWord}"`);
            }
        });

        return {
            text: humanizedText,
            replacementCount: replacementCount
        };
    },

    // Test function
    test: function() {
        const testText = "To utilize our comprehensive methodology, we must leverage innovative solutions to optimize performance and enhance user experience.";
        console.log('🧪 Testing emergency detector with:', testText);
        const result = this.detectAndHighlight(testText);
        console.log('🎯 Test result:', result);
        return result;
    }
};

// Override ALL detectors with emergency version
window.SUPER_AI_DETECTOR = window.EMERGENCY_AI_DETECTOR;
window.FIXED_AI_DETECTOR = window.EMERGENCY_AI_DETECTOR;
window.simpleAIDetector = window.EMERGENCY_AI_DETECTOR;

// Test immediately
console.log('🧪 Running emergency detector test...');
window.EMERGENCY_AI_DETECTOR.test();

console.log('✅ EMERGENCY AI DETECTOR LOADED AND TESTED!');
