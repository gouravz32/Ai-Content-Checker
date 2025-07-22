/**
 * Simple Text Humanizer - Backup Version
 * Fixes syntax errors and provides basic functionality
 */

class SimpleTextHumanizer {
    constructor() {
        this.initializeReplacements();
    }

    initializeReplacements() {
        // Simple word replacements
        this.replacements = {
            'furthermore': 'also',
            'moreover': 'plus',
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
            'thereby': 'thus'
        };

        // Phrase replacements
        this.phraseReplacements = {
            'delve into': 'explore',
            'in conclusion': 'finally',
            'it is important to note': 'note that',
            'it should be noted': 'importantly',
            'it is worth mentioning': 'worth noting',
            'in order to': 'to',
            'due to the fact that': 'because',
            'with regard to': 'about',
            'in terms of': 'for'
        };
    }

    humanizeText(text) {
        let result = text;

        // Replace phrases first (longer matches)
        Object.keys(this.phraseReplacements).forEach(phrase => {
            const regex = new RegExp(this.escapeRegex(phrase), 'gi');
            result = result.replace(regex, this.phraseReplacements[phrase]);
        });

        // Replace individual words
        Object.keys(this.replacements).forEach(word => {
            const regex = new RegExp('\\b' + this.escapeRegex(word) + '\\b', 'gi');
            result = result.replace(regex, this.replacements[word]);
        });

        return result;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    analyzeForHumanization(text) {
        const opportunities = [];
        let foundCount = 0;

        // Check for words that can be replaced
        Object.keys(this.replacements).forEach(word => {
            const regex = new RegExp('\\b' + this.escapeRegex(word) + '\\b', 'gi');
            const matches = text.match(regex);
            if (matches) {
                foundCount += matches.length;
            }
        });

        return opportunities;
    }

    getSuggestions(text) {
        const suggestions = [];
        const opportunities = this.analyzeForHumanization(text);
        
        if (opportunities.length > 0) {
            suggestions.push({
                type: 'overall',
                message: `Found ${opportunities.length} opportunities to make your text more human-like`,
                priority: 'high'
            });
        }

        return suggestions;
    }
}

// Create global instance as backup
if (!window.textHumanizer || !window.textHumanizer.humanizeText) {
    window.textHumanizer = new SimpleTextHumanizer();
    console.log('✅ Backup SimpleTextHumanizer loaded');
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleTextHumanizer;
}
