
/**
 * Subscription Management System
 * Handles payment processing, plan management, and billing
 */

class SubscriptionManager {
    constructor() {
        this.plans = {
            free: {
                id: 'free',
                name: 'Free Plan',
                price: 0,
                currency: 'USD',
                interval: 'month',
                wordLimit: 100, // Increased from 50 to 100
                features: [
                    '100 words per day',
                    'Basic AI detection',
                    'Standard humanization',
                    'Email support'
                ]
            },
            premium: {
                id: 'premium',
                name: 'Premium Plan',
                price: 100,
                currency: 'USD',
                interval: 'month',
                wordLimit: 100000,
                features: [
                    '100,000 words per day',
                    'Advanced AI detection',
                    'Smart humanization',
                    'Bulk processing',
                    'Priority support',
                    'API access',
                    'Export features',
                    'Advanced analytics'
                ]
            },
            owner: {
                id: 'owner',
                name: 'Owner Access',
                price: 0,
                currency: 'USD',
                interval: 'lifetime',
                wordLimit: 999999999, // Unlimited for owner
                features: [
                    'Unlimited words',
                    'Advanced AI detection',
                    'Smart humanization',
                    'Bulk processing',
                    'Priority support',
                    'API access',
                    'Export features',
                    'Advanced analytics',
                    'Owner privileges'
                ]
            }
        };

        this.currentSubscription = this.loadSubscription();
        this.paymentMethods = [];
        this.billingHistory = this.loadBillingHistory();
        
        this.initializePaymentGateway();
    }

    /**
     * Initialize payment gateway (Stripe simulation)
     */
    initializePaymentGateway() {
        // In a real application, this would initialize Stripe or other payment processor
        this.paymentGateway = {
            publishableKey: 'pk_test_your_stripe_publishable_key',
            secretKey: 'sk_test_your_stripe_secret_key', // Server-side only
            webhookSecret: 'whsec_your_webhook_secret'
        };

        console.log('Payment gateway initialized (simulation mode)');
    }

    /**
     * Get current subscription details
     */
    getCurrentSubscription() {
        return this.currentSubscription;
    }

    /**
     * Get plan details by ID
     */
    getPlan(planId) {
        return this.plans[planId] || null;
    }

    /**
     * Get all available plans
     */
    getAllPlans() {
        return Object.values(this.plans);
    }

    /**
     * Check if user can perform action based on current plan
     */
    canPerformAction(action, data = {}) {
        const subscription = this.currentSubscription;
        const plan = this.getPlan(subscription.planId);

        if (!plan) return false;

        switch (action) {
            case 'analyze_text':
                return this.checkWordLimit(data.wordCount);
            case 'bulk_process':
                return subscription.planId === 'premium';
            case 'api_access':
                return subscription.planId === 'premium';
            case 'priority_support':
                return subscription.planId === 'premium';
            case 'export_results':
                return subscription.planId === 'premium';
            case 'advanced_analytics':
                return subscription.planId === 'premium';
            default:
                return true;
        }
    }

    /**
     * Check word limit for current plan
     */
    checkWordLimit(requestedWords) {
        const subscription = this.currentSubscription;
        const plan = this.getPlan(subscription.planId);
        const usage = this.getTodayUsage();

        if (!plan) return false;

        const remainingWords = plan.wordLimit - usage;
        return requestedWords <= remainingWords;
    }

    /**
     * Get today's usage
     */
    getTodayUsage() {
        const today = new Date().toDateString();
        const usage = storage.get('dailyUsage', { date: today, words: 0 });
        
        if (usage.date !== today) {
            // Reset for new day
            storage.set('dailyUsage', { date: today, words: 0 });
            return 0;
        }
        
        return usage.words;
    }

    /**
     * Update word usage
     */
    updateUsage(wordCount) {
        const today = new Date().toDateString();
        const currentUsage = this.getTodayUsage();
        const newUsage = {
            date: today,
            words: currentUsage + wordCount,
            lastUpdated: new Date().toISOString()
        };
        
        storage.set('dailyUsage', newUsage);
        
        // Track usage analytics
        this.trackUsageAnalytics(wordCount, newUsage.words);
        
        return newUsage;
    }

