# Auraliss - Coming Soon Page

A minimalist, professional "Coming Soon" page for Auraliss - Intelligent Automation company.

## 🚀 Features

- **Dynamic Slogan**: Text rotates between "Outcome", "Productivity", and "Uptime" every 3 seconds
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations**: Professional fade-in, slide, and bounce animations
- **Email Collection**: Interactive email subscription form with validation
- **Modern UI**: Clean, minimalist design with premium aesthetics
- **Social Links**: Integrated social media icons for LinkedIn, Twitter, and Facebook

## 📁 Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with modern design system
├── script.js           # JavaScript for dynamic functionality
├── assets/
│   └── logo.svg        # Auraliss logo (SVG format)
└── README.md          # This file
```

## 🎨 Color Palette

- **Primary Blue**: #0091D4 (Main brand color)
- **Secondary Blue**: #00B8D9 (Hover effects)
- **Accent Orange**: #FF7F32 (Highlights)
- **Text Primary**: #1D1D1B (Headings)
- **Text Secondary**: #8C8C8C (Body text)
- **Background**: #FFFFFF (Main)
- **Background Secondary**: #F5F5F5 (Footer)

## 🛠️ How to Use

### Option 1: Open Directly
1. Navigate to the `website` folder
2. Double-click `index.html` to open in your default browser

### Option 2: Use a Local Server (Recommended)
```bash
# Using Python 3
cd website
python -m http.server 8000

# Using Node.js (with npx)
cd website
npx serve

# Using PHP
cd website
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## ✨ Key Components

### Dynamic Text Animation
The slogan "Intelligent Automation. Engineered for [Dynamic Text]" cycles through three phrases:
- Outcome
- Productivity  
- Uptime

### Interactive Elements
- **Notify Me Button**: Clicks reveal email subscription form
- **Login Button**: Located in top-right corner (currently shows alert)
- **Email Form**: Includes validation and success message
- **Social Links**: Hover effects with smooth transitions

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Full layout)
- **Tablet**: 481px - 768px (Adjusted spacing and font sizes)
- **Mobile**: ≤ 480px (Stacked layout, smaller text)

## 🔧 Customization

### Update Dynamic Text
Edit the `phrases` array in `script.js`:
```javascript
const phrases = ['Outcome', 'Productivity', 'Uptime'];
```

### Change Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --color-primary-blue: #0091D4;
    --color-secondary-blue: #00B8D9;
    --color-accent-orange: #FF7F32;
    /* ... */
}
```

### Update Logo
Replace `assets/logo.svg` with your own logo file (PNG, SVG, or other image format)

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 Notes

- Email submissions are currently logged to console (no backend integration)
- Login button shows an alert (integrate with your authentication system)
- Social media links are placeholders (update href attributes)

## 🚀 Next Steps

1. **Backend Integration**: Connect email form to your newsletter service (e.g., Mailchimp, SendGrid)
2. **Analytics**: Add Google Analytics or similar tracking
3. **SEO**: Add meta tags, Open Graph tags for social sharing
4. **Real Logo**: Replace SVG logo with your final brand logo
5. **Authentication**: Integrate login button with your auth system

## 💡 Tips

- Test on multiple devices and browsers
- Optimize images for web (if adding more assets)
- Consider adding a favicon
- Set up proper 404 and error pages when deploying

## 📄 License

Created for Auraliss - All rights reserved

---

**Made with ❤️ for Auraliss - Intelligent Automation**
