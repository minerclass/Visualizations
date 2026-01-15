/**
 * Infographic Renderer
 * Handles parsing and rendering of infographics from various formats
 */

class InfographicRenderer {
    constructor() {
        this.currentData = null;
        this.currentTheme = 'vintage';
    }

    /**
     * Parse markdown text into infographic data
     */
    parseMarkdown(text) {
        const lines = text.trim().split('\n');
        const data = {
            header: '',
            title: '',
            subtitle: '',
            sections: [],
            footer: '',
            theme: this.currentTheme
        };

        let currentSection = null;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // Parse headers
            if (line.startsWith('# ')) {
                data.title = line.substring(2).trim();
            } else if (line.startsWith('## ')) {
                if (currentSection) {
                    data.sections.push(currentSection);
                }
                currentSection = {
                    title: line.substring(3).trim(),
                    content: '',
                    style: 'default'
                };
            } else if (line.startsWith('### ')) {
                if (currentSection) {
                    currentSection.content += `\n**${line.substring(4).trim()}**\n`;
                } else {
                    data.subtitle = line.substring(4).trim();
                }
            } else if (line.startsWith('> ')) {
                const quote = line.substring(2).trim();
                if (!data.subtitle) {
                    data.subtitle = quote;
                } else {
                    data.footer = quote;
                }
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                if (currentSection) {
                    currentSection.content += line + '\n';
                } else {
                    if (!data.sections.find(s => s.title === 'Key Points')) {
                        data.sections.push({
                            title: 'Key Points',
                            content: line + '\n',
                            style: 'highlight'
                        });
                    }
                }
            } else if (line.startsWith('[HEADER]')) {
                data.header = line.replace('[HEADER]', '').trim();
            } else if (line.startsWith('[FOOTER]')) {
                data.footer = line.replace('[FOOTER]', '').trim();
            } else {
                if (currentSection) {
                    currentSection.content += line + ' ';
                }
            }
        }

        if (currentSection) {
            data.sections.push(currentSection);
        }

        return data;
    }

    /**
     * Parse plain text into infographic data
     */
    parsePlainText(text) {
        const paragraphs = text.split('\n\n').filter(p => p.trim());

        if (paragraphs.length === 0) {
            return {
                header: '',
                title: 'Untitled',
                subtitle: '',
                sections: [],
                footer: '',
                theme: this.currentTheme
            };
        }

        const data = {
            header: '',
            title: paragraphs[0].trim(),
            subtitle: paragraphs.length > 1 ? paragraphs[1].trim() : '',
            sections: [],
            footer: '',
            theme: this.currentTheme
        };

        for (let i = 2; i < paragraphs.length; i++) {
            const para = paragraphs[i].trim();
            const isHeading = para.length < 100 && !para.endsWith('.');

            if (isHeading) {
                data.sections.push({
                    title: para,
                    content: '',
                    style: 'default'
                });
            } else {
                if (data.sections.length > 0 && !data.sections[data.sections.length - 1].content) {
                    data.sections[data.sections.length - 1].content = para;
                } else {
                    data.sections.push({
                        title: `Section ${data.sections.length + 1}`,
                        content: para,
                        style: 'default'
                    });
                }
            }
        }

        return data;
    }

    /**
     * Parse JSON into infographic data
     */
    parseJSON(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            return {
                header: data.header || '',
                title: data.title || 'Untitled',
                subtitle: data.subtitle || '',
                sections: data.sections || [],
                footer: data.footer || '',
                theme: data.theme || this.currentTheme
            };
        } catch (e) {
            throw new Error('Invalid JSON format: ' + e.message);
        }
    }

    /**
     * Auto-detect format and parse
     */
    autoParse(text) {
        text = text.trim();

        if (!text) {
            throw new Error('No content provided');
        }

        // Check if JSON
        if (text.startsWith('{')) {
            try {
                return this.parseJSON(text);
            } catch (e) {
                // Not valid JSON, continue
            }
        }

        // Check if markdown
        if (text.includes('#') || text.includes('##')) {
            return this.parseMarkdown(text);
        }

        // Default to plain text
        return this.parsePlainText(text);
    }

    /**
     * Format content with markdown-like syntax
     */
    formatContent(content) {
        if (!content) return '';

        // Bold
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Bullet points
        content = content.replace(/^[-•] (.*?)$/gm, '<li>$1</li>');

        // Wrap lists
        if (content.includes('<li>')) {
            content = '<ul>\n' + content + '\n</ul>';
        }

        // Paragraphs
        if (!content.includes('</ul>') && !content.includes('</ol>')) {
            const paragraphs = content.split('\n\n').filter(p => p.trim());
            content = paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n');
        }

        return content;
    }

    /**
     * Render infographic to HTML
     */
    render(data, container) {
        this.currentData = data;

        const html = `
            <div class="infographic-container theme-${data.theme}">
                ${data.header ? `<div class="infographic-header">${data.header}</div>` : ''}
                <div class="infographic-title">${data.title}</div>
                ${data.subtitle ? `<div class="infographic-subtitle">${data.subtitle}</div>` : ''}
                <div class="infographic-body">
                    ${data.sections.map(section => `
                        <div class="infographic-section section-${section.style}">
                            <h2 class="section-title">${section.title}</h2>
                            <div class="section-content">${this.formatContent(section.content)}</div>
                        </div>
                    `).join('')}
                </div>
                ${data.footer ? `<div class="infographic-footer">${data.footer}</div>` : ''}
            </div>
        `;

        // Update container class for theme
        container.className = `preview-container theme-${data.theme}`;
        container.innerHTML = html;
    }

    /**
     * Export to HTML file
     */
    exportHTML(data) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        ${this.getInlineCSS()}
    </style>
