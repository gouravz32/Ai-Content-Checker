/**
 * AI Text Humanizer - Main Application
 * Version: 1.0.0
 * Author: AI Text Humanizer Team
 */

class AITextHumanizer {
    constructor() {
        // Check if user is owner (you can set this to true permanently)
        this.isOwner = this.checkOwnerStatus();
        this.currentPlan = this.isOwner ? 'owner' : 'free';
        this.dailyUsage = this.isOwner ? 0 : this.loadDailyUsage(); // Owner doesn't track usage
        this.limits = {
            free: 100,
            premium: 100000,
            owner: 999999999 // Unlimited for owner
        };
        this.isProcessing = false;
        this.lastAnalysis = null;
        
        // Configuration
        this.config = {
            maxRetries: 3,
            retryDelay: 1000,
            animationDelay: 1500,
            notificationDuration: 3000
        };

        // Initialize the application
        this.init();
    }

    /**
     * Check if current user is the owner
     */
    checkOwnerStatus() {
        // Method 1: Check localStorage for owner key
        if (localStorage.getItem('ai_humanizer_owner_key') === 'GOURAV_OWNER_2025') {
            return true;
        }
        
        // Method 2: Check if running on localhost (development mode)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            localStorage.setItem('ai_humanizer_owner_key', 'GOURAV_OWNER_2025');
            return true;
        }
        