    /**
     * Subscribe to a plan
     */
    async subscribeToPlan(planId, paymentMethodId = null) {
        try {
            const plan = this.getPlan(planId);
            if (!plan) {
                throw new Error('Invalid plan selected');
            }

            // For free plan, no payment required
            if (planId === 'free') {
                return this.activateSubscription(planId, null);
            }

            // For premium plan, process payment
            if (planId === 'premium') {
                const paymentResult = await this.processPayment(plan, paymentMethodId);
                
                if (paymentResult.success) {
                    return this.activateSubscription(planId, paymentResult.subscriptionId);
                } else {
                    throw new Error(paymentResult.error || 'Payment failed');
                }
            }

        } catch (error) {
            console.error('Subscription failed:', error);
            throw error;
        }
    }

    /**
     * Process payment (simulation)
     */
    async processPayment(plan, paymentMethodId) {
        // Simulate payment processing delay
        await sleep(2000);

        // In a real application, this would call Stripe or other payment processor
        // For demo purposes, we'll simulate different outcomes
        
        const simulateFailure = Math.random() < 0.1; // 10% failure rate for demo
        
        if (simulateFailure) {
            return {
                success: false,
                error: 'Payment declined. Please try a different payment method.'
            };
        }

        const subscriptionId = 'sub_' + generateId(16);
        const paymentIntentId = 'pi_' + generateId(16);

        // Add to billing history
        this.addToBillingHistory({
            id: generateId(12),
            subscriptionId,
            paymentIntentId,
            planId: plan.id,
            amount: plan.price,
            currency: plan.currency,
            status: 'paid',
            date: new Date().toISOString(),
            description: `${plan.name} - Monthly subscription`
        });

        return {
            success: true,
            subscriptionId,
            paymentIntentId,
            amount: plan.price,
            currency: plan.currency
        };
    }

    /**
     * Activate subscription
     */
    activateSubscription(planId, subscriptionId = null) {
        const plan = this.getPlan(planId);
        const now = new Date();
        const nextBilling = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

        const subscription = {
            id: subscriptionId || 'free_' + generateId(8),
            planId: plan.id,
            planName: plan.name,
            status: 'active',
            startDate: now.toISOString(),
            nextBillingDate: nextBilling.toISOString(),
            amount: plan.price,
            currency: plan.currency,
            wordLimit: plan.wordLimit,
            features: plan.features
        };

        this.currentSubscription = subscription;
        this.saveSubscription();

        // Track subscription event
        this.trackSubscriptionEvent('subscription_activated', {
            planId,
            subscriptionId: subscription.id,
            amount: plan.price
        });

        // Send confirmation email (simulation)
        this.sendConfirmationEmail(subscription);

        return subscription;
    }

    /**
     * Cancel subscription
     */
    async cancelSubscription(reason = '') {
        try {
            const subscription = this.currentSubscription;
            
            if (!subscription || subscription.planId === 'free') {
                throw new Error('No active subscription to cancel');
            }

            // In a real application, this would call the payment processor to cancel
            await this.cancelPaymentSubscription(subscription.id);

            // Downgrade to free plan
            const freeSubscription = this.activateSubscription('free');

            // Track cancellation
            this.trackSubscriptionEvent('subscription_cancelled', {
                planId: subscription.planId,
                subscriptionId: subscription.id,
                reason: reason,
                cancelledAt: new Date().toISOString()
            });

            // Send cancellation confirmation
            this.sendCancellationEmail(subscription, reason);

            showNotification('Subscription cancelled successfully. You\'ve been moved to the free plan.', 'info');
            
            return freeSubscription;

        } catch (error) {
            console.error('Cancellation failed:', error);
            throw error;
        }
    }

    /**
     * Cancel payment subscription (simulation)
     */
    async cancelPaymentSubscription(subscriptionId) {
        // Simulate API call delay
        await sleep(1000);
        
        // In a real application, this would call Stripe:
        // const subscription = await stripe.subscriptions.del(subscriptionId);
        
        console.log(`Payment subscription ${subscriptionId} cancelled`);
        return { id: subscriptionId, status: 'cancelled' };
    }

    /**
     * Update payment method
     */
    async updatePaymentMethod(paymentMethodData) {
        try {
            // Validate payment method data
            this.validatePaymentMethod(paymentMethodData);

            // In a real application, this would create a payment method with Stripe
            const paymentMethod = await this.createPaymentMethod(paymentMethodData);

            // Update subscription with new payment method
            if (this.currentSubscription.planId === 'premium') {
                await this.updateSubscriptionPaymentMethod(
                    this.currentSubscription.id, 
                    paymentMethod.id
                );
            }

            showNotification('Payment method updated successfully!', 'success');
            return paymentMethod;

        } catch (error) {
            console.error('Failed to update payment method:', error);
            throw error;
        }
    }

