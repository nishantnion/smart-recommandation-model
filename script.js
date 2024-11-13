// Product Relations
const productRelations = {
    'tomato': ['onion', 'garlic', 'bell pepper', 'cucumber', 'chili', 'cilantro', 'olive oil', 'basil'],
    'potato': ['onion', 'garlic', 'carrot', 'peas', 'ginger', 'turmeric', 'butter', 'rosemary'],
    'onion': ['tomato', 'potato', 'garlic', 'ginger', 'chili', 'coriander', 'olive oil', 'bay leaves'],
    'rice': ['beans', 'vegetables', 'spices', 'oil', 'lentils', 'curry', 'soy sauce', 'stock'],
    'bread': ['butter', 'jam', 'eggs', 'cheese', 'nutella', 'peanut butter', 'honey', 'avocado'],
    'coffee': ['sugar', 'creamer', 'cookies', 'milk', 'chocolate', 'honey', 'cinnamon', 'vanilla'],
    'chips': ['soda', 'dip', 'nuts', 'candy', 'popcorn', 'chocolate', 'salsa', 'guacamole'],
    'beer': ['snacks', 'chips', 'peanuts', 'ice', 'lime', 'pretzels', 'nachos', 'wings'],
    'smartphone': ['charger', 'earphones', 'screen protector', 'case', 'power bank', 'stand', 'cable', 'holder']
};

class RecommendationSystem {
    constructor(relationDatabase = productRelations) {
        this.relations = relationDatabase;
        this.cart = new Set();
    }

    addItem(item) {
        item = item.toLowerCase();
        this.cart.add(item);
        return this.getRecommendations();
    }

    removeItem(item) {
        item = item.toLowerCase();
        this.cart.delete(item);
        return this.getRecommendations();
    }

    getCart() {
        return Array.from(this.cart);
    }

    getRecommendations() {
        const recommendations = new Map();

        this.cart.forEach(cartItem => {
            if (this.relations[cartItem]) {
                this.relations[cartItem].forEach(relatedItem => {
                    if (!this.cart.has(relatedItem)) {
                        recommendations.set(
                            relatedItem,
                            (recommendations.get(relatedItem) || 0) + 1
                        );
                    }
                });
            }
        });

        return Array.from(recommendations.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([item, count]) => ({
                item,
                score: count,
                confidence: `${((count / this.cart.size) * 100).toFixed(1)}%`
            }));
    }

    clearCart() {
        this.cart.clear();
        return this;
    }
}

const recommender = new RecommendationSystem();
const itemInput = document.getElementById('itemInput');
const cartItems = document.getElementById('cartItems');
const recommendationsDiv = document.getElementById('recommendations');
const cartCount = document.getElementById('cartCount');
const recCount = document.getElementById('recCount');


// Update the updateUI function to match new design
function updateUI() {
    // Update cart display
    cartItems.innerHTML = '';
    const cart = recommender.getCart();
    cartCount.textContent = `${cart.length} items`;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'glass-card rounded-2xl p-4 flex items-center justify-between transition-all hover:bg-white/5';
        itemElement.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-10 h-10 glass-card rounded-xl flex items-center justify-center">
                    <i class="fas fa-shopping-bag text-blue-400"></i>
                </span>
                <span class="text-lg text-white capitalize">${item}</span>
            </div>
            <button onclick="removeItem('${item}')" 
                    class="p-2 hover:bg-white/10 rounded-xl transition-colors group">
                <i class="fas fa-times text-red-400 group-hover:text-red-300"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
    });

    // Update recommendations
    recommendationsDiv.innerHTML = '';
    const recommendations = recommender.getRecommendations();
    recCount.textContent = `${recommendations.length} suggestions`;
    
    if (recommendations.length === 0 && cart.length === 0) {
        recommendationsDiv.innerHTML = `
            <div class="text-center py-12">
                <div class="w-20 h-20 glass-card rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i class="fas fa-magic text-2xl text-purple-400"></i>
                </div>
                <p class="text-lg text-white/80">Add items to your cart to see AI recommendations</p>
            </div>
        `;
        return;
    }

    recommendations.forEach(rec => {
        const confidence = parseFloat(rec.confidence);
        const recElement = document.createElement('div');
        recElement.className = 'glass-card rounded-2xl p-6 hover:bg-white/5 transition-all';
        recElement.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    <span class="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                        <i class="fas fa-star text-purple-400"></i>
                    </span>
                    <div>
                        <h3 class="text-xl font-medium text-white capitalize">${rec.item}</h3>
                        <p class="text-blue-300 text-sm">Based on your cart</p>
                    </div>
                </div>
                <button onclick="addItemToCart('${rec.item}')" 
                        class="px-6 py-2 glass-card rounded-xl text-white 
                               hover:bg-white/10 transition-all flex items-center gap-2">
                    <i class="fas fa-plus"></i>
                    Add
                </button>
            </div>
            <div class="relative w-full h-2 glass-card rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all"
                     style="width: ${rec.confidence};"></div>
            </div>
            <div class="flex justify-between items-center mt-3">
                <span class="text-sm text-blue-300">Match Score</span>
                <span class="text-sm font-medium text-white">${rec.confidence}</span>
            </div>
        `;
        recommendationsDiv.appendChild(recElement);
    });
}


function addItemToCart(suggestedItem = '') {
    const itemToAdd = suggestedItem || itemInput.value.trim();
    
    if (!itemToAdd) return;

    // Convert to lowercase for consistency
    const normalizedItem = itemToAdd.toLowerCase();
    
    // Don't add if item is already in cart
    if (recommender.getCart().includes(normalizedItem)) {
        showNotification('Item already in cart!', 'warning');
        return;
    }

    // Add item and get updated recommendations
    recommender.addItem(normalizedItem);
    
    // Clear input if it was manually entered
    if (!suggestedItem) {
        itemInput.value = '';
    }
    
    // Update the UI
    updateUI();
    showNotification('Item added to cart!', 'success');
}

function removeItem(item) {
    recommender.removeItem(item);
    updateUI();
    showNotification('Item removed from cart!', 'info');
}

function clearCart() {
    recommender.clearCart();
    updateUI();
    showNotification('Cart cleared!', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg 
                            animate-slide-up glassmorphism z-50 
                            ${getNotificationStyle(type)}`;
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="${getNotificationIcon(type)}"></i>
            <span class="text-white">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationStyle(type) {
    const styles = {
        success: 'border-green-400/50',
        warning: 'border-yellow-400/50',
        error: 'border-red-400/50',
        info: 'border-blue-400/50'
    };
    return styles[type] || styles.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle text-green-400',
        warning: 'fas fa-exclamation-triangle text-yellow-400',
        error: 'fas fa-times-circle text-red-400',
        info: 'fas fa-info-circle text-blue-400'
    };
    return icons[type] || icons.info;
}