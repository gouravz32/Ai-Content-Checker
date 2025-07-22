/**
 * Advanced SEO Optimizer
 * Analyzes and optimizes content for better search engine rankings
 */

console.log('🚀 Loading Advanced SEO Optimizer...');

window.SEO_OPTIMIZER = {
    
    // SEO Analysis and Optimization
    analyzeSEO: function(text, targetKeyword = '') {
        console.log('📊 Starting SEO analysis...');
        
        const analysis = {
            content: text,
            targetKeyword: targetKeyword,
            wordCount: 0,
            readabilityScore: 0,
            seoScore: 0,
            issues: [],
            recommendations: [],
            optimizedContent: '',
            seoMetrics: {
                titleSuggestions: [],
                metaDescription: '',
                headings: [],
                keywords: [],
                readingTime: 0,
                sentiment: 'neutral'
            }
        };

        // Basic content analysis
        analysis.wordCount = this.countWords(text);
        analysis.readabilityScore = this.calculateReadability(text);
        analysis.seoMetrics.readingTime = Math.ceil(analysis.wordCount / 200); // avg reading speed

        // SEO optimization
        analysis.optimizedContent = this.optimizeContent(text, targetKeyword);
        analysis.seoMetrics = this.generateSEOMetrics(text, targetKeyword);
        analysis.issues = this.identifyIssues(text, targetKeyword);
        analysis.recommendations = this.generateRecommendations(analysis);
        analysis.seoScore = this.calculateSEOScore(analysis);

        console.log('✅ SEO analysis completed:', {
            wordCount: analysis.wordCount,
            seoScore: analysis.seoScore,
            issues: analysis.issues.length,
            readabilityScore: analysis.readabilityScore
        });

        return analysis;
    },

    // Count words in text
    countWords: function(text) {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    },

    // Calculate readability score (simplified Flesch Reading Ease)
    calculateReadability: function(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const syllables = this.countSyllables(text);

        if (sentences.length === 0 || words.length === 0) return 0;

        const avgSentenceLength = words.length / sentences.length;
        const avgSyllablesPerWord = syllables / words.length;

        // Simplified Flesch Reading Ease formula
        const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
        return Math.max(0, Math.min(100, Math.round(score)));
    },

    // Count syllables in text
    countSyllables: function(text) {
        return text.toLowerCase()
            .replace(/[^a-z]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0)
            .reduce((total, word) => {
                // Simple syllable counting
                const syllableCount = word.replace(/[^aeiouy]/g, '').length || 1;
                return total + syllableCount;
            }, 0);
    },

    // Optimize content for SEO
    optimizeContent: function(text, targetKeyword) {
        let optimized = text;

        // Add keyword density optimization
        if (targetKeyword) {
            optimized = this.optimizeKeywordDensity(optimized, targetKeyword);
        }

        // Improve sentence structure
        optimized = this.improveSentenceStructure(optimized);

        // Add transition words
        optimized = this.addTransitionWords(optimized);

        // Optimize paragraphs
        optimized = this.optimizeParagraphs(optimized);

        return optimized;
    },

    // Optimize keyword density
    optimizeKeywordDensity: function(text, keyword) {
        const words = text.split(/\s+/);
        const keywordCount = text.toLowerCase().split(keyword.toLowerCase()).length - 1;
        const targetDensity = 0.02; // 2% density
        const currentDensity = keywordCount / words.length;

        if (currentDensity < targetDensity) {
            // Add keyword strategically
            const paragraphs = text.split('\n\n');
            if (paragraphs.length > 1 && !paragraphs[0].toLowerCase().includes(keyword.toLowerCase())) {
                paragraphs[0] = paragraphs[0] + ` This article focuses on ${keyword}.`;
            }
            return paragraphs.join('\n\n');
        }

        return text;
    },

    // Improve sentence structure
    improveSentenceStructure: function(text) {
        return text
            // Break long sentences
            .replace(/([.!?]\s+)([A-Z][^.!?]{100,})/g, '$1$2')
            // Add variety to sentence beginnings
            .replace(/\b(The)\s+([a-z])/g, (match, p1, p2) => {
                const alternatives = ['This', 'That', 'Such', 'Each'];
                const random = alternatives[Math.floor(Math.random() * alternatives.length)];
                return Math.random() > 0.7 ? `${random} ${p2}` : match;
            });
    },

    // Add transition words for better flow
    addTransitionWords: function(text) {
        const transitions = {
            addition: ['Furthermore', 'Additionally', 'Moreover', 'Also'],
            contrast: ['However', 'Nevertheless', 'On the other hand', 'In contrast'],
            conclusion: ['Therefore', 'Consequently', 'As a result', 'Thus']
        };

        const paragraphs = text.split('\n\n');
        return paragraphs.map((paragraph, index) => {
            if (index > 0 && Math.random() > 0.6) {
                const type = Object.keys(transitions)[Math.floor(Math.random() * 3)];
                const word = transitions[type][Math.floor(Math.random() * transitions[type].length)];
                return `${word}, ${paragraph.charAt(0).toLowerCase()}${paragraph.slice(1)}`;
            }
            return paragraph;
        }).join('\n\n');
    },

    // Optimize paragraph structure
    optimizeParagraphs: function(text) {
        const paragraphs = text.split('\n\n');
        return paragraphs.map(paragraph => {
            // Ensure paragraphs aren't too long
            if (paragraph.split(' ').length > 150) {
                const sentences = paragraph.split(/([.!?]+\s+)/);
                const midpoint = Math.floor(sentences.length / 2);
                return sentences.slice(0, midpoint).join('') + '\n\n' + sentences.slice(midpoint).join('');
            }
            return paragraph;
        }).join('\n\n');
    },

    // Generate SEO metrics
    generateSEOMetrics: function(text, targetKeyword) {
        const metrics = {
            titleSuggestions: this.generateTitles(text, targetKeyword),
            metaDescription: this.generateMetaDescription(text, targetKeyword),
            headings: this.generateHeadings(text),
            keywords: this.extractKeywords(text),
            readingTime: Math.ceil(this.countWords(text) / 200),
            sentiment: this.analyzeSentiment(text)
        };

        return metrics;
    },

    // Generate SEO-optimized titles
    generateTitles: function(text, keyword) {
        const titles = [];
        const firstSentence = text.split(/[.!?]/)[0].trim();
        
        if (keyword) {
            titles.push(`${keyword}: ${firstSentence.substring(0, 40)}...`);
            titles.push(`Complete Guide to ${keyword}`);
            titles.push(`How to Master ${keyword} - Expert Tips`);
            titles.push(`${keyword} Explained: Everything You Need to Know`);
            titles.push(`Ultimate ${keyword} Strategy for Success`);
        } else {
            titles.push(firstSentence.substring(0, 60));
            titles.push(`${firstSentence.substring(0, 40)} - Complete Guide`);
            titles.push(`Expert Guide: ${firstSentence.substring(0, 45)}`);
        }

        return titles.filter(title => title.length <= 60);
    },

    // Generate meta description
    generateMetaDescription: function(text, keyword) {
        const firstParagraph = text.split('\n\n')[0];
        let description = firstParagraph.substring(0, 140);
        
        if (keyword && !description.toLowerCase().includes(keyword.toLowerCase())) {
            description = `Learn about ${keyword}. ${description}`;
        }
        
        return description.substring(0, 155) + '...';
    },

    // Generate heading suggestions
    generateHeadings: function(text) {
        const paragraphs = text.split('\n\n');
        const headings = [];
        
        paragraphs.forEach((paragraph, index) => {
            if (paragraph.length > 100) {
                const firstSentence = paragraph.split(/[.!?]/)[0].trim();
                if (firstSentence.length > 10 && firstSentence.length < 60) {
                    headings.push({
                        level: index === 0 ? 'H1' : (index < 3 ? 'H2' : 'H3'),
                        text: firstSentence,
                        position: index
                    });
                }
            }
        });

        return headings;
    },

    // Extract keywords
    extractKeywords: function(text) {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3);

        const frequency = {};
        words.forEach(word => {
            if (!this.isStopWord(word)) {
                frequency[word] = (frequency[word] || 0) + 1;
            }
        });

        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({ word, count, density: (count / words.length * 100).toFixed(2) + '%' }));
    },

    // Check if word is a stop word
    isStopWord: function(word) {
        const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'this', 'that', 'these', 'those', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'cannot', 'from', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once'];
        return stopWords.includes(word.toLowerCase());
    },

    // Analyze sentiment
    analyzeSentiment: function(text) {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'perfect', 'best', 'awesome', 'outstanding', 'remarkable', 'exceptional', 'superior', 'magnificent', 'brilliant'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike', 'poor', 'disappointing', 'inadequate', 'insufficient', 'unsatisfactory', 'deficient', 'inferior'];
        
        const words = text.toLowerCase().split(/\s+/);
        let positiveCount = 0;
        let negativeCount = 0;

        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });

        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    },

    // Identify SEO issues
    identifyIssues: function(text, keyword) {
        const issues = [];
        const wordCount = this.countWords(text);

        // Word count issues
        if (wordCount < 300) {
            issues.push({
                type: 'warning',
                issue: 'Content too short',
                description: `Content has ${wordCount} words. Aim for 300+ words for better SEO.`,
                priority: 'high'
            });
        }

        // Keyword issues
        if (keyword) {
            const keywordCount = text.toLowerCase().split(keyword.toLowerCase()).length - 1;
            const density = (keywordCount / wordCount) * 100;
            
            if (keywordCount === 0) {
                issues.push({
                    type: 'error',
                    issue: 'Target keyword missing',
                    description: `Target keyword "${keyword}" not found in content.`,
                    priority: 'high'
                });
            } else if (density < 0.5) {
                issues.push({
                    type: 'warning',
                    issue: 'Low keyword density',
                    description: `Keyword density is ${density.toFixed(1)}%. Aim for 1-2%.`,
                    priority: 'medium'
                });
            } else if (density > 3) {
                issues.push({
                    type: 'warning',
                    issue: 'High keyword density',
                    description: `Keyword density is ${density.toFixed(1)}%. This may be considered keyword stuffing.`,
                    priority: 'medium'
                });
            }
        }

        // Readability issues
        const readability = this.calculateReadability(text);
        if (readability < 30) {
            issues.push({
                type: 'warning',
                issue: 'Poor readability',
                description: 'Content is difficult to read. Use shorter sentences and simpler words.',
                priority: 'medium'
            });
        }

        // Paragraph structure
        const paragraphs = text.split('\n\n');
        const longParagraphs = paragraphs.filter(p => p.split(' ').length > 150);
        if (longParagraphs.length > 0) {
            issues.push({
                type: 'info',
                issue: 'Long paragraphs detected',
                description: `${longParagraphs.length} paragraphs are too long. Break them into smaller chunks.`,
                priority: 'low'
            });
        }

        return issues;
    },

    // Generate recommendations
    generateRecommendations: function(analysis) {
        const recommendations = [];

        // Content length recommendations
        if (analysis.wordCount < 500) {
            recommendations.push({
                type: 'content',
                title: 'Expand Content',
                description: 'Add more detailed explanations, examples, or related information to reach 500+ words.',
                impact: 'high'
            });
        }

        // Keyword recommendations
        if (analysis.targetKeyword) {
            recommendations.push({
                type: 'keyword',
                title: 'Keyword Optimization',
                description: `Include "${analysis.targetKeyword}" in the first paragraph, headings, and naturally throughout the content.`,
                impact: 'high'
            });
        }

        // Readability recommendations
        if (analysis.readabilityScore < 60) {
            recommendations.push({
                type: 'readability',
                title: 'Improve Readability',
                description: 'Use shorter sentences, simpler words, and add transition words for better flow.',
                impact: 'medium'
            });
        }

        // SEO structure recommendations
        recommendations.push({
            type: 'structure',
            title: 'Add Headings',
            description: 'Use H1, H2, and H3 tags to structure your content and improve SEO.',
            impact: 'medium'
        });

        recommendations.push({
            type: 'engagement',
            title: 'Add Call-to-Action',
            description: 'Include compelling calls-to-action to increase user engagement.',
            impact: 'medium'
        });

        return recommendations;
    },

    // Calculate overall SEO score
    calculateSEOScore: function(analysis) {
        let score = 0;
        const maxScore = 100;

        // Word count score (20 points)
        if (analysis.wordCount >= 500) score += 20;
        else if (analysis.wordCount >= 300) score += 15;
        else if (analysis.wordCount >= 150) score += 10;
        else score += 5;

        // Readability score (25 points)
        if (analysis.readabilityScore >= 70) score += 25;
        else if (analysis.readabilityScore >= 50) score += 20;
        else if (analysis.readabilityScore >= 30) score += 15;
        else score += 10;

        // Keyword optimization (25 points)
        if (analysis.targetKeyword) {
            const keywordCount = analysis.content.toLowerCase().split(analysis.targetKeyword.toLowerCase()).length - 1;
            const density = (keywordCount / analysis.wordCount) * 100;
            
            if (density >= 1 && density <= 2) score += 25;
            else if (density >= 0.5 && density < 3) score += 20;
            else if (keywordCount > 0) score += 15;
            else score += 5;
        } else {
            score += 15; // Partial score if no target keyword
        }

        // Issues penalty (15 points)
        const highPriorityIssues = analysis.issues.filter(issue => issue.priority === 'high').length;
        const mediumPriorityIssues = analysis.issues.filter(issue => issue.priority === 'medium').length;
        
        let issueScore = 15;
        issueScore -= (highPriorityIssues * 5);
        issueScore -= (mediumPriorityIssues * 2);
        score += Math.max(0, issueScore);

        // Content structure (15 points)
        const paragraphs = analysis.content.split('\n\n').length;
        if (paragraphs >= 3) score += 15;
        else if (paragraphs >= 2) score += 10;
        else score += 5;

        return Math.min(maxScore, Math.max(0, Math.round(score)));
    },

    // Display SEO analysis results
    displaySEOAnalysis: function(analysis) {
        console.log('📊 Displaying SEO analysis...');
        
        const seoHtml = this.generateSEOHTML(analysis);
        
        // Find or create SEO container
        let seoContainer = document.getElementById('seoContainer');
        if (!seoContainer) {
            seoContainer = document.createElement('div');
            seoContainer.id = 'seoContainer';
            seoContainer.className = 'seo-container';
            
            // Insert after comparison container
            const comparisonContainer = document.getElementById('comparisonContainer');
            if (comparisonContainer && comparisonContainer.parentNode) {
                comparisonContainer.parentNode.insertBefore(seoContainer, comparisonContainer.nextSibling);
            } else {
                document.body.appendChild(seoContainer);
            }
        }
        
        seoContainer.innerHTML = seoHtml;
        seoContainer.style.display = 'block';
        
        // Scroll to SEO analysis
        seoContainer.scrollIntoView({ behavior: 'smooth' });
        
        console.log('✅ SEO analysis displayed successfully');
    },

    // Generate HTML for SEO analysis
    generateSEOHTML: function(analysis) {
        const scoreColor = analysis.seoScore >= 80 ? '#28a745' : analysis.seoScore >= 60 ? '#ffc107' : '#dc3545';
        
        return `
            <div class="seo-analysis-results">
                <div class="seo-header">
                    <h3>📈 SEO Analysis & Optimization</h3>
                    <div class="seo-score">
                        <div class="score-circle" style="--score-color: ${scoreColor}">
                            <span class="score-number">${analysis.seoScore}</span>
                            <span class="score-text">SEO Score</span>
                        </div>
                    </div>
                </div>

                <div class="seo-metrics-grid">
                    <div class="metric-card">
                        <div class="metric-icon">📝</div>
                        <div class="metric-value">${analysis.wordCount}</div>
                        <div class="metric-label">Words</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">📖</div>
                        <div class="metric-value">${analysis.readabilityScore}</div>
                        <div class="metric-label">Readability</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">⏱️</div>
                        <div class="metric-value">${analysis.seoMetrics.readingTime}m</div>
                        <div class="metric-label">Read Time</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">😊</div>
                        <div class="metric-value">${analysis.seoMetrics.sentiment}</div>
                        <div class="metric-label">Tone</div>
                    </div>
                </div>

                <div class="seo-sections">
                    <div class="seo-section">
                        <h4>🎯 Title Suggestions</h4>
                        <div class="title-suggestions">
                            ${analysis.seoMetrics.titleSuggestions.map(title => `
                                <div class="title-suggestion">
                                    <span class="title-text">${title}</span>
                                    <span class="title-length">${title.length} chars</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="seo-section">
                        <h4>📋 Meta Description</h4>
                        <div class="meta-description">
                            <p>${analysis.seoMetrics.metaDescription}</p>
                            <span class="meta-length">${analysis.seoMetrics.metaDescription.length} characters</span>
                        </div>
                    </div>

                    <div class="seo-section">
                        <h4>🔑 Top Keywords</h4>
                        <div class="keywords-list">
                            ${analysis.seoMetrics.keywords.slice(0, 5).map(keyword => `
                                <div class="keyword-item">
                                    <span class="keyword-text">${keyword.word}</span>
                                    <span class="keyword-count">${keyword.count}x</span>
                                    <span class="keyword-density">${keyword.density}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${analysis.issues.length > 0 ? `
                    <div class="seo-section">
                        <h4>⚠️ Issues Found</h4>
                        <div class="issues-list">
                            ${analysis.issues.map(issue => `
                                <div class="issue-item ${issue.type}">
                                    <div class="issue-icon">${issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'}</div>
                                    <div class="issue-content">
                                        <div class="issue-title">${issue.issue}</div>
                                        <div class="issue-description">${issue.description}</div>
                                    </div>
                                    <div class="issue-priority ${issue.priority}">${issue.priority}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <div class="seo-section">
                        <h4>💡 Recommendations</h4>
                        <div class="recommendations-list">
                            ${analysis.recommendations.map(rec => `
                                <div class="recommendation-item">
                                    <div class="rec-icon">${rec.type === 'content' ? '📝' : rec.type === 'keyword' ? '🔑' : rec.type === 'readability' ? '📖' : rec.type === 'structure' ? '🏗️' : '🎯'}</div>
                                    <div class="rec-content">
                                        <div class="rec-title">${rec.title}</div>
                                        <div class="rec-description">${rec.description}</div>
                                    </div>
                                    <div class="rec-impact ${rec.impact}">${rec.impact} impact</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="seo-actions">
                    <button class="btn btn-seo-optimize" onclick="window.applySEOOptimizations()">
                        <i class="fas fa-magic"></i>
                        Apply SEO Optimizations
                    </button>
                    <button class="btn btn-seo-copy" onclick="window.copySEOReport()">
                        <i class="fas fa-copy"></i>
                        Copy SEO Report
                    </button>
                </div>
            </div>
        `;
    },

    // Test the SEO optimizer
    test: function() {
        console.log('🧪 Testing SEO Optimizer...');
        
        const sampleText = "To effectively utilize our comprehensive methodology for digital marketing, we must leverage cutting-edge innovations to facilitate optimal outcomes. Furthermore, this advanced paradigm will enhance our ability to streamline operations and maximize efficiency. The implementation of these robust solutions demonstrates our commitment to delivering exceptional results that exceed expectations.";
        
        const analysis = this.analyzeSEO(sampleText, 'digital marketing');
        console.log('🎯 SEO Test Results:', analysis);
        
        return analysis;
    }
};

// Enhanced CSS for SEO analysis display
const seoCSS = `
<style>
.seo-container {
    margin: 30px auto;
    max-width: 1200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 30px;
    color: white;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.seo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.seo-header h3 {
    font-size: 28px;
    margin: 0;
    font-weight: 700;
}

.seo-score {
    display: flex;
    align-items: center;
}

.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(var(--score-color) calc(var(--score) * 3.6deg), rgba(255,255,255,0.2) 0deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: 20px;
}

.score-circle::before {
    content: '';
    position: absolute;
    width: 70px;
    height: 70px;
    background: rgba(255,255,255,0.95);
    border-radius: 50%;
    z-index: 1;
}

.score-number {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    z-index: 2;
}

.score-text {
    font-size: 12px;
    color: #666;
    z-index: 2;
}

.seo-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card {
    background: rgba(255,255,255,0.15);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
}

.metric-icon {
    font-size: 24px;
    margin-bottom: 10px;
}

.metric-value {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 5px;
}

.metric-label {
    font-size: 14px;
    opacity: 0.9;
}

.seo-sections {
    display: grid;
    gap: 25px;
}

.seo-section {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 25px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
}

.seo-section h4 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
}

.title-suggestions {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.title-suggestion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.1);
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
}

.title-text {
    flex: 1;
    font-weight: 500;
}

.title-length {
    background: rgba(255,255,255,0.2);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin-left: 10px;
}

.meta-description {
    background: rgba(255,255,255,0.1);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
}

.meta-description p {
    margin: 0 0 10px 0;
    line-height: 1.6;
}

.meta-length {
    font-size: 12px;
    opacity: 0.8;
}

.keywords-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.keyword-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.1);
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
}

.keyword-text {
    font-weight: 500;
    flex: 1;
}

.keyword-count, .keyword-density {
    background: rgba(255,255,255,0.2);
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 12px;
    margin-left: 8px;
}

.issues-list, .recommendations-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.issue-item, .recommendation-item {
    display: flex;
    align-items: flex-start;
    background: rgba(255,255,255,0.1);
    padding: 16px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
}

.issue-icon, .rec-icon {
    font-size: 20px;
    margin-right: 15px;
    margin-top: 2px;
    flex-shrink: 0;
}

.issue-content, .rec-content {
    flex: 1;
}

.issue-title, .rec-title {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 16px;
}

.issue-description, .rec-description {
    opacity: 0.9;
    line-height: 1.5;
    font-size: 14px;
}

.issue-priority, .rec-impact {
    background: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: 15px;
    flex-shrink: 0;
}

.issue-priority.high {
    background: rgba(220, 53, 69, 0.8);
}

.issue-priority.medium {
    background: rgba(255, 193, 7, 0.8);
}

.issue-priority.low {
    background: rgba(23, 162, 184, 0.8);
}

.rec-impact.high {
    background: rgba(40, 167, 69, 0.8);
}

.rec-impact.medium {
    background: rgba(255, 193, 7, 0.8);
}

.rec-impact.low {
    background: rgba(108, 117, 125, 0.8);
}

.seo-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
}

.btn-seo-optimize {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-seo-optimize:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.btn-seo-copy {
    background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);
}

.btn-seo-copy:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(111, 66, 193, 0.4);
}

