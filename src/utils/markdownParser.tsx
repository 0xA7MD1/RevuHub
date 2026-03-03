import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import React, { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Callout, WavyText, Highlight, InlineCode, Kbd } from '../components/MarkdownUI';

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

// Configure rehype-pretty-code with VS Code-like theme
const prettyCodeOptions = {
  theme: 'github-dark',
  grid: false,
  keepBackground: false,
  onVisitLine(node: any) {
    // Add line numbers or custom styling if needed
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    // Style for highlighted lines
    node.properties.className = (node.properties.className || []).concat('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    // Style for highlighted words
    node.properties.className = (node.properties.className || []).concat('word-highlighted');
  },
};

// Custom component mapping for rehype-react
const componentMap = {
  // Custom HTML-like tags to React components
  callout: Callout,
  wavy: WavyText,
  highlight: Highlight,
  kbd: Kbd,
  // Override default code styling
  code: InlineCode,
};

export async function parseMarkdownToReact(markdownString: string) {
  try {
    const processor = unified()
      .use(remarkParse) // Parse markdown to MDAST
      .use(remarkRehype) // Convert MDAST to HAST
      .use(rehypePrettyCode, prettyCodeOptions) // Add VS Code-like syntax highlighting
      .use(rehypeReact, { // Convert HAST to React components
        Fragment,
        jsx,
        jsxs,
        components: componentMap,
      });

    const result = await processor.process(markdownString);
    return result.result;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    // Fallback to basic rendering if parsing fails
    return React.createElement('div', { className: 'prose prose-slate dark:prose-invert' }, markdownString);
  }
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u0000-\u001F']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractTextFromHast(node: any): string {
  if (!node) return '';
  if (node.type === 'text' && typeof node.value === 'string') return node.value;
  if (Array.isArray(node.children)) return node.children.map(extractTextFromHast).join('');
  return '';
}

function createRehypeTocAndSlugPlugin() {
  return function rehypeTocAndSlug(tree: any, file: any) {
    const toc: TocItem[] = [];
    const used = new Map<string, number>();

    const walk = (node: any) => {
      if (!node) return;

      if (node.type === 'element' && typeof node.tagName === 'string') {
        const match = node.tagName.match(/^h([1-6])$/);
        if (match) {
          const level = Number(match[1]);
          const text = extractTextFromHast(node).trim();
          if (text) {
            let base = slugifyHeading(text);
            if (!base) base = `heading-${toc.length + 1}`;
            const count = used.get(base) ?? 0;
            used.set(base, count + 1);
            const id = count === 0 ? base : `${base}-${count + 1}`;

            node.properties = node.properties || {};
            if (!node.properties.id) node.properties.id = id;

            toc.push({ id, text, level });
          }
        }
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child);
      }
    };

    walk(tree);
    file.data = file.data || {};
    file.data.toc = toc;
  };
}

export async function parseMarkdownToReactWithToc(
  markdownString: string
): Promise<{ content: React.ReactNode; toc: TocItem[] }> {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, prettyCodeOptions)
      .use(createRehypeTocAndSlugPlugin)
      .use(rehypeReact, {
        Fragment,
        jsx,
        jsxs,
        components: componentMap,
      });

    const file = await processor.process(markdownString);
    const toc = (file.data as any)?.toc as TocItem[] | undefined;
    return { content: file.result as any, toc: Array.isArray(toc) ? toc : [] };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {
      content: React.createElement('div', { className: 'prose prose-slate dark:prose-invert' }, markdownString),
      toc: [],
    };
  }
}

// Alternative function for parsing with custom options
export async function parseMarkdownToReactWithOptions(
  markdownString: string, 
  options: {
    theme?: string;
    enableLineNumbers?: boolean;
    enableHighlighting?: boolean;
  } = {}
) {
  const {
    theme = 'github-dark',
    enableLineNumbers = true,
    enableHighlighting: _enableHighlighting = true
  } = options;

  const customPrettyCodeOptions = {
    ...prettyCodeOptions,
    theme,
    grid: enableLineNumbers,
  };

  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, customPrettyCodeOptions)
      .use(rehypeReact, {
        Fragment,
        jsx,
        jsxs,
        components: componentMap,
      });

    const result = await processor.process(markdownString);
    return result.result;
  } catch (error) {
    console.error('Error parsing markdown with options:', error);
    return React.createElement('div', { className: 'prose prose-slate dark:prose-invert' }, markdownString);
  }
}

// Helper function to create custom markdown extensions
export function createCustomMarkdownParser(customComponents: Record<string, React.ComponentType<any>>) {
  const mergedComponents = { ...componentMap, ...customComponents };

  return (markdownString: string) => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, prettyCodeOptions)
      .use(rehypeReact, {
        Fragment,
        jsx,
        jsxs,
        components: mergedComponents,
      });

    return processor.process(markdownString);
  };
}
