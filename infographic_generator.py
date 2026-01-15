#!/usr/bin/env python3
"""
Infographic Generator
Converts articles and reports into structured infographic data
"""

import json
import re
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict


@dataclass
class InfographicSection:
    """Represents a section in the infographic"""
    title: str
    content: str
    style: str = "default"  # default, highlight, warning, info


@dataclass
class InfographicData:
    """Complete infographic data structure"""
    header: str
    title: str
    subtitle: str
    sections: List[InfographicSection]
    footer: str
    theme: str = "vintage"  # vintage, modern, minimal, corporate


class ArticleParser:
    """Parses articles and extracts structured information"""

    def __init__(self):
        self.data = None

    def parse_markdown(self, text: str) -> InfographicData:
        """Parse markdown formatted text into infographic data"""
        lines = text.strip().split('\n')

        header = ""
        title = ""
        subtitle = ""
        sections = []
        footer = ""
        current_section = None

        for line in lines:
            line = line.strip()

            if not line:
                continue

            # Parse headers
            if line.startswith('# '):
                title = line[2:].strip()
            elif line.startswith('## '):
                if current_section:
                    sections.append(current_section)
                current_section = InfographicSection(
                    title=line[3:].strip(),
                    content="",
                    style="default"
                )
            elif line.startswith('### '):
                if current_section:
                    current_section.content += f"\n**{line[4:].strip()}**\n"
                else:
                    subtitle = line[4:].strip()
            elif line.startswith('> '):
                # Quote - use as subtitle or footer
                quote_text = line[2:].strip()
                if not subtitle:
                    subtitle = quote_text
                else:
                    footer = quote_text
            elif line.startswith('- ') or line.startswith('* '):
                # Bullet point
                if current_section:
                    current_section.content += line + "\n"
                else:
                    sections.append(InfographicSection(
                        title="Key Points",
                        content=line + "\n",
                        style="highlight"
                    ))
            elif line.startswith('[HEADER]'):
                header = line.replace('[HEADER]', '').strip()
            elif line.startswith('[FOOTER]'):
                footer = line.replace('[FOOTER]', '').strip()
            else:
                # Regular content
                if current_section:
                    current_section.content += line + " "

        # Add last section
        if current_section:
            sections.append(current_section)

        return InfographicData(
            header=header,
            title=title,
            subtitle=subtitle,
            sections=sections,
            footer=footer
        )

    def parse_plain_text(self, text: str) -> InfographicData:
        """Parse plain text into infographic data using NLP-like heuristics"""
        paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

        if not paragraphs:
            return InfographicData("", "Untitled", "", [], "")

        # First paragraph is usually title/intro
        title = paragraphs[0]
        subtitle = paragraphs[1] if len(paragraphs) > 1 else ""

        sections = []

        # Process remaining paragraphs
        for i, para in enumerate(paragraphs[2:], start=1):
            # Detect if paragraph is a heading (short, no punctuation at end)
            is_heading = len(para) < 100 and not para.endswith('.')

            if is_heading:
                sections.append(InfographicSection(
                    title=para,
                    content="",
                    style="default"
                ))
            else:
                if sections and not sections[-1].content:
                    sections[-1].content = para
                else:
                    sections.append(InfographicSection(
                        title=f"Section {len(sections) + 1}",
                        content=para,
                        style="default"
                    ))

        return InfographicData(
            header="",
            title=title,
            subtitle=subtitle,
            sections=sections,
            footer=""
        )

    def parse_json(self, json_str: str) -> InfographicData:
        """Parse JSON formatted infographic data"""
        data = json.loads(json_str)

        sections = [
            InfographicSection(**s) if isinstance(s, dict) else s
            for s in data.get('sections', [])
        ]

        return InfographicData(
            header=data.get('header', ''),
            title=data.get('title', 'Untitled'),
            subtitle=data.get('subtitle', ''),
            sections=sections,
            footer=data.get('footer', ''),
            theme=data.get('theme', 'vintage')
        )

    def auto_parse(self, text: str) -> InfographicData:
        """Automatically detect format and parse"""
        text = text.strip()

        # Check if JSON
        if text.startswith('{'):
            try:
                return self.parse_json(text)
            except json.JSONDecodeError:
                pass

        # Check if markdown
        if '#' in text or '##' in text:
            return self.parse_markdown(text)

        # Default to plain text
        return self.parse_plain_text(text)

    def to_json(self, data: InfographicData) -> str:
        """Convert infographic data to JSON"""
        return json.dumps(asdict(data), indent=2)

    def to_html(self, data: InfographicData) -> str:
        """Generate HTML for the infographic"""
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{data.title}</title>
    <link rel="stylesheet" href="src/css/infographic.css">
</head>
<body class="theme-{data.theme}">
    <div class="infographic-container">
"""

        if data.header:
            html += f'        <div class="infographic-header">{data.header}</div>\n'

        html += f"""        <div class="infographic-title">{data.title}</div>
"""

        if data.subtitle:
            html += f'        <div class="infographic-subtitle">{data.subtitle}</div>\n'

        html += '        <div class="infographic-body">\n'

        for section in data.sections:
            html += f"""            <div class="infographic-section section-{section.style}">
                <h2 class="section-title">{section.title}</h2>
                <div class="section-content">{self._format_content(section.content)}</div>
            </div>
"""

        html += '        </div>\n'

        if data.footer:
            html += f'        <div class="infographic-footer">{data.footer}</div>\n'

        html += """    </div>
</body>
</html>"""

        return html

    def _format_content(self, content: str) -> str:
        """Format content with basic markdown support"""
        # Bold
        content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', content)
        # Italic
        content = re.sub(r'\*(.*?)\*', r'<em>\1</em>', content)
        # Bullet points
        content = re.sub(r'^- (.*?)$', r'<li>\1</li>', content, flags=re.MULTILINE)
        content = re.sub(r'^• (.*?)$', r'<li>\1</li>', content, flags=re.MULTILINE)

        # Wrap lists
        if '<li>' in content:
            content = '<ul>\n' + content + '\n</ul>'

        # Paragraphs
        if '</ul>' not in content and '</ol>' not in content:
            paragraphs = content.split('\n\n')
            content = '\n'.join(f'<p>{p.strip()}</p>' for p in paragraphs if p.strip())

        return content


def main():
    """Main function for CLI usage"""
    import sys
    import argparse

    parser = argparse.ArgumentParser(description='Generate infographics from articles')
    parser.add_argument('input', help='Input file path or "-" for stdin')
    parser.add_argument('-o', '--output', help='Output HTML file path')
    parser.add_argument('-j', '--json', action='store_true', help='Output JSON instead of HTML')
    parser.add_argument('-t', '--theme', default='vintage',
                       choices=['vintage', 'modern', 'minimal', 'corporate'],
                       help='Infographic theme')

    args = parser.parse_args()

    # Read input
    if args.input == '-':
        text = sys.stdin.read()
    else:
        with open(args.input, 'r') as f:
            text = f.read()

    # Parse
    article_parser = ArticleParser()
    data = article_parser.auto_parse(text)
    data.theme = args.theme

    # Generate output
    if args.json:
        output = article_parser.to_json(data)
    else:
        output = article_parser.to_html(data)

    # Write output
    if args.output:
        with open(args.output, 'w') as f:
            f.write(output)
        print(f"Generated infographic: {args.output}")
    else:
        print(output)


if __name__ == '__main__':
    main()
