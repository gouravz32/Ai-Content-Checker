/**
 * AI Detection Engine
 * Advanced algorithms for detecting AI-generated text patterns
 */

class AIDetector {
    constructor() {
        this.confidence = 0;
        this.initializePatterns();
    }

    /**
     * Initialize AI detection patterns
     */
    initializePatterns() {
        // Common AI phrases and their human alternatives
        this.aiPatterns = {
            // Formal/Academic AI phrases
            'delve into': 'explore',
            'furthermore': 'also',
            'moreover': 'plus',
            'in conclusion': 'finally',
            'it is important to note': 'note that',
            'it should be noted': 'importantly',
            'it is worth mentioning': 'worth noting',
            'it is essential to understand': 'understand that',
            'it is crucial to recognize': 'recognize that',
            'it is vital to consider': 'consider that',
            
            // Business jargon AI commonly uses
            'leverage': 'use',
            'utilize': 'use',
            'facilitate': 'help',
            'optimize': 'improve',
            'enhance': 'improve',
            'implement': 'use',
            'demonstrate': 'show',
            'establish': 'create',
            'maintain': 'keep',
            'ensure': 'make sure',
            'comprehensive': 'complete',
            'holistic': 'complete',
            'synergistic': 'combined',
            'paradigm': 'model',
            'methodology': 'method',
            
            // Transition words AI overuses
            'subsequently': 'then',
            'consequently': 'so',
            'nevertheless': 'however',
            'nonetheless': 'still',
            'furthermore': 'also',
            'additionally': 'also',
            'accordingly': 'so',
            'thereby': 'thus',
            'wherein': 'where',
            'whereas': 'while',
            'whereby': 'by which',
            'henceforth': 'from now on',
            'heretofore': 'until now',
            'notwithstanding': 'despite',
            'albeit': 'although',
            'inasmuch': 'since',
            'insofar': 'to the extent',
            'vis-à-vis': 'compared to',
            
            // Intensifiers AI commonly uses
            'specifically': 'exactly',
            'particularly': 'especially',
            'significantly': 'greatly',
            'substantially': 'largely',
            'essentially': 'basically',
            'fundamentally': 'basically',
            'primarily': 'mainly',
            'predominantly': 'mostly',
            'ultimately': 'finally',
            'alternatively': 'instead',
            'undeniably': 'clearly',
            'unequivocally': 'clearly',
            'indubitably': 'certainly',
            'invariably': 'always',
            'perpetually': 'always',
            'consistently': 'regularly',
            
            // Redundant phrases
            'in order to': 'to',
            'due to the fact that': 'because',
            'despite the fact that': 'although',
            'in the event that': 'if',
            'for the purpose of': 'to',
            'with regard to': 'about',
            'in relation to': 'about',
            'concerning the matter of': 'about',
            'with respect to': 'about',
            'in terms of': 'for',
            'as a result of': 'because of',
            'in light of': 'because of',
            'by virtue of': 'because of',
            'on the basis of': 'based on',
            'for the reason that': 'because'
        };

        // AI sentence starters that are commonly overused
        this.aiStarters = [
            'it is important to understand',
            'it should be noted that',
            'it is worth considering',
            'one must consider',
            'it is essential to',
            'it is crucial to',
            'it is vital to',
            'it is necessary to',
            'when considering',
            'in order to',
            'for the purpose of',
            'with regard to',
            'in relation to',
            'concerning the matter of',
            'with respect to',
            'it cannot be denied that',
            'it goes without saying that',
            'needless to say',
            'it stands to reason that',
            'it is widely acknowledged that',
            'it is generally accepted that',
            'there is no doubt that',
            'it is undeniable that',
            'it is universally recognized that',
            'it is commonly understood that'
        ];

        // AI conclusion patterns
        this.aiConclusions = [
            'in conclusion',
            'to conclude',
            'in summary',
            'to summarize',
            'in closing',
            'to wrap up',
            'all things considered',
            'taking everything into account',
            'given all the factors',
            'weighing all the evidence',
            'after careful consideration',
            'upon reflection',
            'in the final analysis',
            'when all is said and done'
        ];

        // Repetitive AI phrases
        this.repetitivePatterns = [
            'various',
            'numerous',
            'multiple',
            'diverse',
            'range of',
            'variety of',
            'array of',
            'multitude of',
            'plethora of',
            'myriad of',
            'abundance of',
            'wealth of',
            'host of',
            'spectrum of',
            'gamut of'
        ];

        // Technical AI buzzwords
        this.technicalBuzzwords = [
            'ecosystem',
            'framework',
            'infrastructure',
            'architecture',
            'scalability',
            'sustainability',
            'optimization',
            'integration',
            'implementation',
            'deployment',
            'transformation',
            'innovation',
            'disruption',
            'revolution',
            'evolution',
            'advancement',
            'breakthrough',
            'cutting-edge',
            'state-of-the-art',
            'next-generation'
        ];
    }

