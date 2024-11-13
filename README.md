# AI-Powered Product Recommendation System

A sophisticated, real-time product recommendation engine that suggests complementary items based on shopping cart contents. The system uses relationship-based scoring to provide intelligent product suggestions with confidence ratings.

## Features

- 🚀 Real-time recommendations based on cart contents
- 💡 Smart scoring system with confidence ratings
- 🎯 Product relationship mapping
- 🎨 Modern, responsive UI with glassmorphic design
- ⚡ Instant updates and notifications
- 📱 Mobile-friendly interface

## Technology Stack

- Pure JavaScript (ES6+)
- HTML5/CSS3
- FontAwesome Icons
- Tailwind CSS for styling
- Custom glassmorphic UI components

## Core Components

### RecommendationSystem Class

The heart of the recommendation engine with the following key methods:

- `addItem(item)`: Adds an item to the cart and updates recommendations
- `removeItem(item)`: Removes an item from the cart
- `getCart()`: Returns current cart contents
- `getRecommendations()`: Generates weighted recommendations based on cart items
- `clearCart()`: Resets the cart to empty state

### Product Relations Database

A pre-defined relationship mapping between products that serves as the foundation for recommendations. Current categories include:

- Food and produce (tomatoes, potatoes, etc.)
- Beverages (coffee, beer)
- Snacks and convenience items
- Electronics and accessories

## How It Works

1. **Data Structure**: Uses a Map-based system to track relationship strengths between products
2. **Scoring Algorithm**: 
   - Calculates recommendation scores based on relationship frequency
   - Generates confidence percentages based on cart size
   - Sorts recommendations by relevance

3. **UI Updates**: 
   - Real-time cart management
   - Dynamic recommendation display
   - Interactive notification system

## Usage

### Basic Implementation

```javascript
// Initialize the recommendation system
const recommender = new RecommendationSystem();

// Add items to cart
recommender.addItem('tomato');
recommender.addItem('onion');

// Get recommendations
const suggestions = recommender.getRecommendations();
```

### UI Integration

The system includes built-in UI functions:

```javascript
// Add item to cart with UI update
addItemToCart('tomato');

// Remove item from cart
removeItem('tomato');

// Clear entire cart
clearCart();
```

### Notification System

Includes a built-in notification system with four types:
- Success (green)
- Warning (yellow)
- Error (red)
- Info (blue)

```javascript
showNotification('Item added to cart!', 'success');
```

## Customization

### Adding New Product Relations

Extend the `productRelations` object to add new product relationships:

```javascript
const productRelations = {
    'newProduct': ['related1', 'related2', 'related3'],
    // ... existing relations
};
```

### Styling

The project uses Tailwind CSS classes with custom glassmorphic effects. Modify the CSS classes in the `updateUI` function to customize the appearance.

## Best Practices

1. Always use lowercase for product names when adding to cart
2. Maintain consistent relationship mappings for better recommendations
3. Consider cart size when evaluating confidence scores
4. Handle UI updates through the provided update functions

## Future Enhancements

- [ ] Machine learning integration for dynamic relationship scoring
- [ ] User preference tracking
- [ ] Category-based filtering
- [ ] Historical purchase analysis
- [ ] A/B testing support
- [ ] Extended product database
- [ ] Custom relationship strength definitions

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open-source and available under the MIT License.
