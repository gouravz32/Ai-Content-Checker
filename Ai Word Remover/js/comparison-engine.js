/**
 * Before/After Comparison Engine
 * Shows detailed word-by-word changes between original and humanized text
 */

console.log('🔄 Loading Comparison Engine...');

window.COMPARISON_ENGINE = {
    
    // Generate detailed comparison between original and humanized text
    generateComparison: function(originalText, humanizedText) {
        console.log('🔍 Generating detailed comparison...');
        
        const comparison = {
            original: originalText,
            humanized: humanizedText,
            changes: [],
            statistics: {
                totalWords: 0,
                changedWords: 0,
                addedWords: 0,
                removedWords: 0,
                changePercentage: 0
            },
            highlightedOriginal: '',
            highlightedHumanized: '',
            changeDetails: []
        };

        // Split into words for comparison
        const originalWords = this.tokenizeText(originalText);
        const humanizedWords = this.tokenizeText(humanizedText);
        
        console.log('📝 Original words:', originalWords.length);
        console.log('📝 Humanized words:', humanizedWords.length);

        // Perform detailed diff analysis
        const diffResult = this.performDiff(originalWords, humanizedWords);
        
        // Generate highlighted versions
        comparison.highlightedOriginal = this.highlightOriginal(originalText, diffResult.changes);
        comparison.highlightedHumanized = this.highlightHumanized(humanizedText, diffResult.changes);
        
        // Calculate statistics
        comparison.statistics = this.calculateStatistics(originalWords, humanizedWords, diffResult.changes);
        comparison.changes = diffResult.changes;
        comparison.changeDetails = this.generateChangeDetails(diffResult.changes);

        console.log('✅ Comparison generated:', {
            totalChanges: comparison.changes.length,
            changePercentage: comparison.statistics.changePercentage + '%'
        });

        return comparison;
    },

    // Tokenize text into words while preserving punctuation
    tokenizeText: function(text) {
        // Split by whitespace but keep punctuation with words
        return text.match(/\S+/g) || [];
    },

    // Perform detailed diff between word arrays
    performDiff: function(originalWords, humanizedWords) {
        const changes = [];
        const originalMap = new Map();
        const humanizedMap = new Map();
        
        // Create word position maps
        originalWords.forEach((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            if (!originalMap.has(cleanWord)) {
                originalMap.set(cleanWord, []);
            }
            originalMap.get(cleanWord).push({word: word, index: index});
        });

        humanizedWords.forEach((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            if (!humanizedMap.has(cleanWord)) {
                humanizedMap.set(cleanWord, []);
            }
            humanizedMap.get(cleanWord).push({word: word, index: index});
        });

        // Find direct word replacements
        this.findDirectReplacements(originalWords, humanizedWords, changes);
        
        // Find phrase replacements
        this.findPhraseReplacements(originalWords, humanizedWords, changes);

        return { changes: changes };
    },

    // Find direct word-to-word replacements
    findDirectReplacements: function(originalWords, humanizedWords, changes) {
        const replacementPatterns = {
            'utilize': 'use', 'leverage': 'use', 'facilitate': 'help',
            'optimize': 'improve', 'enhance': 'improve', 'implement': 'use',
            'furthermore': 'also', 'moreover': 'plus', 'additionally': 'also',
            'consequently': 'so', 'subsequently': 'then', 'nevertheless': 'however',
            'comprehensive': 'complete', 'innovative': 'new', 'sophisticated': 'complex',
            'specifically': 'exactly', 'particularly': 'especially', 'significantly': 'greatly',
            'substantially': 'largely', 'essentially': 'basically', 'fundamentally': 'basically',
            'primarily': 'mainly', 'predominantly': 'mostly', 'ultimately': 'finally'
        };

        Object.keys(replacementPatterns).forEach(originalWord => {
            const replacementWord = replacementPatterns[originalWord];
            
            originalWords.forEach((word, index) => {
                const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                if (cleanWord === originalWord.toLowerCase()) {
                    // Check if this position has the replacement in humanized text
                    if (humanizedWords[index]) {
                        const humanizedClean = humanizedWords[index].toLowerCase().replace(/[^\w]/g, '');
                        if (humanizedClean === replacementWord.toLowerCase()) {
                            changes.push({
                                type: 'replacement',
                                original: word,
                                humanized: humanizedWords[index],
                                position: index,
                                reason: 'AI word replaced with human alternative',
                                category: 'word_replacement'
                            });
                        }
                    }
                }
            });
        });
    },

    // Find phrase replacements
    findPhraseReplacements: function(originalWords, humanizedWords, changes) {
        const phrasePatterns = {
            'it is important to note': 'note that',
            'it should be noted': 'importantly',
            'in conclusion': 'finally',
            'to summarize': 'in short',
            'first and foremost': 'first',
            'last but not least': 'finally',
            'in order to': 'to',
            'due to the fact that': 'because'
        };

        const originalText = originalWords.join(' ');
        const humanizedText = humanizedWords.join(' ');

        Object.keys(phrasePatterns).forEach(originalPhrase => {
            const replacementPhrase = phrasePatterns[originalPhrase];
            
            if (originalText.toLowerCase().includes(originalPhrase.toLowerCase()) && 
                humanizedText.toLowerCase().includes(replacementPhrase.toLowerCase())) {
                changes.push({
                    type: 'phrase_replacement',
                    original: originalPhrase,
                    humanized: replacementPhrase,
                    position: originalText.toLowerCase().indexOf(originalPhrase.toLowerCase()),
                    reason: 'AI phrase simplified for human readability',
                    category: 'phrase_replacement'
                });
            }
        });
    },

    // Highlight changes in original text
    highlightOriginal: function(originalText, changes) {
        let highlighted = originalText;
        
        // Sort changes by position (reverse order to avoid index shifting)
        const sortedChanges = changes.sort((a, b) => b.position - a.position);
        
        sortedChanges.forEach(change => {
            if (change.type === 'replacement') {
                const regex = new RegExp(`\\b${this.escapeRegex(change.original)}\\b`, 'gi');
                highlighted = highlighted.replace(regex, (match) => {
                    return `<span class="original-highlight" title="Changed from: ${match}">${match}</span>`;
                });
            } else if (change.type === 'phrase_replacement') {
                const regex = new RegExp(this.escapeRegex(change.original), 'gi');
                highlighted = highlighted.replace(regex, (match) => {
                    return `<span class="original-phrase-highlight" title="Phrase changed from: ${match}">${match}</span>`;
                });
            }
        });

        return highlighted;
    },

    // Highlight changes in humanized text
    highlightHumanized: function(humanizedText, changes) {
        let highlighted = humanizedText;
        
        changes.forEach(change => {
            if (change.type === 'replacement') {
                const regex = new RegExp(`\\b${this.escapeRegex(change.humanized)}\\b`, 'gi');
                highlighted = highlighted.replace(regex, (match) => {
                    return `<span class="humanized-highlight" title="Changed to: ${match} (was: ${change.original})">${match}</span>`;
                });
            } else if (change.type === 'phrase_replacement') {
                const regex = new RegExp(this.escapeRegex(change.humanized), 'gi');
                highlighted = highlighted.replace(regex, (match) => {
                    return `<span class="humanized-phrase-highlight" title="Phrase changed to: ${match} (was: ${change.original})">${match}</span>`;
                });
            }
        });

        return highlighted;
    },

    // Calculate comparison statistics
    calculateStatistics: function(originalWords, humanizedWords, changes) {
        const totalOriginalWords = originalWords.length;
        const totalHumanizedWords = humanizedWords.length;
        const changedWords = changes.filter(c => c.type === 'replacement').length;
        const changedPhrases = changes.filter(c => c.type === 'phrase_replacement').length;
        
        return {
            totalWords: totalOriginalWords,
            changedWords: changedWords,
            changedPhrases: changedPhrases,
            addedWords: Math.max(0, totalHumanizedWords - totalOriginalWords),
            removedWords: Math.max(0, totalOriginalWords - totalHumanizedWords),
            changePercentage: Math.round((changedWords / Math.max(totalOriginalWords, 1)) * 100),
            totalChanges: changes.length
        };
    },

    // Generate detailed change descriptions
    generateChangeDetails: function(changes) {
        const details = [];
        
        changes.forEach((change, index) => {
            if (change.type === 'replacement') {
                details.push({
                    id: index + 1,
                    type: 'Word Change',
                    description: `"${change.original}" → "${change.humanized}"`,
                    reason: change.reason,
                    category: change.category,
                    impact: 'Makes text sound more natural'
                });
            } else if (change.type === 'phrase_replacement') {
                details.push({
                    id: index + 1,
                    type: 'Phrase Change',
                    description: `"${change.original}" → "${change.humanized}"`,
                    reason: change.reason,
                    category: change.category,
                    impact: 'Simplifies complex phrasing'
                });
            }
        });

        return details;
    },

    // Display comparison results in the UI
    displayComparison: function(comparison) {
        console.log('📊 Displaying comparison results...');
        
        // Create comparison container
        const comparisonHtml = this.generateComparisonHTML(comparison);
        
        // Find or create comparison container
        let comparisonContainer = document.getElementById('comparisonContainer');
        if (!comparisonContainer) {
            comparisonContainer = document.createElement('div');
            comparisonContainer.id = 'comparisonContainer';
            comparisonContainer.className = 'comparison-container';
            
            // Insert after humanized results
            const humanizedResults = document.getElementById('humanizedResults');
            if (humanizedResults && humanizedResults.parentNode) {
                humanizedResults.parentNode.insertBefore(comparisonContainer, humanizedResults.nextSibling);
            } else {
                document.body.appendChild(comparisonContainer);
            }
        }
        
        comparisonContainer.innerHTML = comparisonHtml;
        comparisonContainer.style.display = 'block';
        
        // Scroll to comparison
        comparisonContainer.scrollIntoView({ behavior: 'smooth' });
        
        console.log('✅ Comparison displayed successfully');
    },

    // Generate HTML for comparison display
    generateComparisonHTML: function(comparison) {
        const stats = comparison.statistics;
        
        return `
            <div class="comparison-results">
                <div class="comparison-header">
                    <h3>🔄 Before vs After Comparison</h3>
                    <div class="comparison-stats">
                        <span class="stat-badge">
                            <i class="fas fa-edit"></i> ${stats.totalChanges} Changes Made
                        </span>
                        <span class="stat-badge">
                            <i class="fas fa-percentage"></i> ${stats.changePercentage}% Improved
                        </span>
                        <span class="stat-badge">
                            <i class="fas fa-word"></i> ${stats.changedWords} Words Changed
                        </span>
                    </div>
                </div>

                <div class="comparison-panels">
                    <div class="comparison-panel original-panel">
                        <h4>📝 Original Text (AI-like)</h4>
                        <div class="comparison-text original-text">
                            ${comparison.highlightedOriginal}
                        </div>
                    </div>
                    
                    <div class="comparison-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    
                    <div class="comparison-panel humanized-panel">
                        <h4>👤 Humanized Text (Natural)</h4>
                        <div class="comparison-text humanized-text">
                            ${comparison.highlightedHumanized}
                        </div>
                    </div>
                </div>

                <div class="change-details">
                    <h4>📊 Detailed Changes</h4>
                    <div class="changes-list">
                        ${comparison.changeDetails.map(detail => `
                            <div class="change-item">
                                <span class="change-number">${detail.id}</span>
                                <div class="change-info">
                                    <div class="change-description">${detail.description}</div>
                                    <div class="change-reason">${detail.reason}</div>
                                </div>
                                <span class="change-type">${detail.type}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="comparison-summary">
                    <div class="summary-stats">
                        <div class="summary-stat">
                            <span class="stat-label">Total Words:</span>
                            <span class="stat-value">${stats.totalWords}</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Words Changed:</span>
                            <span class="stat-value">${stats.changedWords}</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Improvement:</span>
                            <span class="stat-value">${stats.changePercentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Escape regex special characters
    escapeRegex: function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // Test the comparison engine
    test: function() {
        console.log('🧪 Testing Comparison Engine...');
        
        const originalText = "To effectively utilize our comprehensive methodology, we must leverage cutting-edge innovations to facilitate optimal outcomes. Furthermore, this advanced paradigm will enhance our ability to streamline operations.";
        const humanizedText = "To effectively use our complete methodology, we must use cutting-edge innovations to help optimal outcomes. Also, this advanced paradigm will improve our ability to streamline operations.";
        
        const comparison = this.generateComparison(originalText, humanizedText);
        console.log('🎯 Test Results:', comparison);
        
        return comparison;
    }
};

// Enhanced CSS for comparison display
const comparisonCSS = `
<style>
.comparison-container {
    margin: 30px auto;
    max-width: 1200px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.comparison-header {
    text-align: center;
    margin-bottom: 25px;
}

.comparison-header h3 {
    color: #2c3e50;
    font-size: 28px;
    margin-bottom: 15px;
    font-weight: 700;
}

.comparison-stats {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.stat-badge {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(0,123,255,0.3);
}

.comparison-panels {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    margin: 25px 0;
    align-items: start;
}

.comparison-panel {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.original-panel {
    border-color: #ff6b6b;
}

.humanized-panel {
    border-color: #51cf66;
}

.comparison-panel h4 {
    margin: 0 0 15px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50 !important;
    background: rgba(255,255,255,0.9) !important;
    padding: 10px 15px !important;
    border-radius: 8px !important;
    text-align: center !important;
}

.original-panel h4 {
    color: #e03131;
}

.humanized-panel h4 {
    color: #37b24d;
}

.comparison-text {
    line-height: 1.8;
    font-size: 16px;
    word-wrap: break-word;
    color: #2c3e50 !important;
    background: rgba(255,255,255,0.95) !important;
    padding: 20px !important;
    border-radius: 10px !important;
    border: 1px solid rgba(0,0,0,0.1) !important;
}

.comparison-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #007bff;
}

.original-highlight {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%) !important;
    color: white !important;
    padding: 4px 10px !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(255,107,107,0.4) !important;
    cursor: help !important;
    margin: 0 2px !important;
    display: inline !important;
    border: 2px solid #ff4444 !important;
}

.humanized-highlight {
    background: linear-gradient(135deg, #51cf66 0%, #40c057 100%) !important;
    color: white !important;
    padding: 4px 10px !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(81,207,102,0.4) !important;
    cursor: help !important;
    margin: 0 2px !important;
    display: inline !important;
    border: 2px solid #28a745 !important;
}

.original-phrase-highlight {
    background: linear-gradient(135deg, #ffa8a8 0%, #ff8787 100%) !important;
    color: #721c24 !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    cursor: help !important;
}

.humanized-phrase-highlight {
    background: linear-gradient(135deg, #8ce99a 0%, #69db7c 100%) !important;
    color: #2b8a3e !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    cursor: help !important;
}

.change-details {
    margin: 25px 0;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.change-details h4 {
    color: #2c3e50;
    margin: 0 0 15px 0;
    font-size: 20px;
    font-weight: 600;
}

.changes-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.change-item {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    border-left: 4px solid #007bff;
}

.change-number {
    background: #007bff;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 15px;
    flex-shrink: 0;
}

.change-info {
    flex: 1;
}

.change-description {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 4px;
}

.change-reason {
    font-size: 14px;
    color: #6c757d;
}

.change-type {
    background: #e9ecef;
    color: #495057;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
}

.comparison-summary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 25px;
}

.summary-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.summary-stat {
    text-align: center;
}

.stat-label {
    display: block;
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 5px;
}

.stat-value {
    display: block;
    font-size: 24px;
    font-weight: 700;
}

@media (max-width: 768px) {
    .comparison-panels {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .comparison-arrow {
        transform: rotate(90deg);
        margin: 10px 0;
    }
    
    .comparison-stats {
        flex-direction: column;
        align-items: center;
    }
}
</style>
`;

// Inject CSS
if (typeof document !== 'undefined') {
    document.head.insertAdjacentHTML('beforeend', comparisonCSS);
}

// Auto-test
setTimeout(() => {
    if (window.COMPARISON_ENGINE) {
        window.COMPARISON_ENGINE.test();
    }
}, 1000);

console.log('✅ Comparison Engine loaded successfully!');
