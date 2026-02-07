import React from 'react';

interface PDFDocumentLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function PDFDocumentLayout({ children, title }: PDFDocumentLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* 1. Reset browser defaults for PDF generation */
          body { 
            font-family: 'Noto Serif JP', "MS Mincho", "Hiragino Mincho ProN", serif; 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact; 
            background: #f8fafc;
          }
          
          /* 2. Paper definition */
          @page { 
            margin: 0; 
            size: A4 portrait; 
          }

          /* 3. Global fixes */
          * { box-sizing: border-box; }
          .break-inside-avoid { break-inside: avoid; }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
