/**
 * Main Application Logic
 * Handles UI interactions and coordinates infographic generation
 */

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new InfographicApp();
    app.init();
});

class InfographicApp {
    constructor() {
        this.renderer = new InfographicRenderer();
        this.currentFormat = 'markdown';
        this.elements = {};
    }

    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.loadExampleIfEmpty();
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            inputText: document.getElementById('input-text'),
            previewContainer: document.getElementById('preview-container'),
            themeSelector: document.getElementById('theme-selector'),
            generateBtn: document.getElementById('generate-btn'),
            exampleBtn: document.getElementById('example-btn'),
            exportBtn: document.getElementById('export-btn'),
            fullscreenBtn: document.getElementById('fullscreen-btn'),
            formatTabs: document.querySelectorAll('.tab-btn')
        };
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Generate button
        this.elements.generateBtn.addEventListener('click', () => {
            this.generateInfographic();
        });

        // Example button
        this.elements.exampleBtn.addEventListener('click', () => {
            this.loadExample();
        });

        // Export button
        this.elements.exportBtn.addEventListener('click', () => {
            this.exportInfographic();
        });

        // Fullscreen button
        this.elements.fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Theme selector
        this.elements.themeSelector.addEventListener('change', (e) => {
            this.renderer.currentTheme = e.target.value;
            if (this.renderer.currentData) {
                this.generateInfographic();
            }
        });

        // Format tabs
        this.elements.formatTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchFormat(e.target.dataset.format);
            });
        });

        // Auto-generate on Ctrl+Enter
        this.elements.inputText.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.generateInfographic();
            }
        });
    }

    /**
     * Switch input format
     */
    switchFormat(format) {
        this.currentFormat = format;

        // Update active tab
        this.elements.formatTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.format === format);
        });

        // Load appropriate example or placeholder
        if (!this.elements.inputText.value.trim()) {
            this.updatePlaceholder(format);
        }
    }

    /**
     * Update placeholder text based on format
     */
    updatePlaceholder(format) {
        const placeholders = {
            markdown: `Enter your content here...

Markdown Example:
# Main Title
### Subtitle or tagline

## Section 1
Your content here...

## Section 2
- Bullet point 1
- Bullet point 2

> Footer text or quote`,
            json: `{
  "header": "A GAMMA presentation",
  "title": "Your Infographic Title",
  "subtitle": "Your compelling subtitle here",
  "sections": [
    {
      "title": "Section 1",
      "content": "Your content here...",
      "style": "default"
    },
    {
      "title": "Section 2",
      "content": "More content...",
      "style": "highlight"
    }
  ],
  "footer": "Your footer text",
  "theme": "vintage"
}`,
            plain: `Your Main Title

Your subtitle or introduction paragraph

Section 1 Title
This is the content for section 1. It will be automatically formatted.

Section 2 Title
This is the content for section 2. The tool will detect paragraphs and structure.`
        };

        this.elements.inputText.placeholder = placeholders[format] || placeholders.markdown;
    }

    /**
     * Generate infographic from input
     */
    generateInfographic() {
        const text = this.elements.inputText.value.trim();

        if (!text) {
            this.showError('Please enter some content first');
            return;
        }

        try {
            // Parse based on current format
            let data;
            switch (this.currentFormat) {
                case 'json':
                    data = this.renderer.parseJSON(text);
                    break;
                case 'plain':
                    data = this.renderer.parsePlainText(text);
                    break;
                case 'markdown':
                default:
                    data = this.renderer.parseMarkdown(text);
                    break;
            }

            // Apply current theme
            data.theme = this.elements.themeSelector.value;

            // Render
            this.renderer.render(data, this.elements.previewContainer);

            // Show success
            this.showSuccess('Infographic generated successfully!');
        } catch (error) {
            this.showError('Error generating infographic: ' + error.message);
            console.error(error);
        }
    }

    /**
     * Load example content
     */
    loadExample() {
        const example = this.getExampleContent();
        this.elements.inputText.value = example;
        this.generateInfographic();
    }

    /**
     * Load example if textarea is empty on startup
     */
    loadExampleIfEmpty() {
        if (!this.elements.inputText.value.trim()) {
            // Don't auto-generate, just show helpful text
            this.updatePlaceholder('markdown');
        }
    }

    /**
     * Get example content based on the provided image
     */
    getExampleContent() {
        return `[HEADER] A GAMMA presentation

# THE REALITY: Shadow IT is Happening Now

### 'Vibe Codity' and Shadow IT are emerging use unvetted AI tools to solve real problems. With 6 districts understaffed this invisible tech footprint outside district oversight.

## VIBE CODING
**AI Driving Itself**

Teachers are using AI coding assistants without proper oversight, creating code and solutions autonomously. This leads to:

- Unvetted AI implementations
- Lack of quality control
- Security vulnerabilities
- No documentation standards

## SHADOW IT
**All Socune**

Invisible tech footprint expanding beyond IT department visibility and control. Key concerns:

- **6 districts** currently understaffed
- No centralized monitoring
- Compliance risks
- Data security gaps
- Budget tracking issues

> Teachers use unvetted AI to solve problems, creating tech footprint outside district oversight`;
    }

    /**
     * Export infographic as HTML
     */
    exportInfographic() {
        if (!this.renderer.currentData) {
            this.showError('Generate an infographic first before exporting');
            return;
        }

        try {
            const filename = this.sanitizeFilename(this.renderer.currentData.title) + '.html';
            this.renderer.downloadHTML(this.renderer.currentData, filename);
            this.showSuccess('Infographic exported successfully!');
        } catch (error) {
            this.showError('Error exporting infographic: ' + error.message);
            console.error(error);
        }
    }

    /**
     * Sanitize filename
     */
    sanitizeFilename(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 50) || 'infographic';
    }

    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
        const panel = this.elements.previewContainer.closest('.preview-panel');
        panel.classList.toggle('fullscreen');

        const btn = this.elements.fullscreenBtn;
        btn.textContent = panel.classList.contains('fullscreen') ? '✕' : '⛶';
    }

    /**
     * Show success message
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Show error message
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            backgroundColor: type === 'error' ? '#ff6b6b' : '#51cf66',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 10000,
            animation: 'slideIn 0.3s ease',
            maxWidth: '400px'
        });

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to document
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
}
