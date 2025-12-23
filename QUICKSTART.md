# 🚀 Quick Start Guide - Auraliss Coming Soon Page

## Your Website is Ready! 

The "Coming Soon" page for Auraliss has been successfully created in the `website` folder.

## ✅ Files Created

- ✓ `index.html` - Main HTML page
- ✓ `styles.css` - Stylesheet with modern design
- ✓ `script.js` - JavaScript for dynamic features
- ✓ `assets/logo.png` - Your Auraliss logo
- ✓ `README.md` - Detailed documentation

## 🎯 How to View

### Option 1: Double-Click (Simplest)
Just double-click `index.html` to open in your browser

### Option 2: Local Server (Best for Testing)
```bash
cd website
python -m http.server 8000
```
Then visit: http://localhost:8000

## 🌟 Features Included

### 1. **Dynamic Slogan** ⚡
   - Automatically rotates text every 3 seconds
   - "Engineered for Outcome/Productivity/Uptime"

### 2. **Interactive Email Form** 📧
   - Click "Notify Me" to reveal email input
   - Includes email validation
   - Shows success message after submission

### 3. **Login Button** 🔐
   - Top-right corner
   - Ready for your authentication integration

### 4. **Responsive Design** 📱
   - Works perfectly on desktop, tablet, and mobile
   - Professional animations throughout

### 5. **Social Media Links** 🌐
   - LinkedIn, Twitter, Facebook icons
   - Update the `href` attributes to your actual social profiles

## 🎨 What You'll See

- Clean white background
- Your custom logo in the header
- Smooth animations and transitions
- Professional blue color scheme (#0091D4)
- Minimalist footer with social icons

## 🔧 Quick Customizations

### Change the rotating words:
Edit `script.js`, line 3:
```javascript
const phrases = ['Your Word 1', 'Your Word 2', 'Your Word 3'];
```

### Update social media links:
Edit `index.html`, find the social icons section and update:
```html
<a href="YOUR_LINKEDIN_URL" class="social-link">
```

### Change colors:
Edit `styles.css`, update the CSS variables:
```css
--color-primary-blue: #0091D4;
--color-secondary-blue: #00B8D9;
```

## 📊 Technical Details

- **No dependencies** - Pure HTML, CSS, JavaScript
- **Lightweight** - Fast loading
- **Modern browsers** - Chrome, Firefox, Safari, Edge
- **SEO ready** - Semantic HTML structure

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload the `website` folder contents
3. Enable GitHub Pages in settings

### Netlify (Free)
1. Drag and drop the `website` folder to Netlify
2. Your site goes live instantly

### Vercel (Free)
1. Import your GitHub repository
2. Deploy with one click

## 📝 Next Steps

1. ✅ **Test locally** - Open index.html and test all features
2. 📧 **Backend integration** - Connect email form to your service
3. 🔐 **Login setup** - Integrate authentication
4. 🌐 **Deploy** - Choose a hosting platform
5. 📊 **Analytics** - Add Google Analytics or similar

## 💡 Tips

- The demo video shows the page in action
- Check README.md for detailed documentation
- Email submissions currently log to browser console
- Update privacy policy and terms of service links

## 🎉 Your Page is Live Locally!

Open `index.html` in your browser to see it in action!

---

**Questions or Issues?**
Check the detailed README.md in the website folder for more information.
