# NewsHub - Animation Documentation

## Overview
This document outlines all animations used throughout the NewsHub application, built with Framer Motion 11.0.0.

## CSS Animations

### Keyframe Animations (in `client/src/styles/index.css`)

#### 1. **Shimmer**
- **Usage**: Loading skeletons and placeholder states
- **Duration**: 2s infinite
- **Effect**: Opacity fade from 0.5 to 1.0
- **Class**: `.shimmer-animation`

#### 2. **Slide Up**
- **Usage**: Element entrance animations
- **Duration**: 0.6s ease-out
- **Effect**: Translates from 10px down to 0px with opacity fade
- **Class**: `.slide-up-animation`

#### 3. **Float**
- **Usage**: Floating UI elements (icons, badges)
- **Duration**: 3s ease-in-out infinite
- **Effect**: Y-axis oscillation ±10px
- **Class**: `.float-animation`

#### 4. **Pulse Glow**
- **Usage**: Interactive element emphasis
- **Duration**: 2s ease-in-out infinite
- **Effect**: Box-shadow expansion from 20px to 40px radius
- **Class**: `.pulse-glow-animation`

#### 5. **Gradient Shift**
- **Usage**: Gradient text animation
- **Duration**: 8s ease infinite
- **Effect**: Background position shift for gradient animation
- **Class**: `.gradient-shift-animation`

## Framer Motion Animations

### Page-Level Animations

#### Home Page
```jsx
// Background animated gradient blobs
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 8, repeat: Infinity }}
/>

// Hero title with gradient text
<h1 className="gradient-shift-animation">Stay Informed</h1>

// Floating introduction badge
animate={{ y: [0, -5, 0] }}
transition={{ duration: 4, repeat: Infinity }}

// Loading skeletons with staggered animation
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: i * 0.1 }}
```

#### Article Detail Page
```jsx
// Rotating loader spinner
animate={{ rotate: 360 }}
transition={{ duration: 1, repeat: Infinity }}

// Pulsing text during loading
animate={{ opacity: [0.5, 1, 0.5] }}
transition={{ duration: 1.5, repeat: Infinity }}

// Action buttons with hover effect
whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(var(--primary), 0.4)" }}
whileTap={{ scale: 0.98 }}
```

#### Bookmarks Page
```jsx
// Floating icon animation
animate={{ y: [0, -10, 0] }}
transition={{ duration: 3, repeat: Infinity }}

// Staggered grid layout
staggerChildren: 0.1
delayChildren: 0.2
```

### Component Animations

#### Header Component
```jsx
// Logo rotation on hover
whileHover={{ rotate: 10, scale: 1.1 }}
whileTap={{ scale: 0.95 }}

// Menu button rotation
animate={{ rotate: isOpen ? 90 : 0 }}
transition={{ duration: 0.3 }}

// Mobile menu slide-down
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

#### Article Card Component
```jsx
// Lift effect on hover
whileHover={{ y: -5 }}

// Image zoom on hover
whileHover={{ scale: 1.08 }}
transition={{ duration: 0.4 }}

// Staggered text animations
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: index * 0.1 + offset }}

// Bookmark button rotation on toggle
animate={isBookmarked ? { rotate: 360 } : {}}
transition={{ duration: 0.3 }}
```

#### Category Filter Component
```jsx
// Staggered button entrance
containerVariants: {
  staggerChildren: 0.05,
  delayChildren: 0.1
}

// Button hover with glow
whileHover={{ 
  scale: 1.05, 
  boxShadow: "0 8px 20px rgba(var(--primary), 0.2)" 
}}

// Active state letter spacing
animate={activeCategory === category ? { letterSpacing: "0.05em" } : {}}
```

#### Footer Component
```jsx
// Section staggered entrance
variants={containerVariants}
initial="hidden"
whileInView="visible"
viewport={{ once: true }}

// Link slide on hover
whileHover={{ x: 5 }}
transition={{ duration: 0.2 }}

// Social icons enhanced animation
whileHover={{ 
  scale: 1.15, 
  rotate: 5, 
  boxShadow: "0 10px 25px rgba(var(--primary), 0.4)" 
}}
whileTap={{ scale: 0.9 }}
```

#### Auth Modal Component
```jsx
// Spring animation entrance
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}

// Input focus effect
whileFocus={{ scale: 1.02 }}

// Form field conditional animation
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: "auto" }}

// Button loading spinner
animate={{ rotate: 360 }}
transition={{ duration: 1, repeat: Infinity }}
```

#### Featured Stats Component
```jsx
// Stat counter animation
initial={{ scale: 0.5, opacity: 0 }}
whileInView={{ scale: 1, opacity: 1 }}
transition={{ type: 'spring', stiffness: 100 }}