    /**
     * Main function to detect AI patterns in text
     */
    detectAIPatterns(text) {
        const aiWords = [];
        let highlightedText = text;
        let totalConfidence = 0;
        let patternCount = 0;

        // Check for AI patterns
        const patternResults = this.checkPatterns(text, this.aiPatterns);
        aiWords.push(...patternResults.aiWords);
        highlightedText = patternResults.highlightedText;
        totalConfidence += patternResults.confidence;
        patternCount += patternResults.count;

        // Check for AI sentence starters
        const starterResults = this.checkStarters(highlightedText, this.aiStarters);
        aiWords.push(...starterResults.aiWords);
        highlightedText = starterResults.highlightedText;
        totalConfidence += starterResults.confidence;
        patternCount += starterResults.count;

        // Check for AI conclusions
        const conclusionResults = this.checkPatterns(highlightedText, 
            Object.fromEntries(this.aiConclusions.map(phrase => [phrase, 'finally']))
        );
        aiWords.push(...conclusionResults.aiWords);
        highlightedText = conclusionResults.highlightedText;
        totalConfidence += conclusionResults.confidence;
        patternCount += conclusionResults.count;

        // Check for repetitive patterns
        const repetitiveResults = this.checkRepetitivePatterns(highlightedText);
        aiWords.push(...repetitiveResults.aiWords);
        highlightedText = repetitiveResults.highlightedText;
        totalConfidence += repetitiveResults.confidence;
        patternCount += repetitiveResults.count;

        // Check for technical buzzwords
        const buzzwordResults = this.checkBuzzwords(highlightedText);
        aiWords.push(...buzzwordResults.aiWords);
        highlightedText = buzzwordResults.highlightedText;
        totalConfidence += buzzwordResults.confidence;
        patternCount += buzzwordResults.count;

        // Analyze sentence structure
        const structureResults = this.analyzeSentenceStructure(text);
        totalConfidence += structureResults.confidence;
        patternCount += structureResults.count;

        // Analyze word complexity
        const complexityResults = this.analyzeWordComplexity(text);
        totalConfidence += complexityResults.confidence;
        patternCount += complexityResults.count;

        // Calculate overall confidence
        const overallConfidence = patternCount > 0 ? Math.min(totalConfidence / patternCount, 1) : 0;

        return {
            originalText: text,
            highlightedText,
            aiWords: this.removeDuplicateWords(aiWords),
            confidence: overallConfidence,
            detectionScore: this.calculateDetectionScore(aiWords.length, text.split(/\s+/).length),
            patterns: {
                formalPhrases: patternResults.count,
                sentenceStarters: starterResults.count,
                conclusions: conclusionResults.count,
                repetitivePatterns: repetitiveResults.count,
                buzzwords: buzzwordResults.count,
                structureScore: structureResults.confidence,
                complexityScore: complexityResults.confidence
            }
        };
    }

