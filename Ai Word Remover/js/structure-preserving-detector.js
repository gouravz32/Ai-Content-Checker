// STRUCTURE PRESERVING AI DETECTOR
console.log('🏗️ Loading Structure Preserving AI Detector...');

window.STRUCTURE_AI_DETECTOR = {
    // Comprehensive AI patterns with better detection
    aiPatterns: [
        // High-priority AI words (most common)
        'utilize', 'leverage', 'facilitate', 'optimize', 'enhance', 'implement',
        'furthermore', 'moreover', 'additionally', 'consequently', 'subsequently',
        'nevertheless', 'nonetheless', 'comprehensive', 'innovative', 'cutting-edge',
        'state-of-the-art', 'revolutionary', 'groundbreaking', 'unprecedented',
        'transformative', 'sophisticated', 'advanced', 'robust', 'dynamic',
        'seamless', 'scalable', 'versatile', 'optimal', 'strategic', 'systematic',
        
        // Academic/formal patterns
        'particularly', 'specifically', 'significantly', 'substantially',
        'essentially', 'fundamentally', 'primarily', 'predominantly', 'ultimately',
        'meticulously', 'systematically', 'comprehensively', 'extensively',
        
        // AI-specific phrases
        'it is important to note', 'it should be noted', 'it is worth mentioning',
        'it is essential to understand', 'it is crucial to recognize',
        'in conclusion', 'to summarize', 'in summary', 'to conclude',
        'first and foremost', 'last but not least', 'on the other hand'
    ],

    // Human alternatives
    replacements: {
        'utilize': 'use', 'leverage': 'use', 'facilitate': 'help',
        'optimize': 'improve', 'enhance': 'improve', 'implement': 'use',
        'furthermore': 'also', 'moreover': 'plus', 'additionally': 'also',
        'consequently': 'so', 'subsequently': 'then', 'nevertheless': 'however',
        'nonetheless': 'still', 'comprehensive': 'complete', 'innovative': 'new',
        'cutting-edge': 'advanced', 'state-of-the-art': 'modern',
        'revolutionary': 'new', 'groundbreaking': 'new', 'unprecedented': 'unique',
        'transformative': 'changing', 'sophisticated': 'complex', 'advanced': 'modern',
        'robust': 'strong', 'dynamic': 'flexible', 'seamless': 'smooth',
        'scalable': 'expandable', 'versatile': 'flexible', 'optimal': 'best',
        'strategic': 'planned', 'systematic': 'organized', 'particularly': 'especially',
        'specifically': 'exactly', 'significantly': 'greatly', 'substantially': 'largely',
        'essentially': 'basically', 'fundamentally': 'basically', 'primarily': 'mainly',
        'predominantly': 'mostly', 'ultimately': 'finally', 'meticulously': 'carefully',
        'systematically': 'step by step', 'comprehensively': 'completely',
        'extensively': 'widely', 'it is important to note': 'note that',
        'it should be noted': 'importantly', 'it is worth mentioning': 'worth noting',
        'in conclusion': 'finally', 'to summarize': 'in short', 'in summary': 'in short',
        'first and foremost': 'first', 'last but not least': 'finally',
        'on the other hand': 'however'
    },

    // STRUCTURE PRESERVING DETECTION
    detectAndHighlight: function(text) {
        console.log('🔍 Structure Preserving Detection starting...');
        console.log('📝 Original text length:', text.length);
        
        if (!text || text.trim().length === 0) {
            return this.createEmptyResult();
        }

        // Preserve original structure by splitting into paragraphs
        const paragraphs = text.split(/\n\s*\n/);
        console.log('📄 Found paragraphs:', paragraphs.length);
        
        let highlightedParagraphs = [];
        const foundWords = [];
        let totalMatches = 0;
        const detectionDetails = [];

        // Process each paragraph separately
        paragraphs.forEach((paragraph, index) => {
            if (paragraph.trim()) {
                const result = this.processParagraph(paragraph.trim(), index);
                highlightedParagraphs.push(result.highlighted);
                foundWords.push(...result.aiWords);
                totalMatches += result.matches;
                detectionDetails.push(...result.details);
            } else {
                highlightedParagraphs.push(''); // Preserve empty lines
            }
        });

        // Rejoin paragraphs with original spacing
        const highlightedText = highlightedParagraphs.join('\n\n');
        
        // Calculate confidence
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const density = totalMatches / Math.max(wordCount, 1);
        const uniqueWords = [...new Set(foundWords)];
        const confidence = Math.min(density * 2 + 0.1, 0.98);

        const result = {
            text: text,
            highlightedText: highlightedText,
            aiWords: uniqueWords,
            totalMatches: totalMatches,
            confidence: confidence,
            wordCount: wordCount,
            density: density,
            paragraphCount: paragraphs.length,
            detectionDetails: detectionDetails
        };

        console.log('✅ Structure Preserving Detection completed:', {
            aiWords: result.aiWords.length,
            totalMatches: result.totalMatches,
            confidence: Math.round(result.confidence * 100) + '%',
            paragraphs: result.paragraphCount
        });

        return result;
    },

    // Process individual paragraph
    processParagraph: function(paragraph, index) {
        let highlighted = paragraph;
        const aiWords = [];
        let matches = 0;
        const details = [];

        // Check each AI pattern
        this.aiPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${this.escapeRegex(pattern)}\\b`, 'gi');
            const foundMatches = paragraph.match(regex);
            
            if (foundMatches) {
                console.log(`✅ Found "${pattern}" in paragraph ${index + 1}: ${foundMatches.length} times`);
                
                foundMatches.forEach(match => {
                    aiWords.push(match.toLowerCase());
                    details.push({
                        word: match,
                        pattern: pattern,
                        paragraph: index + 1,
                        position: paragraph.toLowerCase().indexOf(match.toLowerCase())
                    });
                });
                
                matches += foundMatches.length;
                
                // Highlight with preserved case
                highlighted = highlighted.replace(regex, (match) => {
                    return `<span class="ai-highlight" data-original="${match}" title="AI Pattern: ${pattern}">${match}</span>`;
                });
            }
        });

        return {
            highlighted: highlighted,
            aiWords: aiWords,
            matches: matches,
            details: details
        };
    },

    // STRUCTURE PRESERVING HUMANIZATION
    humanizeText: function(text) {
        console.log('🤖➡️👤 Structure Preserving Humanization starting...');
        
        if (!text || text.trim().length === 0) {
            return { text: '', replacementCount: 0 };
        }

        // Preserve structure by splitting into paragraphs
        const paragraphs = text.split(/\n\s*\n/);
        let humanizedParagraphs = [];
        let totalReplacements = 0;
        const replacementLog = [];

        // Process each paragraph
        paragraphs.forEach((paragraph, index) => {
            if (paragraph.trim()) {
                const result = this.humanizeParagraph(paragraph.trim(), index);
                humanizedParagraphs.push(result.text);
                totalReplacements += result.replacements;
                replacementLog.push(...result.log);
            } else {
                humanizedParagraphs.push(''); // Preserve empty lines
            }
        });

        // Rejoin with original spacing
        const humanizedText = humanizedParagraphs.join('\n\n');

        // Additional cleanup while preserving structure
        const cleanedText = this.cleanupText(humanizedText);

        const result = {
            text: cleanedText,
            replacementCount: totalReplacements,
            replacementLog: replacementLog,
            originalLength: text.length,
            humanizedLength: cleanedText.length,
            paragraphsProcessed: paragraphs.length
        };

        console.log('✅ Structure Preserving Humanization completed:', {
            replacements: result.replacementCount,
            paragraphs: result.paragraphsProcessed,
            lengthChange: result.humanizedLength - result.originalLength
        });

        return result;
    },

    // Humanize individual paragraph
    humanizeParagraph: function(paragraph, index) {
        let humanized = paragraph;
        let replacements = 0;
        const log = [];

        // Apply replacements while preserving case
        Object.keys(this.replacements).forEach(aiWord => {
            const humanWord = this.replacements[aiWord];
            const regex = new RegExp(`\\b${this.escapeRegex(aiWord)}\\b`, 'gi');
            
            humanized = humanized.replace(regex, (match) => {
                // Preserve original case
                const replacement = this.preserveCase(match, humanWord);
                log.push({
                    original: match,
                    replacement: replacement,
                    paragraph: index + 1,
                    position: humanized.indexOf(match)
                });
                replacements++;
                console.log(`✅ Paragraph ${index + 1}: "${match}" → "${replacement}"`);
                return replacement;
            });
        });

        return {
            text: humanized,
            replacements: replacements,
            log: log
        };
    },

    // Preserve original case when replacing
    preserveCase: function(original, replacement) {
        if (original === original.toUpperCase()) {
            return replacement.toUpperCase();
        }
        if (original === original.toLowerCase()) {
            return replacement.toLowerCase();
        }
        if (original[0] === original[0].toUpperCase()) {
            return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
        }
        return replacement;
    },

    // Clean up text while preserving structure
    cleanupText: function(text) {
        return text
            // Remove redundant phrases but preserve line breaks
            .replace(/\b(it is important to note that|it should be noted that)\s*/gi, '')
            .replace(/\b(in conclusion|to conclude|to summarize),?\s*/gi, 'Finally, ')
            .replace(/\b(first and foremost),?\s*/gi, 'First, ')
            .replace(/\b(last but not least),?\s*/gi, 'Finally, ')
            .replace(/\b(in order to)\b/gi, 'to')
            .replace(/\b(due to the fact that)\b/gi, 'because')
            .replace(/\b(in the event that)\b/gi, 'if')
            .replace(/\b(for the purpose of)\b/gi, 'for')
            // Clean up extra spaces but preserve paragraph structure
            .replace(/ +/g, ' ')
            .replace(/\n +/g, '\n')
            .replace(/ +\n/g, '\n')
            .trim();
    },

    // Escape regex special characters
    escapeRegex: function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // Create empty result
    createEmptyResult: function() {
        return {
            text: '',
            highlightedText: 'No text provided',
            aiWords: [],
            totalMatches: 0,
            confidence: 0,
            wordCount: 0,
            density: 0,
            paragraphCount: 0,
            detectionDetails: []
        };
    },

    // Test with sample
    test: function() {
        const sampleText = `To effectively utilize our comprehensive methodology, we must leverage cutting-edge innovations to facilitate optimal outcomes. Furthermore, this advanced paradigm will enhance our ability to streamline operations.

Moreover, the implementation of these robust solutions demonstrates our commitment to delivering exceptional results. It is important to note that we systematically evaluate each component to maintain quality.

In conclusion, by implementing these sophisticated strategies, we can achieve unprecedented success.`;
        
        console.log('🧪 Testing Structure Preserving Detector...');
        const detectionResult = this.detectAndHighlight(sampleText);
        const humanizationResult = this.humanizeText(sampleText);
        
        console.log('🎯 Test Results:', {
            detection: detectionResult,
            humanization: humanizationResult
        });
        
        return { detection: detectionResult, humanization: humanizationResult };
    }
};

// Enhanced CSS for better highlighting
const enhancedCSS = `
<style>
.ai-highlight {
    background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%) !important;
    color: white !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    font-weight: 600 !important;
    border: 1px solid #ff0000 !important;
    box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3) !important;
    display: inline !important;
    margin: 0 1px !important;
    animation: aiGlow 2s ease-in-out !important;
    cursor: help !important;
}

@keyframes aiGlow {
    0%, 100% { 
        box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 4px 15px rgba(255, 68, 68, 0.6);
        transform: scale(1.02);
    }
}

.ai-highlight:hover {
    background: linear-gradient(135deg, #ff2222 0%, #aa0000 100%) !important;
    transform: scale(1.05) !important;
    box-shadow: 0 4px 20px rgba(255, 68, 68, 0.7) !important;
    z-index: 1000 !important;
}

/* Preserve text formatting */
.result-content {
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    line-height: 1.8 !important;
    font-family: inherit !important;
}
</style>
`;

// Inject CSS
if (typeof document !== 'undefined') {
    document.head.insertAdjacentHTML('beforeend', enhancedCSS);
}

// Set as primary detector
window.primaryAIDetector = window.STRUCTURE_AI_DETECTOR;

// Auto-test
setTimeout(() => {
    if (window.STRUCTURE_AI_DETECTOR) {
        window.STRUCTURE_AI_DETECTOR.test();
    }
}, 1000);

console.log('✅ Structure Preserving AI Detector loaded successfully!');
