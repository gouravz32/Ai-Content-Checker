// FIXED AI Detection with GUARANTEED Red Highlighting
console.log('🔥 Loading FIXED AI Detection System...');

window.FIXED_AI_DETECTOR = {
    // Top AI patterns that are most common
    topAIPatterns: [
        'utilize', 'leverage', 'facilitate', 'optimize', 'enhance', 
        'furthermore', 'moreover', 'additionally', 'consequently', 
        'nevertheless', 'comprehensive', 'innovative', 'cutting-edge',
        'paradigm', 'methodology', 'streamline', 'implement'
    ],

    // GUARANTEED RED HIGHLIGHTING FUNCTION
    detectAndHighlightRED: function(text) {
        console.log('🔍 FIXED AI Detection starting for text:', text.substring(0, 100));
        
        let highlightedText = text;
        const foundWords = [];
        let totalMatches = 0;

        // Process each AI pattern
        this.topAIPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                console.log(`✅ Found AI word: "${pattern}" (${matches.length} times)`);
                foundWords.push(...matches.map(m => m.toLowerCase()));
                totalMatches += matches.length;
                
                // SIMPLE RED HIGHLIGHTING - GUARANTEED TO WORK
                highlightedText = highlightedText.replace(regex, function(match) {
                    return `<span style="background-color: #FF0000 !important; color: #FFFFFF !important; padding: 4px 8px !important; border-radius: 5px !important; font-weight: bold !important; border: 2px solid #CC0000 !important; display: inline-block !important; margin: 2px !important;">${match}</span>`;
                });
            }
        });

        const result = {
            text: text,
            highlightedText: highlightedText,
            aiWords: [...new Set(foundWords)],
            totalMatches: totalMatches,
            confidence: foundWords.length > 0 ? 0.8 : 0.2
        };

        console.log('🎯 FIXED Detection Result:', result);
        return result;
    },

    // Simple humanization
    humanizeText: function(text) {
        console.log('🤖➡️👤 Starting humanization...');
        
        const replacements = {
            'utilize': 'use',
            'leverage': 'use', 
            'facilitate': 'help',
            'furthermore': 'also',
            'moreover': 'plus',
            'additionally': 'also',
            'consequently': 'so',
            'nevertheless': 'however',
            'comprehensive': 'complete',
            'innovative': 'new',
            'optimize': 'improve',
            'enhance': 'improve',
            'implement': 'use',
            'streamline': 'simplify'
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
    }
};

// Override the original detector
window.simpleAIDetector = window.FIXED_AI_DETECTOR;

console.log('✅ FIXED AI Detection System loaded successfully!');