        // Method 3: Check for special URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('owner') === 'gourav2025') {
            localStorage.setItem('ai_humanizer_owner_key', 'GOURAV_OWNER_2025');
            return true;
        }
        
        return false;
    }

    /**
     * Debug function to check if all elements are properly loaded
     */
    debugElementsCheck() {
        console.log('🔍 DEBUG: Checking elements...');
        
        const elements = {
            'inputText': document.getElementById('inputText'),
            'analyzeBtn': document.getElementById('analyzeBtn'),
            'results': document.getElementById('results'),
            'currentPlan': document.getElementById('currentPlan'),
            'wordCounter': document.getElementById('wordCounter')
        };
        
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                console.log(`✅ ${key}: Found`);
            } else {
                console.error(`❌ ${key}: NOT FOUND!`);
            }
        });
        
        // Test analyze button specifically
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            console.log('🔵 Analyze button details:', {
                id: analyzeBtn.id,
                className: analyzeBtn.className,
                innerHTML: analyzeBtn.innerHTML,
                disabled: analyzeBtn.disabled,
                style: analyzeBtn.style.display
            });
        }
        
        console.log('🔍 DEBUG: Elements check complete');
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize detector and humanizer
        window.aiDetector = new AIDetector();
        window.textHumanizer = new TextHumanizer();
        window.subscriptionManager = new SubscriptionManager();
        
        this.initializeEventListeners();
        this.updateUI();
        this.initializeScrollReveal();
        this.initializeNavigation();
        this.preloadComponents();
        
        // Debug: Check if all elements are properly loaded
        setTimeout(() => {
            this.debugElementsCheck();
        }, 1000);
        
        // Show welcome message
        setTimeout(() => {
            if (this.isOwner) {
                this.showNotification('🎉 Welcome OWNER! You have UNLIMITED access to all features!', 'success');
            } else {
                this.showNotification('Welcome to AI Text Humanizer! You have 100 words/day on free plan.', 'info');
            }
        }, 1500);

        console.log(`AI Text Humanizer initialized - Plan: ${this.currentPlan}, Owner: ${this.isOwner}`);
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Plan selection
        document.querySelectorAll('.plan-card').forEach(card => {
            card.addEventListener('click', () => this.selectPlan(card.dataset.plan));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectPlan(card.dataset.plan);
                }
            });
        });

        // Text input and word counting
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.addEventListener('input', debounce(() => this.updateWordCount(), 100));
            inputText.addEventListener('paste', () => {
                setTimeout(() => this.updateWordCount(), 100);
            });
            inputText.addEventListener('focus', () => {
                this.trackEvent('text_input_focus');
            });
        }

        // Action buttons
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            console.log('✅ Analyze button found and event listener attached');
            analyzeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🚀 Analyze button clicked!');
                if (!this.isProcessing) {
                    this.analyzeText();
                } else {
                    console.log('⚠️ Already processing, please wait...');
                }
            });
            
            // Make button more accessible
            analyzeBtn.style.cursor = 'pointer';
            analyzeBtn.setAttribute('role', 'button');
        } else {
            console.error('❌ Analyze button not found!');
        }

        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearText());
        }

        const copyOriginal = document.getElementById('copyOriginal');
        if (copyOriginal) {
            copyOriginal.addEventListener('click', () => this.copyToClipboard('original'));
        }

        const copyHumanized = document.getElementById('copyHumanized');
        if (copyHumanized) {
            copyHumanized.addEventListener('click', () => this.copyToClipboard('humanized'));
        }

        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResults());
        }

        const upgradeButton = document.getElementById('upgradeButton');
        if (upgradeButton) {
            upgradeButton.addEventListener('click', () => this.showUpgradeModal());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Window events
        window.addEventListener('beforeunload', () => this.saveDailyUsage());
        window.addEventListener('resize', debounce(() => this.handleResize(), 250));

        // Performance monitoring
        window.addEventListener('load', () => {
            this.trackPerformance();
        });
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (!this.isProcessing) {
                        this.analyzeText();
                    }
                    break;
                case 'k':
                    e.preventDefault();
                    this.clearText();
                    break;
                case 'd':
                    e.preventDefault();
                    if (this.lastAnalysis) {
                        this.downloadResults();
                    }
                    break;
            }
        }

        // Escape key to close modals
        if (e.key === 'Escape') {
            this.closeModals();
        }
    }

    /**
     * Select a pricing plan
     */
    selectPlan(plan) {
        if (this.currentPlan === plan) return;
        
        this.currentPlan = plan;
        
        // Update UI
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCard = document.querySelector(`[data-plan="${plan}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            selectedCard.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                selectedCard.style.animation = '';
            }, 500);
        }
        
        this.updateUI();
        this.trackEvent('plan_selected', { plan });
        this.showNotification(
            `Switched to ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan!`, 
            'success'
        );
    }

    /**
     * Update word count and UI elements
     */
    updateWordCount() {
        const text = document.getElementById('inputText')?.value || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const counter = document.getElementById('wordCounter');
        const limit = this.limits[this.currentPlan];
        const remaining = limit - this.dailyUsage;

        if (counter) {
            counter.textContent = `${words} words`;
            counter.classList.add('updating');
            setTimeout(() => counter.classList.remove('updating'), 300);
            
            // Update counter styling based on limits
            counter.classList.remove('warning', 'danger');
            if (words > remaining) {
                counter.classList.add('danger');
            } else if (words > remaining * 0.8) {
                counter.classList.add('warning');
            }
        }

        // Update analyze button state
        this.updateAnalyzeButton(words, remaining);
    }

    /**
     * Update analyze button state
     */
    updateAnalyzeButton(words, remaining) {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (!analyzeBtn) return;

        if (words === 0) {
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Enter text to analyze';
        } else if (words > remaining) {
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Exceeds daily limit';
            analyzeBtn.classList.add('error-shake');
            setTimeout(() => analyzeBtn.classList.remove('error-shake'), 500);
        } else {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze & Humanize Text';
        }
    }

    /**
     * Analyze text for AI patterns (STEP 1: Detection Only)
     */
    async analyzeText() {
        console.log('🚀 analyzeText() function called - STEP 1: AI Detection');
        
        if (this.isProcessing) {
            console.log('⚠️ Already processing, please wait...');
            this.showNotification('Please wait, analysis in progress...', 'warning');
            return;
        }

        const inputText = document.getElementById('inputText')?.value?.trim();
        console.log('📝 Input text:', inputText ? inputText.substring(0, 100) + '...' : 'EMPTY');
        
        if (!inputText) {
            console.log('❌ No input text found');
            this.showNotification('Please enter some text to analyze.', 'warning');
            return;
        }

        const words = inputText.split(/\s+/).length;
        const remaining = this.limits[this.currentPlan] - this.dailyUsage;
        console.log(`📊 Words: ${words}, Remaining: ${remaining}, Owner: ${this.isOwner}`);

        // Owner has unlimited access, skip limit check
        if (!this.isOwner && words > remaining) {
            console.log('❌ Word limit exceeded');
            const upgradePrompt = document.getElementById('upgradePrompt');
            if (upgradePrompt) {
                upgradePrompt.style.display = 'block';
                upgradePrompt.classList.add('show');
            }
            this.showNotification(`Word limit exceeded! You have ${remaining} words remaining.`, 'error');
            return;
        }

        this.isProcessing = true;
        console.log('✅ Starting AI detection process...');
        this.trackEvent('ai_detection_started', { words, plan: this.currentPlan });

        try {
            // Show loading state
            await this.showLoadingState();
            this.showNotification('🔍 Step 1: Analyzing text for AI patterns...', 'info');

            // STEP 1: Only detect and highlight AI patterns
            const aiDetectionResult = await this.detectAIPatterns(inputText);
            console.log('✅ AI Detection completed:', aiDetectionResult);
            
            if (aiDetectionResult) {
                // Store current analysis
                this.currentAIResult = aiDetectionResult;
                this.currentInputText = inputText;
                
                // Show AI detection results
                this.displayAIDetectionResults(aiDetectionResult, words);
                
                // Show "Convert to Human" button
                this.showHumanizeButton();
                
                this.showNotification(`🎯 Found ${aiDetectionResult.aiWords.length} AI patterns! Click "Convert to Human" to proceed.`, 'success');
                this.trackEvent('ai_detection_completed', { 
                    words, 
                    aiWordsDetected: aiDetectionResult.aiWords.length,
                    confidence: aiDetectionResult.confidence
                });
            } else {
                throw new Error('AI detection result is null');
            }

        } catch (error) {
            console.error('❌ AI Detection failed:', error);
            this.showNotification('AI detection failed. Please try again.', 'error');
            this.trackEvent('ai_detection_failed', { error: error.message });
        } finally {
            this.isProcessing = false;
            await this.hideLoadingState();
            console.log('🏁 AI Detection process finished');
        }
    }

    /**
     * STEP 1: Detect AI patterns only
     */
    async detectAIPatterns(text) {
        console.log('🔍 Starting FIXED AI pattern detection...');
        
        try {
            // Use FIXED detector for guaranteed red highlighting
            if (window.FIXED_AI_DETECTOR && window.FIXED_AI_DETECTOR.detectAndHighlightRED) {
                const result = window.FIXED_AI_DETECTOR.detectAndHighlightRED(text);
                console.log('✅ FIXED AI detection result:', result);
                return result;
            } else if (window.simpleAIDetector && window.simpleAIDetector.detectAndHighlight) {
                const result = window.simpleAIDetector.detectAndHighlight(text);
                console.log('✅ Standard AI detection result:', result);
                return result;
            } else {
                throw new Error('No AI detector available');
            }
        } catch (error) {
            console.error('❌ AI detection failed, using emergency fallback:', error);
            
            // Emergency fallback AI detection
            return this.emergencyAIDetection(text);
        }
    }

    /**
     * Emergency fallback AI detection with GUARANTEED highlighting
     */
    emergencyAIDetection(text) {
        console.log('🚨 Using EMERGENCY AI detection...');
        
        const emergencyPatterns = ['utilize', 'leverage', 'furthermore', 'moreover', 'comprehensive'];
        
        let highlightedText = text;
        const aiWords = [];
        
        emergencyPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                matches.forEach(match => aiWords.push(match.toLowerCase()));
                highlightedText = highlightedText.replace(regex, 
                    `<span style="background-color: red !important; color: white !important; padding: 4px !important; font-weight: bold !important;">${pattern}</span>`
                );
            }
        });
        
        return {
            text: text,
            highlightedText: highlightedText,
            aiWords: [...new Set(aiWords)],
            confidence: aiWords.length > 0 ? 0.7 : 0.3,
            totalMatches: aiWords.length
        };
    }

    /**
     * Basic fallback AI detection
     */
    basicAIDetection(text) {
        console.log('⚠️ Using basic AI detection fallback...');
        
        const basicAIPatterns = [
            'utilize', 'leverage', 'facilitate', 'moreover', 'furthermore',
            'subsequently', 'consequently', 'nevertheless', 'additionally',
            'comprehensive', 'innovative', 'cutting-edge', 'optimize',
            'enhance', 'streamline', 'paradigm', 'methodology'
        ];
        
        let highlightedText = text;
        const aiWords = [];
        let totalMatches = 0;
        
        basicAIPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                matches.forEach(match => aiWords.push(match.toLowerCase()));
                totalMatches += matches.length;
                highlightedText = highlightedText.replace(regex, 
                    `<span class="ai-highlight" style="background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%); color: white; padding: 3px 6px; border-radius: 4px; font-weight: 600; border: 1px solid #ff0000; box-shadow: 0 2px 4px rgba(255,68,68,0.3);">$&</span>`
                );
            }
        });
        
        const wordCount = text.split(/\s+/).length;
        const density = totalMatches / wordCount;
        
        return {
            text: text,
            highlightedText: highlightedText,
            aiWords: [...new Set(aiWords)],
            confidence: Math.min(density * 2 + 0.2, 0.95),
            totalMatches: totalMatches,
            wordCount: wordCount,
            density: density
        };
    }

    /**
     * Display AI detection results (Step 1)
     */
    displayAIDetectionResults(aiResult, totalWords) {
        console.log('📊 Displaying AI detection results (Step 1):', aiResult);
        
        const originalText = document.getElementById('originalText');
        const resultsSection = document.getElementById('results');
        const humanizedSection = document.getElementById('humanizedSection');

        // Display original text with AI highlights
        if (originalText) {
            originalText.innerHTML = aiResult.highlightedText || aiResult.text || 'No text found';
            console.log('✅ AI highlighted text displayed');
        }

        // Hide humanized section initially (Step 2 not done yet)
        if (humanizedSection) {
            humanizedSection.style.display = 'none';
        }

        // Show results section
        if (resultsSection) {
            resultsSection.style.display = 'grid';
            resultsSection.classList.add('animate-fade-in-up');
            console.log('✅ Results section shown');
        }

        // Update AI detection stats
        this.updateAIDetectionStats({
            totalWords: totalWords,
            aiWordsDetected: aiResult.aiWords.length,
            confidence: aiResult.confidence || 0.5,
            totalMatches: aiResult.totalMatches || aiResult.aiWords.length,
            density: aiResult.density || 0
        });

        // Add step indicator
        this.showStepIndicator(1);

        // Scroll to results with smooth animation
        setTimeout(() => {
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 300);
    }

    /**
     * Show step indicator
     */
    showStepIndicator(currentStep) {
        // Create or update step indicator
        let stepIndicator = document.getElementById('stepIndicator');
        if (!stepIndicator) {
            stepIndicator = document.createElement('div');
            stepIndicator.id = 'stepIndicator';
            stepIndicator.className = 'step-indicator';
            
            // Insert before results section
            const resultsSection = document.getElementById('results');
            if (resultsSection && resultsSection.parentNode) {
                resultsSection.parentNode.insertBefore(stepIndicator, resultsSection);
            }
        }

        stepIndicator.innerHTML = `
            <div class="step ${currentStep >= 1 ? 'completed' : 'pending'}">
                <span class="step-number">1</span>
                <span class="step-text">🔍 AI Detection</span>
            </div>
            <div class="step-arrow">→</div>
            <div class="step ${currentStep >= 2 ? 'active' : 'pending'}">
                <span class="step-number">2</span>
                <span class="step-text">🤖➡️👤 Humanization</span>
            </div>
        `;
    }

    /**
     * Show "Convert to Human" button
     */
    showHumanizeButton() {
        // Create or show humanize button
        let humanizeBtn = document.getElementById('humanizeBtn');
        if (!humanizeBtn) {
            humanizeBtn = document.createElement('button');
            humanizeBtn.id = 'humanizeBtn';
            humanizeBtn.className = 'btn btn-primary humanize-btn';
            humanizeBtn.innerHTML = `
                <span class="btn-icon">🤖➡️👤</span>
                <span class="btn-text">Convert to Human Text</span>
                <span class="btn-subtitle">Step 2</span>
            `;
            
            // Insert after analyze button
            const analyzeBtn = document.getElementById('analyzeBtn');
            if (analyzeBtn && analyzeBtn.parentNode) {
                analyzeBtn.parentNode.insertBefore(humanizeBtn, analyzeBtn.nextSibling);
            }
        }
        
        // Add event listener
        humanizeBtn.onclick = () => this.humanizeDetectedText();
        humanizeBtn.style.display = 'inline-flex';
        humanizeBtn.style.animation = 'pulse 2s ease-in-out infinite';
        
        console.log('✅ Humanize button shown with pulsing animation');
    }

    /**
     * STEP 2: Humanize the detected AI text
     */
    async humanizeDetectedText() {
        console.log('🤖➡️👤 Starting Step 2: Humanization');
        
        if (!this.currentInputText || !this.currentAIResult) {
            this.showNotification('Please analyze text first to detect AI patterns.', 'warning');
            return;
        }

        try {
            this.isProcessing = true;
            await this.showLoadingState();
            this.showNotification('🤖➡️👤 Step 2: Converting AI text to human language...', 'info');

            // Update step indicator
            this.showStepIndicator(2);

            // Humanize the text using FIXED humanizer
            let humanizedResult;
            try {
                if (window.FIXED_AI_DETECTOR && window.FIXED_AI_DETECTOR.humanizeText) {
                    humanizedResult = window.FIXED_AI_DETECTOR.humanizeText(this.currentInputText);
                    console.log('✅ FIXED humanization result:', humanizedResult);
                } else if (window.simpleAIDetector && window.simpleAIDetector.humanizeText) {
                    humanizedResult = window.simpleAIDetector.humanizeText(this.currentInputText);
                    console.log('✅ Standard humanization result:', humanizedResult);
                } else {
                    throw new Error('No humanizer available');
                }
            } catch (error) {
                console.warn('Humanization failed, using emergency fallback:', error);
                humanizedResult = {
                    text: this.emergencyHumanization(this.currentInputText),
                    replacementCount: 0
                };
            }

            // Calculate final stats
            const aiWordsDetected = this.currentAIResult.aiWords ? this.currentAIResult.aiWords.length : 0;
            const totalWords = this.currentInputText.split(/\s+/).length;
            const humanScore = Math.max(0, 100 - Math.round((aiWordsDetected / totalWords) * 100));

            const finalResult = {
                original: this.currentAIResult,
                humanized: humanizedResult.text || humanizedResult,
                stats: {
                    totalWords,
                    aiWordsDetected,
                    humanScore,
                    wordsRemaining: this.isOwner ? 'Unlimited' : this.limits[this.currentPlan] - this.dailyUsage,
                    confidence: this.currentAIResult.confidence || 0.5,
                    replacementCount: humanizedResult.replacementCount || 0
                }
            };

            // Store and display final results
            this.lastAnalysis = finalResult;
            this.displayHumanizedResults(finalResult);
            this.hideHumanizeButton();
            
            this.showNotification(`✅ Text successfully humanized! Made ${finalResult.stats.replacementCount} improvements.`, 'success');
            this.trackEvent('humanization_completed', { 
                totalWords, 
                aiWordsDetected,
                humanScore,
                replacementCount: finalResult.stats.replacementCount
            });

        } catch (error) {
            console.error('❌ Humanization failed:', error);
            this.showNotification('Humanization failed. Please try again.', 'error');
            this.trackEvent('humanization_failed', { error: error.message });
        } finally {
            this.isProcessing = false;
            await this.hideLoadingState();
        }
    }

    /**
     * Emergency humanization fallback
     */
    emergencyHumanization(text) {
        console.log('🚨 Using EMERGENCY humanization...');
        return text
            .replace(/\butilize\b/gi, 'use')
            .replace(/\bleverage\b/gi, 'use')
            .replace(/\bfacilitate\b/gi, 'help')
            .replace(/\bfurthermore\b/gi, 'also')
            .replace(/\bmoreover\b/gi, 'plus')
            .replace(/\bcomprehensive\b/gi, 'complete');
    }

    /**
     * Basic humanization fallback
     */
    basicHumanization(text) {
        console.log('⚠️ Using basic humanization fallback...');
        return text
            .replace(/\butilize\b/gi, 'use')
            .replace(/\bleverage\b/gi, 'use')
            .replace(/\bfacilitate\b/gi, 'help')
            .replace(/\bfurthermore\b/gi, 'also')
            .replace(/\bmoreover\b/gi, 'plus')
            .replace(/\bsubsequently\b/gi, 'then')
            .replace(/\bconsequently\b/gi, 'so')
            .replace(/\bnevertheless\b/gi, 'however')
            .replace(/\badditionally\b/gi, 'also')
            .replace(/\bcomprehensive\b/gi, 'complete')
            .replace(/\binnovative\b/gi, 'new')
            .replace(/\boptimize\b/gi, 'improve')
            .replace(/\benhance\b/gi, 'improve')
            .replace(/\bstreamline\b/gi, 'simplify');
    }

    /**
     * Display final humanized results (Step 2 Complete)
     */
    displayHumanizedResults(result) {
        console.log('📊 Displaying final humanized results:', result);
        
        const humanizedText = document.getElementById('humanizedText');
        const humanizedSection = document.getElementById('humanizedSection');
        const downloadBtn = document.getElementById('downloadBtn');

        // Show humanized text
        if (humanizedText) {
            humanizedText.innerHTML = result.humanized || 'No humanized text available';
            console.log('✅ Humanized text displayed');
        }

        // Show humanized section with animation
        if (humanizedSection) {
            humanizedSection.style.display = 'block';
            humanizedSection.classList.add('animate-fade-in-up', 'show');
        }

        // Show download button
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-flex';
        }

        // Update final statistics
        this.updateResultsStats(result.stats);
        this.updateUI();

        // Mark step 2 as completed
        this.showStepIndicator(3); // Both steps completed
    }

    /**
     * Hide humanize button
     */
    hideHumanizeButton() {
        const humanizeBtn = document.getElementById('humanizeBtn');
        if (humanizeBtn) {
            humanizeBtn.style.display = 'none';
            humanizeBtn.style.animation = '';
        }
    }

    /**
     * Update AI detection stats (Step 1)
     */
    updateAIDetectionStats(stats) {
        console.log('📈 Updating AI detection stats:', stats);
        
        const elements = {
            totalWords: document.getElementById('totalWords'),
            aiWordsCount: document.getElementById('aiWordsCount'),
            confidence: document.getElementById('confidence'),
            humanScore: document.getElementById('humanScore')
        };

        if (elements.totalWords) {
            elements.totalWords.textContent = stats.totalWords || 0;
        }
        
        if (elements.aiWordsCount) {
            elements.aiWordsCount.textContent = stats.aiWordsDetected || 0;
            
            // Add pulsing effect for AI words count
            elements.aiWordsCount.style.animation = 'pulse 1s ease-in-out';
            elements.aiWordsCount.style.color = '#ff4444';
            setTimeout(() => {
                if (elements.aiWordsCount) {
                    elements.aiWordsCount.style.animation = '';
                }
            }, 1000);
        }
        
        if (elements.confidence) {
            elements.confidence.textContent = `${Math.round((stats.confidence || 0) * 100)}%`;
        }

        // Show preliminary human score
        if (elements.humanScore) {
            const preliminaryScore = Math.max(0, 100 - Math.round((stats.aiWordsDetected / stats.totalWords) * 100));
            elements.humanScore.textContent = `${preliminaryScore}% (Preliminary)`;
            elements.humanScore.style.color = '#ffc107'; // Warning color for preliminary
        }

        console.log('✅ AI detection stats updated');
    }

    /**
     * Process text with retry logic
     */
    async processTextWithRetry(text, wordCount, retries = 0) {
        try {
            // Simulate processing delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update daily usage (only if not owner)
            if (!this.isOwner) {
                this.dailyUsage += wordCount;
                this.saveDailyUsage();
            }

            // Try quick analyze first (most reliable)
            if (window.quickAnalyze) {
                console.log('🚀 Using quick analyze (primary method)...');
                const quickResult = window.quickAnalyze(text);
                if (quickResult) {
                    console.log('✅ Quick analyze SUCCESS!');
                    return quickResult;
                }
            }

            // Fallback to original classes if quick analyze fails
            console.log('⚠️ Quick analyze failed, trying original classes...');
            
            // Initialize classes if not already done
            if (!window.aiDetector) {
                console.log('Initializing AI Detector...');
                window.aiDetector = new AIDetector();
            }
            if (!window.textHumanizer) {
                console.log('Initializing Text Humanizer...');
                window.textHumanizer = new TextHumanizer();
            }

            // Detect AI patterns with fallback
            let aiDetectionResult;
            try {
                aiDetectionResult = window.aiDetector.detectAIPatterns(text);
            } catch (detectionError) {
                console.warn('AI Detection failed, using simple fallback:', detectionError);
                aiDetectionResult = {
                    aiWords: [],
                    highlightedText: text,
                    confidence: 0.5,
                    patterns: []
                };
            }
            
            // Humanize text with fallback
            let humanizedText;
            try {
                humanizedText = window.textHumanizer.humanizeText(text);
            } catch (humanizeError) {
                console.warn('Text humanization failed, using simple fallback:', humanizeError);
                humanizedText = text
                    .replace(/\butilize\b/gi, 'use')
                    .replace(/\bleverage\b/gi, 'use')
                    .replace(/\bfacilitate\b/gi, 'help')
                    .replace(/\bfurthermore\b/gi, 'also')
                    .replace(/\bmoreover\b/gi, 'plus');
            }

            // Calculate scores
            const aiWordsDetected = aiDetectionResult.aiWords ? aiDetectionResult.aiWords.length : 0;
            const totalWords = text.split(/\s+/).length;
            const humanScore = Math.max(0, 100 - Math.round((aiWordsDetected / totalWords) * 100));

            const result = {
                original: aiDetectionResult,
                humanized: humanizedText,
                stats: {
                    totalWords,
                    aiWordsDetected,
                    humanScore,
                    wordsRemaining: this.isOwner ? 'Unlimited' : this.limits[this.currentPlan] - this.dailyUsage,
                    confidence: aiDetectionResult.confidence || 0.5
                }
            };

            console.log('Final result:', result);
            return result;

        } catch (error) {
            console.error('Processing error:', error);
            
            if (retries < this.config.maxRetries) {
                console.warn(`Processing attempt ${retries + 1} failed, retrying...`);
                await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
                return this.processTextWithRetry(text, wordCount, retries + 1);
            }
            throw error;
        }
    }

    /**
     * Display analysis results
     */
    displayResults(result) {
        console.log('📊 Displaying results:', result);
        
        const originalText = document.getElementById('originalText');
        const humanizedText = document.getElementById('humanizedText');
        const resultsSection = document.getElementById('results');
        const downloadBtn = document.getElementById('downloadBtn');

        // Display original text with AI highlights
        if (originalText) {
            originalText.innerHTML = result.original.highlightedText || result.original.text || 'No original text found';
            console.log('✅ Original text displayed');
        } else {
            console.error('❌ originalText element not found');
        }

        // Display humanized text
        if (humanizedText) {
            humanizedText.innerHTML = result.humanized || 'No humanized text available';
            console.log('✅ Humanized text displayed');
        } else {
            console.error('❌ humanizedText element not found');
        }

        // Show results section
        if (resultsSection) {
            resultsSection.style.display = 'grid';
            resultsSection.classList.add('animate-fade-in-up');
            console.log('✅ Results section shown');
        } else {
            console.error('❌ Results section not found');
        }

        // Show download button
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-flex';
            console.log('✅ Download button shown');
        }

        // Update statistics
        this.updateResultsStats(result.stats);

        // Scroll to results with smooth animation
        setTimeout(() => {
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                console.log('✅ Scrolled to results');
            }
        }, 300);

        this.updateUI();
        console.log('✅ displayResults completed successfully');
    }

    /**
     * Update results statistics display
     */
    updateResultsStats(stats) {
        console.log('📈 Updating stats:', stats);
        
        const elements = {
            totalWords: document.getElementById('totalWords'),
            aiWordsCount: document.getElementById('aiWordsCount'),
            humanScore: document.getElementById('humanScore'),
            confidence: document.getElementById('confidence')
        };

        if (elements.totalWords) {
            elements.totalWords.textContent = stats.totalWords || 0;
        }
        
        if (elements.aiWordsCount) {
            elements.aiWordsCount.textContent = stats.aiWordsDetected || 0;
        }
        
        if (elements.humanScore) {
            elements.humanScore.textContent = `${stats.humanScore || 0}%`;
        }
        
        if (elements.confidence) {
            elements.confidence.textContent = `${Math.round((stats.confidence || 0) * 100)}%`;
        }

        console.log('✅ Stats updated successfully');
    }

    /**
     * Update statistics display
     */
    updateStats(stats) {
        const elements = {
            totalWords: document.getElementById('totalWords'),
            aiWordsCount: document.getElementById('aiWordsCount'),
            humanScore: document.getElementById('humanScore'),
            wordsRemaining: document.getElementById('wordsRemaining')
        };

        // Animate counter updates
        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element) {
                element.classList.add('counter-animate');
                setTimeout(() => element.classList.remove('counter-animate'), 800);
            }
        });

        if (elements.totalWords) {
            this.animateCounter(elements.totalWords, stats.totalWords);
        }
        if (elements.aiWordsCount) {
            this.animateCounter(elements.aiWordsCount, stats.aiWordsDetected);
        }
        if (elements.humanScore) {
            this.animateCounter(elements.humanScore, stats.humanScore, '%');
        }
        if (elements.wordsRemaining) {
            this.animateCounter(elements.wordsRemaining, stats.wordsRemaining);
        }

        const statsSection = document.getElementById('stats');
        if (statsSection) {
            statsSection.style.display = 'block';
            statsSection.classList.add('animate-fade-in-up');
        }
    }

    /**
     * Animate counter numbers
     */
    animateCounter(element, targetValue, suffix = '') {
        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    /**
     * Show loading state
     */
    async showLoadingState() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.classList.add('loading');
            analyzeBtn.innerHTML = '<i class="fas fa-spinner loading-spinner"></i> Analyzing...';
            analyzeBtn.disabled = true;
        }

        const textareaContainer = document.querySelector('.textarea-container');
        if (textareaContainer) {
            textareaContainer.classList.add('loading');
        }
    }

    /**
     * Hide loading state
     */
    async hideLoadingState() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.classList.remove('loading');
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze & Humanize Text';
            analyzeBtn.disabled = false;
        }

        const textareaContainer = document.querySelector('.textarea-container');
        if (textareaContainer) {
            textareaContainer.classList.remove('loading');
        }
    }

    /**
     * Clear all text and results
     */
    clearText() {
        const inputText = document.getElementById('inputText');
        const results = document.getElementById('results');
        const stats = document.getElementById('stats');
        const downloadBtn = document.getElementById('downloadBtn');
        const upgradePrompt = document.getElementById('upgradePrompt');

        if (inputText) {
            inputText.value = '';
            inputText.focus();
        }

        [results, stats].forEach(element => {
            if (element) {
                element.style.display = 'none';
                element.classList.remove('animate-fade-in-up');
            }
        });

        if (downloadBtn) downloadBtn.style.display = 'none';
        if (upgradePrompt) {
            upgradePrompt.style.display = 'none';
            upgradePrompt.classList.remove('show');
        }

        this.lastAnalysis = null;
        this.updateWordCount();
        this.trackEvent('text_cleared');
        this.showNotification('Text cleared!', 'info');
    }

    /**
     * Copy text to clipboard
     */
    async copyToClipboard(type) {
        const elementId = type === 'original' ? 'originalText' : 'humanizedText';
        const element = document.getElementById(elementId);
        
        if (!element) return;

        const text = element.textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            const copyBtn = document.getElementById(`copy${type.charAt(0).toUpperCase() + type.slice(1)}`);
            if (copyBtn) {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.classList.add('success-checkmark');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('success-checkmark');
                }, 1500);
            }
            
            this.trackEvent('text_copied', { type });
            this.showNotification(
                `${type.charAt(0).toUpperCase() + type.slice(1)} text copied to clipboard!`, 
                'success'
            );
        } catch (err) {
            console.error('Failed to copy text:', err);
            this.showNotification('Failed to copy text. Please try again.', 'error');
        }
    }

    /**
     * Download analysis results
     */
    downloadResults() {
        if (!this.lastAnalysis) return;

        const originalText = document.getElementById('originalText')?.textContent || '';
        const humanizedText = document.getElementById('humanizedText')?.textContent || '';
        const stats = this.lastAnalysis.stats;
        
        const content = this.generateResultsReport(originalText, humanizedText, stats);
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `ai-humanizer-results-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.trackEvent('results_downloaded');
        this.showNotification('Results downloaded successfully!', 'success');
    }

    /**
     * Generate results report
     */
    generateResultsReport(originalText, humanizedText, stats) {
        return `AI Text Humanizer Results
Generated on: ${new Date().toLocaleString()}
Plan: ${this.currentPlan.charAt(0).toUpperCase() + this.currentPlan.slice(1)}

ORIGINAL TEXT:
${originalText}

HUMANIZED TEXT:
${humanizedText}

ANALYSIS STATISTICS:
- Total Words: ${stats.totalWords}
- AI Words Detected: ${stats.aiWordsDetected}
- Human Score: ${stats.humanScore}%
- Detection Confidence: ${(stats.confidence * 100).toFixed(1)}%
- Words Remaining Today: ${stats.wordsRemaining}

---
Generated by AI Text Humanizer
Visit: https://your-domain.com
`;
    }

    /**
     * Show upgrade modal
     */
    showUpgradeModal() {
        this.trackEvent('upgrade_modal_shown');
        this.showNotification(
            'Upgrade feature would redirect to payment processor in a real application.', 
            'info'
        );
    }

    /**
     * Update UI elements
     */
    updateUI() {
        const elements = {
            currentPlan: document.getElementById('currentPlan'),
            wordsUsed: document.getElementById('wordsUsed'),
            wordLimit: document.getElementById('wordLimit'),
            wordsUsedDisplay: document.getElementById('wordsUsedDisplay')
        };

        if (elements.currentPlan) {
            let displayPlan;
            if (this.isOwner) {
                displayPlan = '👑 OWNER (Unlimited)';
            } else {
                displayPlan = this.currentPlan.charAt(0).toUpperCase() + this.currentPlan.slice(1);
            }
            elements.currentPlan.textContent = displayPlan;
            if (this.isOwner) {
                elements.currentPlan.style.color = '#28a745';
                elements.currentPlan.style.fontWeight = 'bold';
                elements.currentPlan.style.textShadow = '0 0 10px rgba(40, 167, 69, 0.3)';
            }
        }

        if (elements.wordsUsed) {
            elements.wordsUsed.textContent = this.dailyUsage;
        }

        if (elements.wordLimit) {
            const limitDisplay = this.isOwner ? '∞ (Unlimited)' : this.limits[this.currentPlan];
            elements.wordLimit.textContent = limitDisplay;
            if (this.isOwner) {
                elements.wordLimit.style.color = '#28a745';
                elements.wordLimit.style.fontWeight = 'bold';
            }
        }

        const usagePercentage = (this.dailyUsage / this.limits[this.currentPlan]) * 100;
        
        if (elements.wordsUsedDisplay) {
            elements.wordsUsedDisplay.classList.remove('warning', 'danger');
            if (usagePercentage >= 100) {
                elements.wordsUsedDisplay.classList.add('danger');
            } else if (usagePercentage >= 80) {
                elements.wordsUsedDisplay.classList.add('warning');
            }
        }

        this.updateWordCount();
    }

    /**
     * Load daily usage from localStorage
     */
    loadDailyUsage() {
        try {
            const today = new Date().toDateString();
            const stored = JSON.parse(localStorage.getItem('aiHumanizerUsage') || '{}');
            
            if (stored.date === today) {
                return stored.usage || 0;
            }
            
            return 0;
        } catch (error) {
            console.warn('Failed to load daily usage:', error);
            return 0;
        }
    }

    /**
     * Save daily usage to localStorage
     */
    saveDailyUsage() {
        try {
            const today = new Date().toDateString();
            const data = {
                date: today,
                usage: this.dailyUsage,
                plan: this.currentPlan,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('aiHumanizerUsage', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save daily usage:', error);
        }
    }

    /**
     * Initialize navigation functionality
     */
    initializeNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /**
     * Initialize scroll reveal animations
     */
    initializeScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Adjust layout if needed
        console.log('Window resized');
    }

    /**
     * Close all modals
     */
    closeModals() {
        const upgradePrompt = document.getElementById('upgradePrompt');
        if (upgradePrompt) {
            upgradePrompt.style.display = 'none';
            upgradePrompt.classList.remove('show');
        }
    }

    /**
     * Track events for analytics
     */
    trackEvent(eventName, properties = {}) {
        // In a real application, this would send to analytics service
        console.log('Event tracked:', eventName, properties);
        
        // Store in localStorage for demo purposes
        try {
            const events = JSON.parse(localStorage.getItem('aiHumanizerEvents') || '[]');
            events.push({
                event: eventName,
                properties,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 100 events
            if (events.length > 100) {
                events.splice(0, events.length - 100);
            }
            
            localStorage.setItem('aiHumanizerEvents', JSON.stringify(events));
        } catch (error) {
            console.warn('Failed to track event:', error);
        }
    }

    /**
     * Track performance metrics
     */
    trackPerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            this.trackEvent('page_performance', {
                loadTime,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
            });
        }
    }

    /**
     * Preload components
     */
    preloadComponents() {
        // Preload critical components for better performance
        console.log('Components preloaded');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        showNotification(message, type);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiHumanizer = new AITextHumanizer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AITextHumanizer;
}