/**
 * Text Humanization Engine
 * Transforms AI-generated text into more natural, human-like content
 */

class TextHumanizer {
    constructor() {
        this.initializeHumanizationRules();
    }

    /**
     * Initialize humanization rules and patterns
     */
    initializeHumanizationRules() {
        // Direct word replacements from AI to human alternatives
        this.wordReplacements = {
            // Formal to casual
            'utilize': 'use',
            'leverage': 'use',
            'facilitate': 'help',
            'optimize': 'improve',
            'enhance': 'improve',
            'implement': 'use',
            'demonstrate': 'show',
            'establish': 'create',
            'maintain': 'keep',
            'ensure': 'make sure',
            'comprehensive': 'complete',
            'subsequently': 'then',
            'consequently': 'so',
            'nevertheless': 'however',
            'furthermore': 'also',
            'moreover': 'plus',
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
            'additionally': 'also',
            'accordingly': 'so',
            'thereby': 'thus',
            'wherein': 'where',
            'whereas': 'while',
            'whereby': 'by which',
            'nonetheless': 'still',
            'henceforth': 'from now on',
            'heretofore': 'until now',
            'notwithstanding': 'despite',
            'albeit': 'although',
            'inasmuch': 'since',
            'insofar': 'to the extent',
            'vis-à-vis': 'compared to',
            
            // Business jargon to simple terms
            'paradigm': 'model',
            'methodology': 'method',
            'infrastructure': 'system',
            'architecture': 'structure',
            'ecosystem': 'environment',
            'framework': 'structure',
            'scalability': 'growth potential',
            'sustainability': 'long-term viability',
            'optimization': 'improvement',
            'integration': 'combining',
            'implementation': 'putting into practice',
            'deployment': 'rollout',
            'transformation': 'change',
            'innovation': 'new idea',
            'disruption': 'major change',
            'synergistic': 'combined',
            'holistic': 'complete',
            
            // Academic to conversational
            'plethora': 'plenty',
            'myriad': 'many',
            'multitude': 'many',
            'abundance': 'plenty',
            'commence': 'start',
            'conclude': 'end',
            'ascertain': 'find out',
            'endeavor': 'try',
            'subsequent': 'next',
            'prior': 'before',
            'adjacent': 'next to',
            'sufficient': 'enough',
            'numerous': 'many',
            'various': 'different',
            'diverse': 'different',
            'aforementioned': 'mentioned earlier',
            'aforestated': 'said earlier',
            'heretofore': 'until now',
            'hitherto': 'until now'
        };

        // Phrase replacements for common AI constructions
        this.phraseReplacements = {
            'delve into': 'explore',
            'in conclusion': 'finally',
            'it is important to note': 'note that',
            'it should be noted': 'importantly',
            'it is worth mentioning': 'worth noting',
            'it is essential to understand': 'understand that',
            'it is crucial to recognize': 'recognize that',
            'it is vital to consider': 'consider that',
            'one must consider': 'consider this:',
            'when considering': 'when thinking about',
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
            'for the reason that': 'because',
            'it cannot be denied that': '',
            'it goes without saying that': '',
            'needless to say': '',
            'it stands to reason that': '',
            'it is widely acknowledged that': '',
            'it is generally accepted that': '',
            'there is no doubt that': '',
            'it is undeniable that': '',
            'it is universally recognized that': '',
            'it is commonly understood that': '',
            'all things considered': 'overall',
            'taking everything into account': 'overall',
            'given all the factors': 'considering everything',
            'weighing all the evidence': 'looking at the facts',
            'after careful consideration': 'after thinking about it',
            'upon reflection': 'thinking about it',
            'in the final analysis': 'ultimately',
            'when all is said and done': 'in the end'
        };

        // Sentence starters to make text more conversational
        this.conversationalStarters = [
            'Here\'s the thing:',
            'The truth is:',
            'What\'s interesting is:',
            'The reality is:',
            'What matters most:',
            'The key point:',
            'What\'s important:',
            'The bottom line:',
            'Simply put:',
            'Let\'s be honest:',
            'Here\'s what I think:',
            'In my experience:',
            'What I\'ve found is:',
            'The way I see it:'
        ];

        // Transition words that sound more natural
        this.naturalTransitions = {
            'furthermore': ['also', 'plus', 'and', 'what\'s more'],
            'moreover': ['also', 'plus', 'and', 'on top of that'],
            'additionally': ['also', 'plus', 'and', 'besides'],
            'consequently': ['so', 'as a result', 'because of this'],
            'therefore': ['so', 'that\'s why', 'because of this'],
            'subsequently': ['then', 'next', 'after that'],
            'nevertheless': ['however', 'but', 'even so', 'still'],
            'nonetheless': ['still', 'even so', 'but'],
            'alternatively': ['instead', 'or', 'on the other hand'],
            'accordingly': ['so', 'that\'s why', 'because of this']
        };

        // Contractions to make text less formal
        this.contractions = {
            'do not': 'don\'t',
            'does not': 'doesn\'t',
            'did not': 'didn\'t',
            'will not': 'won\'t',
            'would not': 'wouldn\'t',
            'could not': 'couldn\'t',
            'should not': 'shouldn\'t',
            'cannot': 'can\'t',
            'is not': 'isn\'t',
            'are not': 'aren\'t',
            'was not': 'wasn\'t',
            'were not': 'weren\'t',
            'have not': 'haven\'t',
            'has not': 'hasn\'t',
            'had not': 'hadn\'t',
            'it is': 'it\'s',
            'that is': 'that\'s',
            'there is': 'there\'s',
            'here is': 'here\'s',
            'what is': 'what\'s',
            'where is': 'where\'s',
            'who is': 'who\'s',
            'how is': 'how\'s',
            'when is': 'when\'s',
            'why is': 'why\'s',
            'they are': 'they\'re',
            'we are': 'we\'re',
            'you are': 'you\'re',
            'I am': 'I\'m',
            'he is': 'he\'s',
            'she is': 'she\'s',
            'I will': 'I\'ll',
            'you will': 'you\'ll',
            'he will': 'he\'ll',
            'she will': 'she\'ll',
            'we will': 'we\'ll',
            'they will': 'they\'ll',
            'I would': 'I\'d',
            'you would': 'you\'d',
            'he would': 'he\'d',
            'she would': 'she\'d',
            'we would': 'we\'d',
            'they would': 'they\'d'
        };

        // Words that add personality
        this.personalityWords = {
            'very': ['really', 'pretty', 'quite', 'super'],
            'extremely': ['really', 'incredibly', 'super', 'totally'],
            'significantly': ['a lot', 'quite a bit', 'really', 'pretty much'],
            'substantially': ['a lot', 'quite a bit', 'really', 'pretty much'],
            'considerably': ['a lot', 'quite a bit', 'really', 'pretty much']
        };
    }