    /**
     * Validate payment method data
     */
    validatePaymentMethod(data) {
        const required = ['cardNumber', 'expiryMonth', 'expiryYear', 'cvc'];
        
        for (const field of required) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Basic card number validation (Luhn algorithm would be better)
        if (!/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
            throw new Error('Invalid card number');
        }

        // Expiry validation
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        
        if (data.expiryYear < currentYear || 
            (data.expiryYear === currentYear && data.expiryMonth < currentMonth)) {
            throw new Error('Card has expired');
        }

        // CVC validation
        if (!/^\d{3,4}$/.test(data.cvc)) {
            throw new Error('Invalid CVC');
        }
    }

    /**
     * Create payment method (simulation)
     */
    async createPaymentMethod(data) {
        await sleep(1500);

        const paymentMethod = {
            id: 'pm_' + generateId(16),
            type: 'card',
            card: {
                brand: this.detectCardBrand(data.cardNumber),
                last4: data.cardNumber.slice(-4),
                expiryMonth: data.expiryMonth,
                expiryYear: data.expiryYear
            },
            created: Date.now()
        };

        this.paymentMethods.push(paymentMethod);
        this.savePaymentMethods();

        return paymentMethod;
    }

    /**
     * Detect card brand from number
     */
    detectCardBrand(cardNumber) {
        const number = cardNumber.replace(/\s/g, '');
        
        if (/^4/.test(number)) return 'visa';
        if (/^5[1-5]/.test(number)) return 'mastercard';
        if (/^3[47]/.test(number)) return 'amex';
        if (/^6(?:011|5)/.test(number)) return 'discover';
        
        return 'unknown';
    }

    /**
     * Update subscription payment method
     */
    async updateSubscriptionPaymentMethod(subscriptionId, paymentMethodId) {
        await sleep(1000);
        
        // In a real application:
        // await stripe.subscriptions.update(subscriptionId, {
        //     default_payment_method: paymentMethodId
        // });
        
        console.log(`Subscription ${subscriptionId} updated with payment method ${paymentMethodId}`);
    }

    /**
     * Get billing history
     */
    getBillingHistory() {
        return this.billingHistory;
    }

    /**
     * Add to billing history
     */
    addToBillingHistory(transaction) {
        this.billingHistory.unshift(transaction);
        this.saveBillingHistory();
    }

    /**
     * Generate invoice
     */
    generateInvoice(transactionId) {
        const transaction = this.billingHistory.find(t => t.id === transactionId);
        
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        const invoice = {
            id: 'inv_' + generateId(12),
            transactionId: transaction.id,
            subscriptionId: transaction.subscriptionId,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            date: transaction.date,
            description: transaction.description,
            customerInfo: this.getCustomerInfo(),
            companyInfo: {
                name: 'AI Text Humanizer',
                address: '123 Tech Street, Silicon Valley, CA 94000',
                email: 'billing@aitexthumanizer.com',
                phone: '+1 (555) 123-4567'
            }
        };

        return invoice;
    }

    /**
     * Download invoice
     */
    downloadInvoice(transactionId) {
        const invoice = this.generateInvoice(transactionId);
        const invoiceText = this.formatInvoiceText(invoice);
        
        downloadTextFile(
            invoiceText, 
            `invoice-${invoice.id}.txt`, 
            'text/plain'
        );
    }

    /**
     * Format invoice as text
     */
    formatInvoiceText(invoice) {
        return `
INVOICE

Invoice ID: ${invoice.id}
Date: ${formatDate(invoice.date)}
Status: ${invoice.status.toUpperCase()}

BILL TO:
${invoice.customerInfo.name || 'Customer'}
${invoice.customerInfo.email || 'customer@email.com'}

FROM:
${invoice.companyInfo.name}
${invoice.companyInfo.address}
${invoice.companyInfo.email}
${invoice.companyInfo.phone}

DESCRIPTION:
${invoice.description}

AMOUNT: ${invoice.currency.toUpperCase()} $${invoice.amount}

Transaction ID: ${invoice.transactionId}
Subscription ID: ${invoice.subscriptionId}

Thank you for your business!
`;
    }

    /**
     * Get customer info (placeholder)
     */
    getCustomerInfo() {
        return storage.get('customerInfo', {
            name: '',
            email: '',
            address: '',
            phone: ''
        });
    }

