// Enhanced Quick Fix for AI Detection and Humanization
window.simpleAIDetector = {
    // Comprehensive AI patterns to detect
    aiPatterns: [
        // Common AI transitional words
        'furthermore', 'moreover', 'additionally', 'consequently', 'subsequently',
        'nevertheless', 'nonetheless', 'accordingly', 'thereby', 'wherein',
        'whereas', 'whereby', 'henceforth', 'heretofore', 'notwithstanding',
        
        // Corporate/AI jargon
        'utilize', 'leverage', 'facilitate', 'optimize', 'enhance', 'implement',
        'demonstrate', 'establish', 'maintain', 'ensure', 'comprehensive',
        'holistic', 'synergistic', 'paradigm', 'methodology', 'streamline',
        'innovative', 'cutting-edge', 'state-of-the-art', 'revolutionary',
        'groundbreaking', 'unprecedented', 'transformative', 'disruptive',
        
        // AI phrases
        'delve into', 'it is important to note', 'it should be noted',
        'it is worth mentioning', 'it is essential to understand',
        'it is crucial to recognize', 'it is vital to consider',
        'in conclusion', 'to summarize', 'in summary', 'to conclude',
        'first and foremost', 'last but not least', 'on the other hand',
        'in the realm of', 'in the context of', 'with regard to',
        
        // Academic/formal words
        'specifically', 'particularly', 'significantly', 'substantially',
        'essentially', 'fundamentally', 'primarily', 'predominantly',
        'ultimately', 'alternatively', 'undeniably', 'unequivocally',
        'indubitably', 'invariably', 'perpetually', 'consistently',
        'meticulously', 'systematically', 'comprehensively', 'extensively',
        
        // More AI-typical words
        'robust', 'dynamic', 'seamless', 'scalable', 'versatile',
        'optimal', 'maximize', 'minimize', 'integration', 'implementation',
        'deployment', 'utilization', 'optimization', 'configuration',
        'calibration', 'specification', 'documentation', 'authentication'
    ],

    // Human alternatives for replacements
    humanReplacements: {
        'furthermore': 'also', 'moreover': 'plus', 'additionally': 'also',
        'consequently': 'so', 'subsequently': 'then', 'nevertheless': 'however',
        'nonetheless': 'still', 'accordingly': 'so', 'thereby': 'thus',
        'utilize': 'use', 'leverage': 'use', 'facilitate': 'help',
        'optimize': 'improve', 'enhance': 'improve', 'implement': 'use',
        'demonstrate': 'show', 'establish': 'create', 'maintain': 'keep',
        'ensure': 'make sure', 'comprehensive': 'complete', 'holistic': 'complete',
        'delve into': 'explore', 'streamline': 'simplify',
        'it is important to note': 'note that', 'it should be noted': 'importantly',
        'it is worth mentioning': 'worth noting', 'in conclusion': 'finally',
        'to summarize': 'in short', 'specifically': 'exactly',
        'particularly': 'especially', 'significantly': 'greatly',
        'substantially': 'largely', 'essentially': 'basically',
        'fundamentally': 'basically', 'primarily': 'mainly',
        'predominantly': 'mostly', 'ultimately': 'finally',
        'alternatively': 'instead', 'innovative': 'new',
        'cutting-edge': 'advanced', 'state-of-the-art': 'modern',
        'revolutionary': 'new', 'groundbreaking': 'new',
        'unprecedented': 'unique', 'transformative': 'changing',
        'robust': 'strong', 'dynamic': 'flexible', 'seamless': 'smooth',
        'scalable': 'expandable', 'versatile': 'flexible', 'optimal': 'best',
        'maximize': 'increase', 'minimize': 'reduce', 'meticulously': 'carefully'
    },

    detectAndHighlight: function(text) {
        let highlightedText = text;
        const foundWords = [];
        let totalMatches = 0;

        // Enhanced detection with better highlighting
        this.aiPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                foundWords.push(...matches.map(match => match.toLowerCase()));
                totalMatches += matches.length;
                
                // Enhanced highlighting with better styling
                highlightedText = highlightedText.replace(regex, 
                    `<span class="ai-highlight" style="background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%); color: white; padding: 3px 6px; border-radius: 4px; font-weight: 600; border: 1px solid #ff0000; box-shadow: 0 2px 4px rgba(255,68,68,0.3); display: inline-block; animation: highlightPulse 2s ease-in-out;">$&</span>`
                );
            }
        });

        // Calculate confidence based on density
        const wordCount = text.split(/\s+/).length;
        const density = totalMatches / wordCount;
        const confidence = Math.min(density * 2 + 0.2, 0.98);

        return {
            text: text,
            highlightedText: highlightedText,
            aiWords: [...new Set(foundWords)], // Remove duplicates
            confidence: confidence,
            totalMatches: totalMatches,
            wordCount: wordCount,
            density: density
        };
    },

    humanizeText: function(text) {
        let humanizedText = text;
        let replacementCount = 0;
        
        // Apply replacements with tracking
        Object.keys(this.humanReplacements).forEach(aiWord => {
            const humanWord = this.humanReplacements[aiWord];
            const regex = new RegExp(`\\b${aiWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            const beforeLength = humanizedText.length;
            humanizedText = humanizedText.replace(regex, humanWord);
            
            if (humanizedText.length !== beforeLength) {
                replacementCount++;
            }
        });

        return {
            text: humanizedText,
            replacementCount: replacementCount
        };
    }
};

// Main quick analyze function with better error handling
window.quickAnalyze = function(text) {
    try {
        console.log('🚀 Quick analyze starting for:', text.substring(0, 100) + '...');
        
        if (!text || text.trim().length === 0) {
            throw new Error('No text provided');
        }

        // Use the enhanced detector
        const detectionResult = window.simpleAIDetector.detectAndHighlight(text);
        const humanizedText = window.simpleAIDetector.humanizeText(text);
        
        const totalWords = text.split(/\s+/).length;
        const aiWordsDetected = detectionResult.aiWords.length;
        const humanScore = Math.max(0, 100 - Math.round((aiWordsDetected / totalWords) * 100));
        
        const result = {
            original: {
                aiWords: detectionResult.aiWords,
                highlightedText: detectionResult.highlightedText,
                confidence: detectionResult.confidence,
                patterns: detectionResult.aiWords
            },
            humanized: humanizedText,
            stats: {
                totalWords: totalWords,
                aiWordsDetected: aiWordsDetected,
                humanScore: humanScore,
                confidence: detectionResult.confidence,
                wordsRemaining: 'Unlimited' // For owner
            }
        };
        
        console.log('✅ Quick analyze SUCCESS:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Quick analyze error:', error);
        return null;
    }
};