    /**
     * Main humanization function
     */
    humanizeText(text) {
        let humanizedText = text;

        // Step 1: Replace AI phrases with human alternatives
        humanizedText = this.replaceAIPhrases(humanizedText);

        // Step 2: Replace formal words with casual alternatives
        humanizedText = this.replaceFormalWords(humanizedText);

        // Step 3: Add contractions for natural flow
        humanizedText = this.addContractions(humanizedText);

        // Step 4: Improve sentence starters
        humanizedText = this.improveSentenceStarters(humanizedText);

        // Step 5: Add personality and variation
        humanizedText = this.addPersonality(humanizedText);

        // Step 6: Break up long sentences
        humanizedText = this.breakUpLongSentences(humanizedText);

        // Step 7: Remove redundant phrases
        humanizedText = this.removeRedundancy(humanizedText);

        // Step 8: Add human touches
        humanizedText = this.addHumanTouches(humanizedText);

        // Step 9: Clean up and format
        humanizedText = this.cleanupText(humanizedText);

        // Step 10: Highlight changes
        humanizedText = this.highlightChanges(humanizedText, text);

        return humanizedText;
    }

    /**
     * Replace AI phrases with human alternatives
     */
    replaceAIPhrases(text) {
        let result = text;

        Object.keys(this.phraseReplacements).forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\b`, 'gi');
            const replacement = this.phraseReplacements[phrase.toLowerCase()];
            
            if (replacement === '') {
                // Remove the phrase entirely
                result = result.replace(regex, '');
            } else {
                result = result.replace(regex, replacement);
            }
        });

        return result;
    }

    /**
     * Replace formal words with casual alternatives
     */
    replaceFormalWords(text) {
        let result = text;

        Object.keys(this.wordReplacements).forEach(word => {
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
            const replacement = this.wordReplacements[word.toLowerCase()];
            result = result.replace(regex, replacement);
        });

        return result;
    }

    /**
     * Add contractions for natural flow
     */
    addContractions(text) {
        let result = text;

        Object.keys(this.contractions).forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\b`, 'gi');
            const contraction = this.contractions[phrase.toLowerCase()];
            result = result.replace(regex, contraction);
        });

        return result;
    }

    /**
     * Improve sentence starters
     */
    improveSentenceStarters(text) {
        let result = text;
        const sentences = result.split(/[.!?]+/);

        const improvedSentences = sentences.map(sentence => {
            let trimmed = sentence.trim();
            if (!trimmed) return sentence;

            // Check for AI-style starters and replace with conversational ones
            const aiStarters = [
                'it is important to understand',
                'it should be noted that',
                'it is worth considering',
                'one must consider',
                'it is essential to',
                'it is crucial to',
                'it is vital to'
            ];

            aiStarters.forEach(starter => {
                const regex = new RegExp(`^\\s*${this.escapeRegex(starter)}`, 'i');
                if (regex.test(trimmed)) {
                    const randomStarter = this.getRandomElement(this.conversationalStarters);
                    trimmed = trimmed.replace(regex, randomStarter);
                }
            });

            return trimmed;
        });

        return improvedSentences.join('. ').replace(/\.\s*\./g, '.');
    }

    /**
     * Add personality and variation
     */
    addPersonality(text) {
        let result = text;

        Object.keys(this.personalityWords).forEach(word => {
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
            const alternatives = this.personalityWords[word.toLowerCase()];
            
            result = result.replace(regex, (match) => {
                return this.getRandomElement(alternatives);
            });
        });

        // Add natural transitions
        Object.keys(this.naturalTransitions).forEach(transition => {
            const regex = new RegExp(`\\b${this.escapeRegex(transition)}\\b`, 'gi');
            const alternatives = this.naturalTransitions[transition.toLowerCase()];
            
            result = result.replace(regex, (match) => {
                return this.getRandomElement(alternatives);
            });
        });

        return result;
    }

    /**
     * Break up long sentences
     */
    breakUpLongSentences(text) {
        const sentences = text.split(/[.!?]+/);
        const improvedSentences = [];

        sentences.forEach(sentence => {
            const trimmed = sentence.trim();
            if (!trimmed) return;

            const words = trimmed.split(/\s+/);
            
            // If sentence is longer than 25 words, try to break it up
            if (words.length > 25) {
                const breakPoints = this.findSentenceBreakPoints(trimmed);
                if (breakPoints.length > 0) {
                    const parts = this.breakSentenceAtPoints(trimmed, breakPoints);
                    improvedSentences.push(...parts);
                } else {
                    improvedSentences.push(trimmed);
                }
            } else {
                improvedSentences.push(trimmed);
            }
        });

        return improvedSentences.join('. ').replace(/\.\s*\./g, '.');
    }

    /**
     * Find good break points in long sentences
     */
    findSentenceBreakPoints(sentence) {
        const breakWords = [
            ', and', ', but', ', or', ', so', ', yet',
            ', however', ', therefore', ', consequently',
            ', furthermore', ', moreover', ', additionally',
            '; however', '; therefore', '; consequently'
        ];

        const breakPoints = [];
        
        breakWords.forEach(breakWord => {
            const index = sentence.toLowerCase().indexOf(breakWord.toLowerCase());
            if (index > 10 && index < sentence.length - 10) { // Not too close to start or end
                breakPoints.push(index + breakWord.length);
            }
        });

        return breakPoints.sort((a, b) => a - b);
    }

    /**
     * Break sentence at specified points
     */
    breakSentenceAtPoints(sentence, breakPoints) {
        const parts = [];
        let start = 0;

        // Use the first break point (usually the best one)
        if (breakPoints.length > 0) {
            const breakPoint = breakPoints[0];
            const firstPart = sentence.substring(start, breakPoint).trim();
            const secondPart = sentence.substring(breakPoint).trim();
            
            if (firstPart.length > 5 && secondPart.length > 5) {
                parts.push(firstPart);
                parts.push(secondPart);
            } else {
                parts.push(sentence);
            }
        } else {
            parts.push(sentence);
        }

        return parts;
    }

    /**
     * Remove redundant phrases
     */
    removeRedundancy(text) {
        let result = text;

        // Remove redundant qualifiers
        const redundantPhrases = [
            'it is clear that',
            'it is obvious that',
            'it is evident that',
            'obviously',
            'clearly',
            'evidently',
            'without a doubt',
            'undoubtedly',
            'certainly',
            'definitely',
            'absolutely',
            'completely',
            'totally',
            'entirely',
            'wholly'
        ];

        redundantPhrases.forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\s*`, 'gi');
            result = result.replace(regex, '');
        });

        return result;
    }

    /**
     * Add human touches to make text more relatable
     */
    addHumanTouches(text) {
        let result = text;

        // Add occasional informal expressions
        const informalTouches = [
            { pattern: /\bvery important\b/gi, replacement: 'super important' },
            { pattern: /\bvery good\b/gi, replacement: 'really good' },
            { pattern: /\bvery bad\b/gi, replacement: 'pretty bad' },
            { pattern: /\bvery difficult\b/gi, replacement: 'pretty tough' },
            { pattern: /\bvery easy\b/gi, replacement: 'pretty easy' }
        ];

        informalTouches.forEach(touch => {
            // Apply randomly (50% chance) to avoid over-casualization
            if (Math.random() > 0.5) {
                result = result.replace(touch.pattern, touch.replacement);
            }
        });

        return result;
    }

    /**
     * Clean up and format the text
     */
    cleanupText(text) {
        let result = text;

        // Remove extra spaces
        result = result.replace(/\s+/g, ' ');
        
        // Fix punctuation spacing
        result = result.replace(/\s+([,.!?;:])/g, '$1');
        result = result.replace(/([.!?])\s*([A-Z])/g, '$1 $2');
        
        // Remove spaces before punctuation
        result = result.replace(/\s+\./g, '.');
        result = result.replace(/\s+,/g, ',');
        
        // Fix capitalization after periods
        result = result.replace(/\.\s*([a-z])/g, (match, letter) => {
            return '. ' + letter.toUpperCase();
        });

        // Remove empty sentences
        result = result.replace(/\.\s*\./g, '.');
        
        // Trim and ensure proper ending
        result = result.trim();
        if (result && !result.match(/[.!?]$/)) {
            result += '.';
        }

        return result;
    }

    /**
     * Highlight changes made during humanization
     */
    highlightChanges(humanizedText, originalText) {
        // For now, just wrap the entire humanized text
        // In a more advanced version, we could track specific changes
        return humanizedText.replace(/\b\w+\b/g, (word) => {
            // Check if this word was changed from the original
            const isChanged = this.wasWordChanged(word, originalText);
            if (isChanged) {
                return `<span class="humanized-word">${word}</span>`;
            }
            return word;
        });
    }

    /**
     * Check if a word was changed during humanization
     */
    wasWordChanged(word, originalText) {
        // Simple check - in a real implementation, this would be more sophisticated
        const lowercaseWord = word.toLowerCase();
        
        // Check if it's one of our replacement words
        return Object.values(this.wordReplacements).includes(lowercaseWord) ||
               Object.values(this.phraseReplacements).includes(lowercaseWord) ||
               Object.values(this.contractions).includes(word);
    }

    /**
     * Get humanization statistics
     */
    getHumanizationStats(originalText, humanizedText) {
        const originalWords = originalText.split(/\s+/).length;
        const humanizedWords = humanizedText.split(/\s+/).length;
        
        // Count changes made
        let changesCount = 0;
        
        // Count word replacements
        Object.keys(this.wordReplacements).forEach(word => {
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
            const matches = originalText.match(regex);
            if (matches) changesCount += matches.length;
        });

        // Count phrase replacements
        Object.keys(this.phraseReplacements).forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\b`, 'gi');
            const matches = originalText.match(regex);
            if (matches) changesCount += matches.length;
        });

        return {
            originalWords,
            humanizedWords,
            changesCount,
            improvementScore: Math.min(100, (changesCount / originalWords) * 100),
            readabilityImprovement: this.calculateReadabilityImprovement(originalText, humanizedText)
        };
    }

    /**
     * Calculate readability improvement
     */
    calculateReadabilityImprovement(originalText, humanizedText) {
        const originalSentences = originalText.split(/[.!?]+/).filter(s => s.trim());
        const humanizedSentences = humanizedText.split(/[.!?]+/).filter(s => s.trim());
        
        const originalAvgLength = originalSentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / originalSentences.length;
        const humanizedAvgLength = humanizedSentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / humanizedSentences.length;
        
        // Lower average sentence length generally means better readability
        const improvement = Math.max(0, originalAvgLength - humanizedAvgLength);
        return Math.min(100, improvement * 5); // Scale to percentage
    }

    /**
     * Get random element from array
     */
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Escape special regex characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Analyze text for humanization opportunities
     */
    analyzeForHumanization(text) {
        const opportunities = [];

        // Check for AI phrases
        Object.keys(this.phraseReplacements).forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                opportunities.push({
                    type: 'phrase_replacement',
                    original: phrase,
                    suggestion: this.phraseReplacements[phrase.toLowerCase()],
                    count: matches.length,
                    impact: 'high'
                });
            }
        });

        // Check for formal words
        Object.keys(this.wordReplacements).forEach(word => {
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                opportunities.push({
                    type: 'word_replacement',
                    original: word,
                    suggestion: this.wordReplacements[word.toLowerCase()],
                    count: matches.length,
                    impact: 'medium'
                });
            }
        });

        // Check for contraction opportunities
        Object.keys(this.contractions).forEach(phrase => {
            const regex = new RegExp(`\\b${this.escapeRegex(phrase)}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                opportunities.push({
                    type: 'contraction',
                    original: phrase,
                    suggestion: this.contractions[phrase.toLowerCase()],
                    count: matches.length,
                    impact: 'low'
                });
            }
        });

        return opportunities.sort((a, b) => {
            const impactOrder = { high: 3, medium: 2, low: 1 };
            return impactOrder[b.impact] - impactOrder[a.impact];
        });
    }

    /**
     * Get humanization suggestions
     */
    getSuggestions(text) {
        const opportunities = this.analyzeForHumanization(text);
        const suggestions = [];

        if (opportunities.length > 0) {
            suggestions.push({
                type: 'overall',
                message: `Found ${opportunities.length} opportunities to make your text more human-like`,
                priority: 'high'
            });
        }

        const highImpactCount = opportunities.filter(o => o.impact === 'high').length;
        if (highImpactCount > 0) {
            suggestions.push({
                type: 'phrases',
                message: `Replace ${highImpactCount} AI-style phrases with natural alternatives`,
                priority: 'high'
            });
        }

        const mediumImpactCount = opportunities.filter(o => o.impact === 'medium').length;
        if (mediumImpactCount > 3) {
            suggestions.push({
                type: 'formality',
                message: 'Use more casual language to sound less formal',
                priority: 'medium'
            });
        }

        return suggestions;
    }
}

// Create global instance
const textHumanizer = new TextHumanizer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextHumanizer;
}