@media (max-width: 768px) {
    .seo-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
    
    .seo-metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .title-suggestion, .keyword-item, .issue-item, .recommendation-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
}
</style>
`;

// Global functions for button actions
window.applySEOOptimizations = function() {
    console.log('🚀 Applying SEO optimizations...');
    if (window.upassApp && window.upassApp.currentText) {
        const optimized = window.SEO_OPTIMIZER.optimizeContent(window.upassApp.currentText, '');
        document.getElementById('inputText').value = optimized;
        window.upassApp.currentText = optimized;
        window.upassApp.showNotification('✅ SEO optimizations applied!', 'success');
    }
};

window.copySEOReport = function() {
    const seoContainer = document.getElementById('seoContainer');
    if (seoContainer) {
        const textContent = seoContainer.innerText;
        navigator.clipboard.writeText(textContent).then(() => {
            if (window.upassApp) {
                window.upassApp.showNotification('📋 SEO report copied to clipboard!', 'success');
            }
        });
    }
};

// Inject CSS
if (typeof document !== 'undefined') {
    document.head.insertAdjacentHTML('beforeend', seoCSS);
}

// Auto-test
setTimeout(() => {
    if (window.SEO_OPTIMIZER) {
        window.SEO_OPTIMIZER.test();
    }
}, 1000);

console.log('✅ Advanced SEO Optimizer loaded successfully!');
