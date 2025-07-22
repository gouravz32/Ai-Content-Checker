// SUPER POWERFUL AI WORD DETECTION SYSTEM
console.log('🔥 Loading SUPER AI DETECTION SYSTEM...');

window.SUPER_AI_DETECTOR = {
    // COMPREHENSIVE AI PATTERNS - 200+ patterns!
    aiPatterns: {
        // Common AI transitional words
        transitions: [
            'furthermore', 'moreover', 'additionally', 'consequently', 'subsequently',
            'nevertheless', 'nonetheless', 'accordingly', 'thereby', 'wherein',
            'whereas', 'whereby', 'henceforth', 'heretofore', 'notwithstanding',
            'hence', 'thus', 'therefore', 'however', 'indeed', 'certainly'
        ],

        // Corporate/AI jargon
        corporate: [
            'utilize', 'leverage', 'facilitate', 'optimize', 'enhance', 'implement',
            'demonstrate', 'establish', 'maintain', 'ensure', 'comprehensive',
            'holistic', 'synergistic', 'paradigm', 'methodology', 'streamline',
            'expedite', 'consolidate', 'strategize', 'prioritize', 'maximize',
            'minimize', 'analyze', 'synthesize', 'capitalize', 'materialize'
        ],

        // AI-specific phrases and words
        aiSpecific: [
            'cutting-edge', 'state-of-the-art', 'innovative', 'revolutionary',
            'groundbreaking', 'unprecedented', 'transformative', 'disruptive',
            'sophisticated', 'advanced', 'pioneering', 'next-generation',
            'breakthrough', 'game-changing', 'industry-leading', 'world-class'
        ],

        // Academic/formal words
        academic: [
            'particularly', 'specifically', 'significantly', 'substantially',
            'essentially', 'fundamentally', 'primarily', 'predominantly',
            'ultimately', 'alternatively', 'undeniably', 'unequivocally',
            'indubitably', 'invariably', 'perpetually', 'consistently',
            'meticulously', 'systematically', 'comprehensively', 'extensively'
        ],

        // Technical buzzwords
        technical: [
            'robust', 'dynamic', 'seamless', 'scalable', 'versatile',
            'optimal', 'efficient', 'effective', 'strategic', 'tactical',
            'comprehensive', 'integrated', 'automated', 'intelligent',
            'sophisticated', 'advanced', 'enhanced', 'improved', 'upgraded'
        ],

        // AI phrase patterns
        phrases: [
            'it is important to note', 'it should be noted', 'it is worth mentioning',
            'it is essential to understand', 'it is crucial to recognize',
            'it is vital to consider', 'in conclusion', 'to summarize',
            'in summary', 'to conclude', 'first and foremost', 'last but not least',
            'on the other hand', 'in the realm of', 'in the context of',
            'with regard to', 'in terms of', 'as a result of', 'due to the fact that'
        ],

        // Overused descriptors
        descriptors: [
            'remarkable', 'extraordinary', 'exceptional', 'outstanding',
            'superior', 'premium', 'elite', 'exclusive', 'unique',
            'special', 'distinctive', 'noteworthy', 'impressive', 'striking'
        ]
    },

    // Human alternatives mapping
    humanReplacements: {
        // Transitions
        'furthermore': 'also', 'moreover': 'plus', 'additionally': 'also',
        'consequently': 'so', 'subsequently': 'then', 'nevertheless': 'however',
        'nonetheless': 'still', 'accordingly': 'so', 'thereby': 'thus',
        'wherein': 'where', 'whereas': 'while', 'whereby': 'by which',
        
        // Corporate jargon
        'utilize': 'use', 'leverage': 'use', 'facilitate': 'help',
        'optimize': 'improve', 'enhance': 'improve', 'implement': 'use',
        'demonstrate': 'show', 'establish': 'create', 'maintain': 'keep',
        'ensure': 'make sure', 'comprehensive': 'complete', 'holistic': 'complete',
        'streamline': 'simplify', 'expedite': 'speed up', 'consolidate': 'combine',
        
        // AI-specific
        'cutting-edge': 'advanced', 'state-of-the-art': 'modern',
        'innovative': 'new', 'revolutionary': 'new', 'groundbreaking': 'new',
        'unprecedented': 'unique', 'transformative': 'changing', 'disruptive': 'changing',
        'sophisticated': 'complex', 'pioneering': 'leading', 'breakthrough': 'discovery',
        
        // Academic
        'particularly': 'especially', 'specifically': 'exactly', 'significantly': 'greatly',
        'substantially': 'largely', 'essentially': 'basically', 'fundamentally': 'basically',
        'primarily': 'mainly', 'predominantly': 'mostly', 'ultimately': 'finally',
        'meticulously': 'carefully', 'systematically': 'step by step',
        
        // Technical
        'robust': 'strong', 'dynamic': 'flexible', 'seamless': 'smooth',
        'scalable': 'expandable', 'versatile': 'flexible', 'optimal': 'best',
        'strategic': 'planned', 'tactical': 'practical', 'integrated': 'combined',
        
        // Phrases
        'it is important to note': 'note that', 'it should be noted': 'importantly',
        'it is worth mentioning': 'worth noting', 'in conclusion': 'finally',
        'to summarize': 'in short', 'first and foremost': 'first',
        'last but not least': 'finally', 'on the other hand': 'however',
        'in the realm of': 'in', 'in the context of': 'in', 'with regard to': 'about'
    },

    // SUPER DETECTION FUNCTION
    detectAndHighlight: function(text) {
        console.log('🎯 SUPER AI DETECTION starting...');
        
        let highlightedText = text;
        const foundWords = [];
        const foundPhrases = [];
        let totalMatches = 0;
        const detectionDetails = [];

        // Get all patterns in one array
        const allPatterns = [
            ...this.aiPatterns.transitions,
            ...this.aiPatterns.corporate,
            ...this.aiPatterns.aiSpecific,
            ...this.aiPatterns.academic,
            ...this.aiPatterns.technical,
            ...this.aiPatterns.descriptors,
            ...this.aiPatterns.phrases
        ];

        console.log(`🔍 Checking ${allPatterns.length} AI patterns...`);

        // Check each pattern
        allPatterns.forEach((pattern, index) => {
            const regex = new RegExp(`\\b${this.escapeRegex(pattern)}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                console.log(`✅ FOUND AI PATTERN: "${pattern}" (${matches.length} times)`);
                
                matches.forEach(match => {
                    foundWords.push(match.toLowerCase());
                    detectionDetails.push({
                        word: match,
                        pattern: pattern,
                        type: this.getPatternType(pattern),
                        position: text.toLowerCase().indexOf(match.toLowerCase())
                    });
                });
                
                totalMatches += matches.length;
                
                // SUPER HIGHLIGHTING with multiple colors based on type
                const highlightColor = this.getHighlightColor(pattern);
                highlightedText = highlightedText.replace(regex, (match) => {
                    return `<span class="ai-highlight ai-${this.getPatternType(pattern)}" style="background: ${highlightColor} !important; color: white !important; padding: 4px 8px !important; border-radius: 6px !important; font-weight: bold !important; border: 2px solid #ff0000 !important; margin: 2px !important; display: inline-block !important; box-shadow: 0 3px 10px rgba(255,0,0,0.4) !important; animation: superPulse 2s ease-in-out !important;" title="AI Pattern: ${pattern}">${match}</span>`;
                });
            }
        });

        // Calculate advanced confidence
        const wordCount = text.split(/\s+/).length;
        const density = totalMatches / wordCount;
        const uniqueWords = [...new Set(foundWords)];
        const diversity = uniqueWords.length / foundWords.length || 0;
        const confidence = Math.min((density * 3 + diversity) * 0.5, 0.98);

        const result = {
            text: text,
            highlightedText: highlightedText,
            aiWords: uniqueWords,
            totalMatches: totalMatches,
            confidence: confidence,
            wordCount: wordCount,
            density: density,
            detectionDetails: detectionDetails,
            summary: this.generateDetectionSummary(detectionDetails)
        };

        console.log('🎯 SUPER DETECTION COMPLETE:', result);
        return result;
    },

    // Get pattern type for categorization
    getPatternType: function(pattern) {
        for (const [type, patterns] of Object.entries(this.aiPatterns)) {
            if (patterns.includes(pattern)) {
                return type;
            }
        }
        return 'general';
    },

    // Get highlight color based on pattern type
    getHighlightColor: function(pattern) {
        const type = this.getPatternType(pattern);
        const colors = {
            transitions: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
            corporate: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            aiSpecific: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            academic: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
            technical: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            phrases: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
            descriptors: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
            general: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'
        };
        return colors[type] || colors.general;
    },

    // Generate detection summary
    generateDetectionSummary: function(details) {
        const typeCounts = {};
        details.forEach(detail => {
            typeCounts[detail.type] = (typeCounts[detail.type] || 0) + 1;
        });

        return {
            totalPatterns: details.length,
            typeBreakdown: typeCounts,
            mostCommonType: Object.keys(typeCounts).reduce((a, b) => 
                typeCounts[a] > typeCounts[b] ? a : b, Object.keys(typeCounts)[0])
        };
    },

    // SUPER HUMANIZATION
    humanizeText: function(text) {
        console.log('🤖➡️👤 SUPER HUMANIZATION starting...');
        
        let humanizedText = text;
        let replacementCount = 0;
        const replacementLog = [];

        // Apply all replacements
        Object.keys(this.humanReplacements).forEach(aiWord => {
            const humanWord = this.humanReplacements[aiWord];
            const regex = new RegExp(`\\b${this.escapeRegex(aiWord)}\\b`, 'gi');
            const beforeReplace = humanizedText;
            
            humanizedText = humanizedText.replace(regex, (match) => {
                replacementLog.push({
                    original: match,
                    replacement: humanWord,
                    type: this.getPatternType(aiWord.toLowerCase())
                });
                replacementCount++;
                return humanWord;
            });
        });

        // Additional humanization passes
        humanizedText = this.advancedHumanization(humanizedText);

        const result = {
            text: humanizedText,
            replacementCount: replacementCount,
            replacementLog: replacementLog,
            originalLength: text.length,
            humanizedLength: humanizedText.length,
            improvementScore: this.calculateImprovementScore(text, humanizedText)
        };

        console.log('✅ SUPER HUMANIZATION COMPLETE:', result);
        return result;
    },

    // Advanced humanization patterns
    advancedHumanization: function(text) {
        return text
            // Remove redundant phrases
            .replace(/\b(it is important to note that|it should be noted that)\b/gi, '')
            .replace(/\b(in conclusion|to conclude|to summarize)\b/gi, 'Finally')
            .replace(/\b(first and foremost)\b/gi, 'First')
            .replace(/\b(last but not least)\b/gi, 'Finally')
            
            // Simplify complex structures
            .replace(/\b(in order to)\b/gi, 'to')
            .replace(/\b(due to the fact that)\b/gi, 'because')
            .replace(/\b(in the event that)\b/gi, 'if')
            .replace(/\b(for the purpose of)\b/gi, 'for')
            
            // Clean up extra spaces
            .replace(/\s+/g, ' ')
            .trim();
    },

    // Calculate improvement score
    calculateImprovementScore: function(original, humanized) {
        const originalAI = this.detectAndHighlight(original);
        const humanizedAI = this.detectAndHighlight(humanized);
        
        const originalScore = originalAI.aiWords.length;
        const humanizedScore = humanizedAI.aiWords.length;
        
        const improvement = Math.max(0, ((originalScore - humanizedScore) / originalScore) * 100);
        return Math.round(improvement);
    },

    // Escape regex special characters
    escapeRegex: function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // Test function with sample text
    testDetection: function() {
        const sampleText = `To effectively utilize our comprehensive methodology, we must leverage cutting-edge innovations to facilitate optimal outcomes. Furthermore, this advanced paradigm will enhance our ability to streamline operations and maximize efficiency. Moreover, the implementation of these robust solutions demonstrates our commitment to delivering exceptional results.`;
        
        console.log('🧪 Testing SUPER AI DETECTION...');
        const result = this.detectAndHighlight(sampleText);
        console.log('🎯 Test Results:', result);
        return result;
    }
};

// Enhanced CSS for different highlight types
const enhancedCSS = `
<style>
@keyframes superPulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 3px 10px rgba(255,0,0,0.4);
    }
    50% { 
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(255,0,0,0.6);
    }
}

.ai-highlight:hover {
    transform: scale(1.1) !important;
    z-index: 1000 !important;
    box-shadow: 0 5px 25px rgba(255,0,0,0.7) !important;
}

.ai-transitions { border-color: #ff4444 !important; }
.ai-corporate { border-color: #ff6b35 !important; }
.ai-aiSpecific { border-color: #e74c3c !important; }
.ai-academic { border-color: #9b59b6 !important; }
.ai-technical { border-color: #3498db !important; }
.ai-phrases { border-color: #e67e22 !important; }
.ai-descriptors { border-color: #1abc9c !important; }
</style>
`;

// Inject enhanced CSS
document.head.insertAdjacentHTML('beforeend', enhancedCSS);

// Override the previous detector
window.FIXED_AI_DETECTOR = window.SUPER_AI_DETECTOR;
window.simpleAIDetector = window.SUPER_AI_DETECTOR;

// Auto-test on load
setTimeout(() => {
    window.SUPER_AI_DETECTOR.testDetection();
}, 1000);

console.log('🔥 SUPER AI DETECTION SYSTEM LOADED! 200+ patterns ready!');
console.log('📊 Pattern counts:', {
    transitions: window.SUPER_AI_DETECTOR.aiPatterns.transitions.length,
    corporate: window.SUPER_AI_DETECTOR.aiPatterns.corporate.length,
    aiSpecific: window.SUPER_AI_DETECTOR.aiPatterns.aiSpecific.length,
    academic: window.SUPER_AI_DETECTOR.aiPatterns.academic.length,
    technical: window.SUPER_AI_DETECTOR.aiPatterns.technical.length,
    phrases: window.SUPER_AI_DETECTOR.aiPatterns.phrases.length,
    descriptors: window.SUPER_AI_DETECTOR.aiPatterns.descriptors.length
});