    /**
     * Track subscription events
     */
    trackSubscriptionEvent(event, data) {
        const eventData = {
            event,
            data,
            timestamp: new Date().toISOString(),
            sessionId: generateId(16)
        };

        // Store locally for demo
        const events = storage.get('subscriptionEvents', []);
        events.push(eventData);
        storage.set('subscriptionEvents', events.slice(-100)); // Keep last 100 events

        console.log('Subscription event tracked:', eventData);
    }

    /**
     * Track usage analytics
     */
    trackUsageAnalytics(wordsUsed, totalWordsToday) {
        const analytics = storage.get('usageAnalytics', []);
        
        analytics.push({
            date: new Date().toISOString(),
            wordsUsed,
            totalWordsToday,
            planId: this.currentSubscription.planId
        });

        // Keep last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const filteredAnalytics = analytics.filter(entry => 
            new Date(entry.date) >= thirtyDaysAgo
        );

        storage.set('usageAnalytics', filteredAnalytics);
    }

    /**
     * Get usage analytics
     */
    getUsageAnalytics(days = 30) {
        const analytics = storage.get('usageAnalytics', []);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return analytics.filter(entry => 
            new Date(entry.date) >= cutoffDate
        );
    }

    /**
     * Send confirmation email (simulation)
     */
    sendConfirmationEmail(subscription) {
        console.log('Confirmation email sent for subscription:', subscription.id);
        
        // In a real application, this would integrate with an email service
        // like SendGrid, Mailgun, or AWS SES
    }

    /**
     * Send cancellation email (simulation)
     */
    sendCancellationEmail(subscription, reason) {
        console.log('Cancellation email sent for subscription:', subscription.id, 'Reason:', reason);
    }

    /**
     * Handle webhook events (for real payment processor integration)
     */
    handleWebhook(event) {
        switch (event.type) {
            case 'invoice.payment_succeeded':
                this.handlePaymentSucceeded(event.data.object);
                break;
            case 'invoice.payment_failed':
                this.handlePaymentFailed(event.data.object);
                break;
            case 'customer.subscription.deleted':
                this.handleSubscriptionDeleted(event.data.object);
                break;
            default:
                console.log('Unhandled webhook event:', event.type);
        }
    }

    /**
     * Handle successful payment
     */
    handlePaymentSucceeded(invoice) {
        console.log('Payment succeeded:', invoice.id);
        
        // Update subscription status
        // Send receipt email
        // Update billing history
    }

    /**
     * Handle failed payment
     */
    handlePaymentFailed(invoice) {
        console.log('Payment failed:', invoice.id);
        
        // Notify customer
        // Retry payment
        // Suspend service if needed
    }

    /**
     * Handle subscription deletion
     */
    handleSubscriptionDeleted(subscription) {
        console.log('Subscription deleted:', subscription.id);
        
        // Downgrade to free plan
        // Send confirmation email
    }

    /**
     * Load subscription from storage
     */
    loadSubscription() {
        return storage.get('currentSubscription', {
            id: 'free_default',
            planId: 'free',
            planName: 'Free Plan',
            status: 'active',
            startDate: new Date().toISOString(),
            nextBillingDate: null,
            amount: 0,
            currency: 'USD',
            wordLimit: 50,
            features: this.plans.free.features
        });
    }

    /**
     * Save subscription to storage
     */
    saveSubscription() {
        storage.set('currentSubscription', this.currentSubscription);
    }

    /**
     * Load billing history from storage
     */
    loadBillingHistory() {
        return storage.get('billingHistory', []);
    }

    /**
     * Save billing history to storage
     */
    saveBillingHistory() {
        storage.set('billingHistory', this.billingHistory);
    }

    /**
     * Save payment methods to storage
     */
    savePaymentMethods() {
        storage.set('paymentMethods', this.paymentMethods);
    }

    /**
     * Get subscription status for UI
     */
    getStatusForUI() {
        const subscription = this.currentSubscription;
        const usage = this.getTodayUsage();
        const plan = this.getPlan(subscription.planId);

        return {
            planName: plan.name,
            planId: plan.id,
            status: subscription.status,
            wordsUsed: usage,
            wordLimit: plan.wordLimit,
            wordsRemaining: plan.wordLimit - usage,
            usagePercentage: Math.round((usage / plan.wordLimit) * 100),
            nextBillingDate: subscription.nextBillingDate,
            amount: subscription.amount,
            currency: subscription.currency,
            features: plan.features
        };
    }
}

// Create global instance
const subscriptionManager = new SubscriptionManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubscriptionManager;
}