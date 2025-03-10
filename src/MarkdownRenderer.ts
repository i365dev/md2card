import { marked } from 'marked';

class MarkdownRenderer {
  private renderer: marked.Renderer;

  constructor() {
    this.renderer = new marked.Renderer();
    this.setupExtensions();
  }

  private setupExtensions(): void {
    // Custom heading renderer
    this.renderer.heading = (text: string, level: number) => {
      const headingClass = level === 1 ? 'card-title' : `heading-${level}`;
      return `<h${level} class="${headingClass}">${text}</h${level}>`;
    };

    // Custom image renderer with background support
    this.renderer.image = (href: string, title: string | null, text: string) => {
      if (text && text.includes('|background')) {
        const alt = text.split('|')[0];
        return `<div class="card-background" style="background-image: url(${href})" role="img" aria-label="${alt}">
                </div>`;
      }
      return `<img src="${href}" alt="${text || ''}" title="${title || ''}" class="card-image">`;
    };

    // Custom link renderer with tag support
    this.renderer.link = (href: string, title: string | null, text: string) => {
      if (href && href.startsWith('#tag:')) {
        const tag = href.substring(5);
        return `<span class="card-tag" data-tag="${tag}">${text}</span>`;
      }
      return `<a href="${href}" title="${title || ''}" class="card-link" target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    // Custom paragraph renderer with callout support
    this.renderer.paragraph = (text: string) => {
      if (text.startsWith(':::')) {
        const match = text.match(/^:::(\w+)\s+(.+?):::$/);
        if (match) {
          const [, type, content] = match;
          return `<div class="card-callout card-callout-${type.toLowerCase()}">
                    <p>${content}</p>
                  </div>`;
        }
      }
      return `<p class="card-paragraph">${text}</p>`;
    };

    // Custom code block renderer
    this.renderer.code = (code: string, language?: string) => {
      const validLang = language || 'plaintext';
      return `<pre class="card-code-block"><code class="language-${validLang}">${code}</code></pre>`;
    };

    // Custom blockquote renderer
    this.renderer.blockquote = (quote: string) => {
      return `<blockquote class="card-blockquote">${quote}</blockquote>`;
    };

    // Custom list renderer
    this.renderer.list = (body: string, ordered: boolean) => {
      const type = ordered ? 'ol' : 'ul';
      const className = ordered ? 'card-ordered-list' : 'card-unordered-list';
      return `<${type} class="${className}">${body}</${type}>`;
    };

    // Custom list item renderer
    this.renderer.listitem = (text: string) => {
      return `<li class="card-list-item">${text}</li>`;
    };
  }

  public render(markdown: string): string {
    try {
      marked.setOptions({
        renderer: this.renderer,
        gfm: true, // Enable GitHub Flavored Markdown
        breaks: true, // Convert \n to <br>
      });

      const result = marked.parse(markdown);
      return typeof result === 'string' ? result : '';
    } catch (error) {
      console.error('Markdown rendering error:', error);
      return `<p class="card-error">Error rendering markdown content</p>`;
    }
  }

  // Helper method to detect if the content has a background image
  public hasBackgroundImage(markdown: string): boolean {
    return markdown.includes('|background');
  }

  // Helper method to extract all tags from the markdown
  public extractTags(markdown: string): string[] {
    const tagRegex = /#tag:([^\s\]]+)/g;
    const matches = markdown.matchAll(tagRegex);
    return Array.from(matches, match => match[1]);
  }
}

export default MarkdownRenderer;
