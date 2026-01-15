# Quick Start Guide

Get started with the Infographic Generator in minutes!

## 🌐 Web Interface (Easiest)

1. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

2. **Create your first infographic**
   - Click "Load Example" to see a demo
   - Or paste your own content in the editor
   - Select a theme (Vintage, Modern, Minimal, or Corporate)
   - Click "Generate Infographic"

3. **Export your work**
   - Click "Export HTML" to download a standalone file
   - Share it with anyone - it works offline!

## 💻 Command Line (Python)

### Basic Example

```bash
# Create a simple markdown file
cat > my-article.md << 'EOF'
# My First Infographic
### A simple example to get started

## Introduction
Welcome to the infographic generator!

## Key Features
- Easy to use
- Multiple themes
- Beautiful output

> Made with the Infographic Generator
EOF

# Generate HTML
python3 infographic_generator.py my-article.md -o my-infographic.html

# Open in browser
open my-infographic.html
```

### Using Different Themes

```bash
# Vintage theme (default)
python3 infographic_generator.py article.md -o output.html -t vintage

# Modern theme
python3 infographic_generator.py article.md -o output.html -t modern

# Minimal theme
python3 infographic_generator.py article.md -o output.html -t minimal

# Corporate theme
python3 infographic_generator.py article.md -o output.html -t corporate
```

### Try the Examples

```bash
# Shadow IT example (like the reference image)
python3 infographic_generator.py src/examples/shadow-it-example.md -o shadow-it.html

# Tech trends
python3 infographic_generator.py src/examples/tech-trends-example.md -o tech-trends.html -t modern

# Business report
python3 infographic_generator.py src/examples/business-report-example.json -o business.html -t corporate

# Climate action
python3 infographic_generator.py src/examples/climate-action-example.md -o climate.html
```

## 📝 Creating Content

### Markdown Format (Recommended)

```markdown
[HEADER] Optional header text

# Main Title

### Subtitle or description

## First Section
Your content here with **bold** and *italic* formatting.

## Second Section
- Bullet point 1
- Bullet point 2
- Bullet point 3

> Footer quote or text
```

### JSON Format (Advanced)

```json
{
  "header": "Optional Header",
  "title": "Your Title",
  "subtitle": "Your subtitle",
  "sections": [
    {
      "title": "Section Name",
      "content": "Section content with **bold** text",
      "style": "default"
    }
  ],
  "footer": "Footer text",
  "theme": "vintage"
}
```

## 🎨 Choosing a Theme

- **Vintage**: Classic, paper-like design (great for historical topics)
- **Modern**: Bold gradients and contemporary look (perfect for tech)
- **Minimal**: Clean and professional (ideal for business)
- **Corporate**: Professional blue/gold scheme (reports and presentations)

## ✨ Tips for Great Infographics

1. **Keep titles short and punchy** - Under 10 words works best
2. **Use bullet points liberally** - Easier to scan than paragraphs
3. **Limit sections to 3-5** - Too many sections can be overwhelming
4. **Bold key phrases** - Use **bold** for important points
5. **Add a compelling subtitle** - Sets context for your infographic
6. **End with a call to action** - Use the footer for a quote or CTA

## 🚀 Next Steps

- Explore all the examples in `src/examples/`
- Read the full documentation in `README.md`
- Customize themes in `src/css/infographic.css`
- Share your creations!

## 💡 Common Patterns

### Report Template
```markdown
[HEADER] Q4 2025 Report

# Quarterly Performance

### Key metrics and achievements for Q4

## Revenue Growth
We achieved **47% growth** this quarter:
- New customers: $4.2M
- Existing customers: $2.9M

## Next Steps
- Expand to new markets
- Launch new product line

> Together, we're building the future
```

### Announcement Template
```markdown
# Important Announcement

### What you need to know about upcoming changes

## What's Changing
Description of changes...

## When It Happens
Timeline information...

## How to Prepare
- Action item 1
- Action item 2

> Questions? Contact us at info@example.com
```

### Educational Template
```markdown
# Learn About Topic X

### A beginner's guide to understanding Topic X

## What Is It?
Basic explanation...

## Why Does It Matter?
Importance and relevance...

## How to Get Started
- Step 1
- Step 2
- Step 3

> Keep learning, keep growing
```

## 🎯 Ready to Create?

Open `index.html` or use the Python CLI and start creating beautiful infographics!
