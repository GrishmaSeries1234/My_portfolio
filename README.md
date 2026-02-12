# Grishma Bhurtyal - Portfolio Website

A modern, dark-themed portfolio website for Er. Grishma Bhurtyal, showcasing expertise in AI, Machine Learning, and Data Science with stunning animations and interactive features.

## 🌟 Features

### Design & Aesthetics
- ✨ **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- 🎨 **Neural Network Background** - Animated particle system with connecting nodes
- 🌈 **Gradient Accents** - Cyan and purple gradients throughout
- 💫 **Glassmorphism Effects** - Modern frosted glass design elements
- 🎭 **Smooth Animations** - Fade-ins, slide-ins, and parallax effects
- 📱 **Fully Responsive** - Perfect on all devices (mobile, tablet, desktop)

### Interactive Features
- ⌨️ **Typing Effect** - Animated role titles in hero section
- 📊 **Animated Counters** - Statistics that count up on scroll
- 📈 **Skill Progress Bars** - Animated skill level indicators
- 🔍 **Project Filtering** - Filter projects by category (All, ML, Research, IoT)
- 📧 **Contact Form** - Real-time validation with error messages
- 📄 **Resume Download** - One-click resume download button
- ⬆️ **Back to Top** - Smooth scroll-to-top button
- 📜 **Scroll Progress** - Visual indicator at top of page

### Technical Features
- 🎯 **Smooth Scrolling** - Navigate sections smoothly
- 🔗 **Active Navigation** - Auto-updates based on scroll position
- 📱 **Mobile Menu** - Hamburger menu for mobile devices
- ⚡ **Performance Optimized** - Throttled/debounced scroll events
- 🎨 **No Dependencies** - Pure vanilla JavaScript (no jQuery)
- ♿ **Accessibility** - ARIA labels and semantic HTML
- 🔍 **SEO Optimized** - Meta tags and structured data

## 📁 File Structure

```
portfolio/
│
├── index.html          # Main HTML structure (1160 lines)
├── styles.css          # Complete styling & responsive design (1893 lines)
├── script.js           # All interactive functionality (680+ lines)
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Setup Files

Create a folder for your portfolio and add these three files:
- `index.html`
- `styles.css`
- `script.js`

### 2. Add Your Profile Photo

**Option A: Local Image**
```html
<!-- In index.html, find line ~450 and uncomment: -->
<img src="profile.jpg" alt="Er. Grishma Bhurtyal" class="profile-img">

<!-- Then delete the placeholder: -->
<!-- <div class="profile-placeholder">GB</div> -->
```

**Option B: Online URL**
```html
<img src="https://your-image-url.com/photo.jpg" alt="Er. Grishma Bhurtyal" class="profile-img">
```

**Recommended Image Specs:**
- Format: JPG or PNG
- Size: 800x800 pixels (square)
- File size: Under 500KB
- Style: Professional headshot

### 3. Add Project Images

Replace placeholder images in the projects section:
```html
<!-- Find in index.html: -->
<img src="https://via.placeholder.com/600x400/..." alt="Project Name">

<!-- Replace with: -->
<img src="assets/images/project-name.jpg" alt="Project Name">
```

### 4. Add Your Resume

1. Create an `assets` folder
2. Add your resume as `Grishma_Bhurtyal_Resume.pdf`
3. Update the path in `script.js` (line ~580):
```javascript
const resumePath = 'assets/Grishma_Bhurtyal_Resume.pdf';
```

### 5. Update Links

Update social media and project links in `index.html`:

**Social Media (lines ~1070-1080):**
```html
<a href="https://linkedin.com/in/your-profile" class="social-icon">
<a href="https://github.com/your-username" class="social-icon">
<a href="https://twitter.com/your-handle" class="social-icon">
```

**Project Links (in project cards):**
```html
<a href="https://github.com/your-repo" class="project-link">
<a href="https://your-demo-url.com" class="project-link">
```

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css` (lines 14-35):

```css
:root {
    /* Change primary colors */
    --accent-cyan: #00f5ff;      /* Main accent color */
    --accent-purple: #b45aff;    /* Secondary accent */
    --accent-blue: #3d5eff;      /* Tertiary accent */
    
    /* Change background colors */
    --primary-bg: #0a0e27;       /* Main background */
    --secondary-bg: #151b3d;     /* Card backgrounds */
}
```

### Fonts

The portfolio uses three fonts from Google Fonts:
- **Orbitron** - Headings (futuristic tech look)
- **Space Grotesk** - Body text
- **JetBrains Mono** - Code snippets

To change fonts, update the Google Fonts link in `index.html` (line 28) and CSS variables (lines 44-46).

### Content

**Update Personal Information:**
1. Search for "summerbhurtyal987@gmail.com" and replace with your email
2. Search for "+977 9800713343" and replace with your phone
3. Search for "Nawalpur, Nepal" and replace with your location
4. Update education, experience, and project details in respective sections

**Typing Effect Text:**
Edit the text array in `script.js` (lines 222-228):
```javascript
const texts = [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
];
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🌐 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Opera (latest version)

## ⚡ Performance Tips

1. **Optimize Images**: Compress all images before upload
2. **Use WebP Format**: Convert images to WebP for better compression
3. **Enable Caching**: Configure server to cache static assets
4. **Minify Files**: Use minification tools for production
5. **Use CDN**: Host images on a CDN for faster loading

## 🔧 Troubleshooting

### Theme Toggle Not Working
- Check browser console for errors
- Ensure `script.js` is loaded properly
- Clear localStorage: `localStorage.clear()`

### Navigation Not Scrolling Smoothly
- Check if all section IDs match navigation hrefs
- Ensure `scroll-behavior: smooth` is not overridden

### Neural Network Not Showing
- Check browser console for canvas errors
- Ensure canvas element exists in HTML
- Try disabling browser extensions

### Form Not Submitting
- Check browser console for validation errors
- Update form submission endpoint in `script.js`
- Ensure all required fields have proper validation

## 📊 Analytics Integration

To add Google Analytics:

1. Get your tracking ID from Google Analytics
2. Add this before `</head>` in `index.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## 🚀 Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at: `https://username.github.io/repo-name`

### Netlify

1. Create a Netlify account
2. Drag and drop your folder
3. Your site is live instantly!

### Custom Domain

1. Purchase a domain (e.g., from Namecheap, GoDaddy)
2. Point domain to your hosting provider
3. Update DNS settings (A records or CNAME)
4. Enable HTTPS/SSL certificate

## 📝 License

This portfolio template is free to use for personal projects. Please provide attribution when possible.

## 💼 Contact Form Backend

The contact form requires a backend to actually send emails. Options include:

**Option 1: Formspree** (Free tier available)
```html
<form action="https://formspree.io/f/YOUR-ID" method="POST">
```

**Option 2: Netlify Forms** (If hosted on Netlify)
```html
<form name="contact" netlify>
```

**Option 3: EmailJS** (JavaScript email service)
```javascript
// Add EmailJS SDK and configure
emailjs.send('service_id', 'template_id', formData);
```

## 🎯 Next Steps

1. ✅ Add your profile photo
2. ✅ Update all personal information
3. ✅ Add your resume PDF
4. ✅ Replace project images
5. ✅ Update social media links
6. ✅ Customize colors (optional)
7. ✅ Test on mobile devices
8. ✅ Deploy to hosting platform
9. ✅ Share with the world! 🌟

## 📞 Support

For questions or issues:
- Email: summerbhurtyal987@gmail.com
- GitHub: [Create an issue]

---

**Built with ❤️ for showcasing AI & ML expertise**

Last Updated: February 2025