# 📊 Infographic Generator

Transform articles and reports into stunning visual infographics with ease.

![Infographic Generator](https://img.shields.io/badge/Version-1.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Multiple Input Formats**: Support for Markdown, JSON, and Plain Text
- **4 Beautiful Themes**: Vintage, Modern, Minimal, and Corporate styles
- **Web-Based Editor**: Interactive interface for real-time preview
- **Python CLI**: Command-line tool for batch processing
- **Export to HTML**: Download standalone HTML files
- **Responsive Design**: Looks great on all devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## 🚀 Quick Start

### Web Interface

1. Open `index.html` in your web browser
2. Enter your content in the editor
3. Select a theme from the dropdown
4. Click "Generate Infographic"
5. Export as HTML if needed

### Python CLI

```bash
# Basic usage
python3 infographic_generator.py article.md -o infographic.html

# Specify theme
python3 infographic_generator.py article.md -o output.html -t modern

# Output JSON instead of HTML
python3 infographic_generator.py article.md -j

# Read from stdin
cat article.txt | python3 infographic_generator.py - -o output.html
```

## 📝 Input Formats

### Markdown

```markdown
[HEADER] Optional header text

# Main Title
### Subtitle or tagline

## Section 1
Your content here with **bold** and *italic* text.

## Section 2
- Bullet point 1
- Bullet point 2
- Bullet point 3

> Footer text or quote
```

### JSON

```json
{
  "header": "Optional Header",
  "title": "Main Title",
  "subtitle": "Subtitle text",
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content...",
      "style": "default"
    }
  ],
  "footer": "Footer text",
  "theme": "vintage"
}
```

### Plain Text

```
Main Title

Subtitle or introduction paragraph

Section 1 Title
This is the content for section 1.

Section 2 Title
This is the content for section 2.
```

## 🎨 Themes

### Vintage Theme
Classic, paper-like aesthetic with sepia tones and vintage typography. Perfect for historical content or nostalgic presentations.

### Modern Theme
Bold gradients and contemporary design with glassmorphism effects. Ideal for tech and innovation topics.

### Minimal Theme
Clean, simple design focusing on content with minimal distractions. Great for professional reports.

### Corporate Theme
Professional blue and gold color scheme for business presentations and corporate reports.

## 📂 Project Structure

```
Visualizations/
├── index.html                      # Web interface
├── infographic_generator.py        # Python CLI tool
├── README.md                       # This file
├── src/
│   ├── css/
│   │   ├── infographic.css         # Infographic styles
│   │   └── editor.css              # Editor interface styles
│   ├── js/
│   │   ├── infographic-renderer.js # Rendering engine
│   │   └── app.js                  # Application logic
│   ├── templates/                  # HTML templates
│   └── examples/                   # Example files
│       ├── shadow-it-example.md
│       ├── tech-trends-example.md
│       ├── business-report-example.json
│       └── climate-action-example.md
└── assets/
    └── images/                     # Image assets
```

## 🎯 Usage Examples

### Example 1: Shadow IT Report

Based on the GAMMA presentation format:

```markdown
[HEADER] A GAMMA presentation

# THE REALITY: Shadow IT is Happening Now

### 'Vibe Codity' and Shadow IT are emerging use unvetted AI tools to solve real problems.

## VIBE CODING
**AI Driving Itself**
Teachers are using AI coding assistants without proper oversight.

## SHADOW IT
**All Socune**
Invisible tech footprint expanding beyond IT department visibility.

> Teachers use unvetted AI to solve problems
```

### Example 2: Business Report

```bash
python3 infographic_generator.py src/examples/business-report-example.json \
  -o quarterly-report.html \
  -t corporate
```

### Example 3: Climate Action

```bash
python3 infographic_generator.py src/examples/climate-action-example.md \
  -o climate-action.html \
  -t modern
```

## ⚙️ Advanced Configuration

### Section Styles

Available section styles:
- `default`: Standard section appearance
- `highlight`: Emphasized section (yellow/gold accent)
- `warning`: Warning section (red accent)
- `info`: Information section (blue accent)

### Custom Styling

You can customize themes by editing `src/css/infographic.css`. Each theme has its own CSS class:

```css
.theme-vintage { /* ... */ }
.theme-modern { /* ... */ }
.theme-minimal { /* ... */ }
.theme-corporate { /* ... */ }
```

## 🔧 Requirements

### Web Interface
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required (fully offline)

### Python CLI
- Python 3.6 or higher
- No external dependencies required

## 📱 Responsive Design

Infographics automatically adapt to different screen sizes:
- Desktop: Full layout with all features
- Tablet: Optimized for touch interaction
- Mobile: Single-column layout for easy reading

## 🖨️ Print Support

Infographics are print-ready:
```css
@media print {
  /* Optimized for printing */
}
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. Add new themes
2. Improve parsing algorithms
3. Add new export formats (PDF, PNG, SVG)
4. Enhance documentation
5. Report bugs or suggest features

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🎓 Use Cases

- **Education**: Create engaging educational materials
- **Business**: Design professional reports and presentations
- **Marketing**: Build compelling infographics for campaigns
- **Research**: Visualize research findings and data
- **Journalism**: Present stories in visual format
- **Non-profit**: Create awareness materials

## 💡 Tips & Tricks

1. **Keep it concise**: Infographics work best with focused content
2. **Use bullet points**: They're easier to scan than paragraphs
3. **Choose the right theme**: Match the theme to your content type
4. **Test different formats**: Try markdown vs JSON to see what works better
5. **Preview often**: Use the web interface to iterate quickly
6. **Export for sharing**: HTML files can be easily shared and viewed

## 🐛 Troubleshooting

### Infographic not generating
- Check that your content follows the format guidelines
- Verify JSON syntax if using JSON format
- Look for error messages in the browser console

### Styling issues
- Clear browser cache and reload
- Check that CSS files are in the correct location
- Verify theme selector matches available themes

### Export not working
- Ensure you've generated an infographic first
- Check browser download settings
- Try a different browser if issues persist

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing examples in `src/examples/`
- Review the documentation above

## 🌟 Acknowledgments

Inspired by great infographic tools and designed to be simple, effective, and beautiful.

---

**Made with ♥ for better visual communication**