// Icon container rotation
whileHover={{ rotate: 10, scale: 1.1 }}

// Progress bar scale-in
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
style={{ originX: 0 }}
```

#### Trending Articles Component
```jsx
// Card lift and glow on hover
whileHover={{
  y: -8,
  boxShadow: '0 25px 50px rgba(var(--primary), 0.25)'
}}

// Rank badge spring animation
initial={{ scale: 0, rotate: -180 }}
whileInView={{ scale: 1, rotate: 0 }}
transition={{ type: 'spring', stiffness: 200 }}

// Image brightness effect on hover
whileHover={{ filter: 'brightness(1.15)' }}

// Category badge entrance on hover
initial={{ opacity: 0, y: 10 }}
whileHover={{ opacity: 1, y: 0 }}
```

#### Newsletter Section Component
```jsx
// Background gradient X-axis animation
animate={{ x: [0, 20, 0] }}
transition={{ duration: 8, repeat: Infinity }}

// Subscribe button with spring effect
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Success message slide-in
initial={{ y: -10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}

// Input and button scale on focus
whileFocus={{ scale: 1.02 }}
```

## Animation Timing Reference

| Duration | Use Case |
|----------|----------|
| 0.2s | Quick interactions (focus, simple hover) |
| 0.3s | Button clicks, menu toggles |
| 0.4s - 0.6s | Component entrance/exit |
| 0.8s - 1s | Page transitions, major animations |
| 2s - 3s | Continuous background animations |
| 4s - 8s | Slow floating/gradient shifts |

## Easing Functions

| Easing | Use Case |
|--------|----------|
| `ease-out` | Element entrance (decelerate) |
| `ease-in-out` | Continuous animations |
| `ease-linear` | Spinning/rotating animations |
| `spring` | Interactive UI responses (bouncy) |
| `default` | General smooth transitions |

## Animation Variants Pattern

### Container and Item Pattern
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

## Scroll-Triggered Animations

### WhileInView Implementation
```jsx
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
initial={{ opacity: 0, y: 20 }}
```

**Parameters:**
- `once: true` - Animation triggers only once
- `margin: '-100px'` - Trigger animation 100px before element enters viewport

## Hover and Tap Effects

### Standard Button Animation
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.2 }}
```

### Card Hover Effects
```jsx
whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(...)' }}
transition={{ duration: 0.3 }}
```

## Performance Optimization

### GPU-Accelerated Properties
- `transform` (scale, rotate, translateX/Y)
- `opacity`

### Avoided (CPU-Intensive)
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- Prefer `transform` and `scale` instead

### Viewport Management
```jsx
viewport={{ once: true }}  // Prevents re-animation on scroll
initial={{ opacity: 0 }}   // Prevents flash of unstyled content
```

## Responsive Animation Adjustments

### Mobile Considerations
- Reduce animation duration on mobile devices
- Disable continuous animations on low-power devices
- Use `prefers-reduced-motion` media query for accessibility

```jsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Animation Debugging

### Tips for Debugging Animations
1. **Slow down animations**: Set `transition={{ duration: 2 }}` temporarily
2. **Check initial states**: Ensure `initial` matches unseen state
3. **Use `exit` prop**: Define exit animations for proper cleanup
4. **Test on slow devices**: Ensure animations remain smooth

### Browser DevTools
- Chrome: Performance tab to check 60 FPS
- Firefox: Animation inspector for timeline visualization

## Accessibility Considerations

### Reducing Motion
Respect user preferences:
```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

<motion.div
  animate={prefersReducedMotion ? {} : animationState}
/>
```

### Animation Best Practices
- ✅ Animations enhance UX, not distract
- ✅ Keep animations under 1 second for interactions
- ✅ Provide visual feedback for all interactions
- ✅ Test with accessibility tools
- ❌ Avoid auto-playing animations that distract

## Future Animation Enhancements

1. **Page Transitions**: Animate between routes with smooth transitions
2. **Parallax Scrolling**: Background elements move at different speeds
3. **Gesture Animations**: Swipe and pinch animations for touch
4. **Advanced Loading**: More sophisticated skeleton animations
5. **Scroll Progress**: Animated progress bars for long content
6. **Drag and Drop**: Interactive drag animations for cards

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [CSS Animation Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Web Animation Performance](https://web.dev/animations/)
- [Accessibility & Motion](https://www.a11y-101.com/design/animations)

---

**Last Updated**: March 2026
**Animation Library**: Framer Motion 11.0.0
**Framework**: React 18.3.1