    /**
     * Check for specific AI patterns
     */
    checkPatterns(text, patterns) {
        const aiWords = [];
        let highlightedText = text;
        let confidence = 0;
        let count = 0;

        Object.keys(patterns).forEach(pattern => {
            const regex = new RegExp(`\\b${this.escapeRegex(pattern)}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                matches.forEach(match => {
                    aiWords.push({
                        word: match,
                        suggestion: patterns[pattern.toLowerCase()],
                        confidence: this.calculatePatternConfidence(pattern),
                        type: 'pattern'
                    });
                    confidence += this.calculatePatternConfidence(pattern);
                    count++;
                });

                highlightedText = highlightedText.replace(regex, (match) => {
                    return `<span class="ai-word" data-suggestion="${patterns[pattern.toLowerCase()]}" data-type="pattern">${match}</span>`;
                });
            }
        });

        return { aiWords, highlightedText, confidence, count };
    }

    /**
     * Check for AI sentence starters
     */
    checkStarters(text, starters) {
        const aiWords = [];
        let highlightedText = text;
        let confidence = 0;
        let count = 0;

        starters.forEach(starter => {
            const regex = new RegExp(`\\b${this.escapeRegex(starter)}`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                matches.forEach(match => {
                    if (!aiWords.some(w => w.word.toLowerCase() === match.toLowerCase())) {
                        aiWords.push({
                            word: match,
                            suggestion: 'Consider a more direct approach',
                            confidence: 0.8,
                            type: 'starter'
                        });
                        confidence += 0.8;
                        count++;
                    }
                });

                highlightedText = highlightedText.replace(regex, (match) => {
                    return `<span class="ai-word" data-suggestion="Consider a more direct approach" data-type="starter">${match}</span>`;
                });
            }
        });

        return { aiWords, highlightedText, confidence, count };
    }

    /**
     * Check for repetitive patterns
     */
    checkRepetitivePatterns(text) {
        const aiWords = [];
        let highlightedText = text;
        let confidence = 0;
        let count = 0;

        this.repetitivePatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${this.escapeRegex(pattern)}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches && matches.length > 2) { // Flag if used more than twice
                matches.forEach(match => {
                    aiWords.push({
                        word: match,
                        suggestion: 'Overused - consider alternatives',
                        confidence: 0.6,
                        type: 'repetitive'
                    });
                });

                confidence += 0.6 * matches.length;
                count += matches.length;

                highlightedText = highlightedText.replace(regex, (match) => {
                    return `<span class="ai-word" data-suggestion="Overused - consider alternatives" data-type="repetitive">${match}</span>`;
                });
            }
        });

        return { aiWords, highlightedText, confidence, count };
    }

    /**
     * Check for technical buzzwords
     */
    checkBuzzwords(text) {
        const aiWords = [];
        let highlightedText = text;
        let confidence = 0;
        let count = 0;

        this.technicalBuzzwords.forEach(buzzword => {
            const regex = new RegExp(`\\b${this.escapeRegex(buzzword)}\\b`, 'gi');
            const matches = text.match(regex);
            
            if (matches) {
                matches.forEach(match => {
                    aiWords.push({
                        word: match,
                        suggestion: 'Consider simpler alternative',
                        confidence: 0.5,
                        type: 'buzzword'
                    });
                });

                confidence += 0.5 * matches.length;
                count += matches.length;

                highlightedText = highlightedText.replace(regex, (match) => {
                    return `<span class="ai-word" data-suggestion="Consider simpler alternative" data-type="buzzword">${match}</span>`;
                });
            }
        });

        return { aiWords, highlightedText, confidence, count };
    }

    /**
     * Analyze sentence structure for AI patterns
     */
    analyzeSentenceStructure(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        let confidence = 0;
        let count = 0;

        // Check for uniform sentence length (AI tendency)
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
        
        if (variance < 20 && sentences.length > 3) { // Low variance suggests AI
            confidence += 0.3;
            count++;
        }

        // Check for passive voice overuse
        const passivePatterns = [
            /\bis\s+\w+ed\b/gi,
            /\bare\s+\w+ed\b/gi,
            /\bwas\s+\w+ed\b/gi,
            /\bwere\s+\w+ed\b/gi,
            /\bbeen\s+\w+ed\b/gi
        ];

        let passiveCount = 0;
        passivePatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) passiveCount += matches.length;
        });

        if (passiveCount / sentences.length > 0.3) { // More than 30% passive
            confidence += 0.4;
            count++;
        }

        return { confidence, count };
    }

    /**
     * Analyze word complexity
     */
    analyzeWordComplexity(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        let confidence = 0;
        let count = 0;

        // Count complex words (more than 6 characters)
        const complexWords = words.filter(word => word.length > 6);
        const complexityRatio = complexWords.length / words.length;

        if (complexityRatio > 0.3) { // More than 30% complex words
            confidence += 0.3;
            count++;
        }

        // Check for Latin/academic phrases
        const latinPhrases = [
            'ad hoc', 'per se', 'vis-à-vis', 'de facto', 'prima facie',
            'inter alia', 'circa', 'versus', 'ergo', 'ipso facto'
        ];

        latinPhrases.forEach(phrase => {
            if (text.toLowerCase().includes(phrase)) {
                confidence += 0.2;
                count++;
            }
        });

        return { confidence, count };
    }

    /**
     * Calculate confidence for specific patterns
     */
    calculatePatternConfidence(pattern) {
        // Higher confidence for more distinctive AI patterns
        const highConfidencePatterns = [
            'delve into', 'it is important to note', 'it should be noted',
            'leverage', 'utilize', 'facilitate'
        ];

        if (highConfidencePatterns.includes(pattern.toLowerCase())) {
            return 0.9;
        }

        return 0.7; // Default confidence
    }

    /**
     * Calculate overall detection score
     */
    calculateDetectionScore(aiWordsCount, totalWords) {
        if (totalWords === 0) return 0;
        
        const ratio = aiWordsCount / totalWords;
        return Math.min(ratio * 100, 100); // Cap at 100%
    }

    /**
     * Remove duplicate AI words
     */
    removeDuplicateWords(aiWords) {
        const seen = new Set();
        return aiWords.filter(wordObj => {
            const key = `${wordObj.word.toLowerCase()}-${wordObj.type}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    /**
     * Escape special regex characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Get detection statistics
     */
    getDetectionStats(text) {
        const result = this.detectAIPatterns(text);
        
        return {
            totalWords: text.split(/\s+/).length,
            aiWordsDetected: result.aiWords.length,
            confidenceScore: Math.round(result.confidence * 100),
            detectionScore: Math.round(result.detectionScore),
            humanScore: Math.max(0, 100 - Math.round(result.detectionScore)),
            patterns: result.patterns
        };
    }

    /**
     * Get suggestions for improving text
     */
    getSuggestions(text) {
        const result = this.detectAIPatterns(text);
        const suggestions = [];

        if (result.aiWords.length > 0) {
            suggestions.push({
                type: 'word_replacement',
                message: `Replace ${result.aiWords.length} AI-detected words with more natural alternatives`,
                priority: 'high'
            });
        }

        if (result.patterns.formalPhrases > 3) {
            suggestions.push({
                type: 'formality',
                message: 'Reduce formal/academic language for more conversational tone',
                priority: 'medium'
            });
        }

        if (result.patterns.repetitivePatterns > 2) {
            suggestions.push({
                type: 'variety',
                message: 'Use more varied vocabulary to avoid repetition',
                priority: 'medium'
            });
        }

        if (result.patterns.structureScore > 0.5) {
            suggestions.push({
                type: 'structure',
                message: 'Vary sentence length and structure for more natural flow',
                priority: 'low'
            });
        }

        return suggestions;
    }
}

// Create global instance
const aiDetector = new AIDetector();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIDetector;
}