import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse lines to create structured elements
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listBuffer.length > 0 && listType) {
      const items = listBuffer.map((item, i) => (
        <li key={i} className="mb-1 leading-relaxed">
          {renderInline(item)}
        </li>
      ));
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-3 list-disc pl-5 text-slate-300">
            {items}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-3 list-decimal pl-5 text-slate-300">
            {items}
          </ol>
        );
      }
      listBuffer = [];
      listType = null;
    }
  };

  const flushCode = () => {
    if (codeBuffer.length > 0) {
      elements.push(
        <pre
          key={`code-${elements.length}`}
          className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-cyan-300"
        >
          <code>{codeBuffer.join('\n')}</code>
        </pre>
      );
      codeBuffer = [];
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    // Process bold, italic, code
    const parts: React.ReactNode[] = [];
    // Quick regex to match **bold** and `code`
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-semibold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={match.index}
            className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan-300"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      flushList();
      const quoteText = line.trim().replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-4 rounded-r-xl border-l-4 border-cyan-500 bg-cyan-950/20 p-4 italic text-slate-300"
        >
          {renderInline(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="mt-6 mb-2 text-lg font-bold text-white">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="mt-8 mb-3 text-xl sm:text-2xl font-black text-white">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${i}`} className="mt-10 mb-4 text-2xl sm:text-3xl font-black text-white">
          {line.replace('# ', '')}
        </h1>
      );
      continue;
    }

    // Unordered List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      listBuffer.push(line.trim().replace(/^[-*]\s+/, ''));
      continue;
    }

    // Ordered List
    const olMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      listBuffer.push(olMatch[2]);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="my-3 text-sm leading-relaxed text-slate-300">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  flushCode();

  return <div className="markdown-body space-y-1">{elements}</div>;
}