</head>
<body class="theme-${data.theme}">
    <div class="infographic-container">
        ${data.header ? `<div class="infographic-header">${data.header}</div>` : ''}
        <div class="infographic-title">${data.title}</div>
        ${data.subtitle ? `<div class="infographic-subtitle">${data.subtitle}</div>` : ''}
        <div class="infographic-body">
            ${data.sections.map(section => `
                <div class="infographic-section section-${section.style}">
                    <h2 class="section-title">${section.title}</h2>
                    <div class="section-content">${this.formatContent(section.content)}</div>
                </div>
            `).join('')}
        </div>
        ${data.footer ? `<div class="infographic-footer">${data.footer}</div>` : ''}
    </div>
</body>
</html>`;

        return html;
    }

    /**
     * Get inline CSS for export
     */
    getInlineCSS() {
        // Return a simplified version of the CSS for export
        return `
            body { margin: 0; padding: 20px; font-family: Georgia, serif; }
            .infographic-container { max-width: 1200px; margin: 0 auto; padding: 40px; }
            .infographic-header { text-align: center; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; opacity: 0.8; }
            .infographic-title { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; line-height: 1.2; text-transform: uppercase; }
            .infographic-subtitle { font-size: 18px; text-align: center; margin: 20px auto; max-width: 900px; line-height: 1.6; font-style: italic; }
            .infographic-body { margin: 40px 0; display: grid; gap: 30px; }
            .infographic-section { padding: 30px; border-radius: 8px; }
            .section-title { font-size: 28px; margin-bottom: 15px; font-weight: bold; text-transform: uppercase; }
            .section-content { font-size: 16px; line-height: 1.8; }
            .section-content ul { list-style: none; padding-left: 0; }
            .section-content li { padding-left: 30px; position: relative; margin: 10px 0; }
            .section-content li:before { content: "▸"; position: absolute; left: 0; font-weight: bold; }
            .infographic-footer { text-align: center; margin-top: 40px; padding: 25px; font-size: 16px; border-radius: 8px; font-weight: bold; }

            .theme-vintage .infographic-container { background: linear-gradient(135deg, #f5e6d3 0%, #e8d4b8 100%); border: 15px solid #8b7355; box-shadow: inset 0 0 100px rgba(139, 115, 85, 0.1), 0 10px 40px rgba(0, 0, 0, 0.3); }
            .theme-vintage .infographic-title { color: #2a1a0a; font-family: Impact, 'Arial Black', sans-serif; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }
            .theme-vintage .infographic-section { background: rgba(255, 248, 240, 0.6); border: 3px solid #a08060; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); }
            .theme-vintage .section-title { color: #4a3a2a; border-bottom: 3px solid #8b7355; padding-bottom: 10px; font-family: Impact, sans-serif; }
            .theme-vintage .infographic-footer { background: rgba(139, 115, 85, 0.3); border: 3px solid #8b7355; color: #2a1a0a; }
        `;
    }

    /**
     * Download HTML file
     */
    downloadHTML(data, filename = 'infographic.html') {
        const html = this.exportHTML(data);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InfographicRenderer;
}
