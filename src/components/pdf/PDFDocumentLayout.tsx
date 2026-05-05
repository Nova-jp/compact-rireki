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
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: "MS Mincho", "Hiragino Mincho ProN", "Yu Mincho", "IPAexMincho", serif;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #f8fafc;
          }
          @page { margin: 0; size: A4 portrait; }
          * { box-sizing: border-box; }
          .break-inside-avoid { break-inside: avoid; }

          /* display */
          .flex { display: flex; }
          .grid { display: grid; }
          .hidden { display: none; }
          .table { display: table; }

          /* flex */
          .flex-col { flex-direction: column; }
          .flex-1 { flex: 1 1 0%; }
          .items-center { align-items: center; }
          .items-end { align-items: flex-end; }
          .justify-between { justify-content: space-between; }
          .justify-center { justify-content: center; }
          .gap-0 { gap: 0; }
          .gap-8 { gap: 2rem; }
          .space-y-2 > * + * { margin-top: 0.5rem; }

          /* grid */
          .grid-cols-\\[1fr_30mm\\] { grid-template-columns: 1fr 30mm; }
          .grid-cols-\\[1fr_45mm\\] { grid-template-columns: 1fr 45mm; }

          /* position */
          .relative { position: relative; }
          .absolute { position: absolute; }

          /* overflow */
          .overflow-hidden { overflow: hidden; }

          /* sizing */
          .w-full { width: 100%; }
          .w-14 { width: 3.5rem; }
          .h-full { height: 100%; }
          .h-7 { height: 1.75rem; }
          .h-10 { height: 2.5rem; }
          .h-\\[18px\\] { height: 18px; }
          .h-\\[35px\\] { height: 35px; }
          .h-\\[55px\\] { height: 55px; }
          .h-\\[60px\\] { height: 60px; }
          .h-\\[80px\\] { height: 80px; }
          .h-\\[108px\\] { height: 108px; }
          .h-\\[140px\\] { height: 140px; }

          /* position offsets */
          .top-1 { top: 0.25rem; }
          .right-2 { right: 0.5rem; }
          .right-\\[14mm\\] { right: 14mm; }
          .top-\\[16mm\\] { top: 16mm; }

          /* padding */
          .p-1 { padding: 0.25rem; }
          .p-2 { padding: 0.5rem; }
          .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .pb-20 { padding-bottom: 5rem; }
          .pr-4 { padding-right: 1rem; }
          .pr-\\[35mm\\] { padding-right: 35mm; }

          /* margin */
          .mb-1 { margin-bottom: 0.25rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .ml-4 { margin-left: 1rem; }
          .ml-10 { margin-left: 2.5rem; }
          .ml-16 { margin-left: 4rem; }
          .ml-\\[1em\\] { margin-left: 1em; }

          /* text align */
          .text-center { text-align: center; }
          .text-right { text-align: right; }

          /* font size */
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-\\[5\\.5pt\\] { font-size: 5.5pt; }
          .text-\\[7pt\\] { font-size: 7pt; }
          .text-\\[7\\.5pt\\] { font-size: 7.5pt; }
          .text-\\[8pt\\] { font-size: 8pt; }
          .text-\\[9pt\\] { font-size: 9pt; }
          .text-\\[10pt\\] { font-size: 10pt; }

          /* font weight */
          .font-bold { font-weight: 700; }
          .font-normal { font-weight: 400; }

          /* letter spacing */
          .tracking-\\[1em\\] { letter-spacing: 1em; }
          .tracking-tighter { letter-spacing: -0.05em; }

          /* colors */
          .bg-white { background-color: #ffffff; }
          .bg-gray-50\\/30 { background-color: rgba(249,250,251,0.3); }
          .bg-gray-50\\/50 { background-color: rgba(249,250,251,0.5); }
          .text-slate-400 { color: #94a3b8; }
          .text-gray-400 { color: #9ca3af; }
          .text-gray-500 { color: #6b7280; }

          /* border */
          .border { border-width: 1px; border-style: solid; }
          .border-l { border-left: 1px solid; }
          .border-r { border-right: 1px solid; }
          .border-t { border-top: 1px solid; }
          .border-b { border-bottom: 1px solid; }
          .border-dashed { border-style: dashed; }
          .border-black { border-color: #000; }
          .border-slate-200 { border-color: #e2e8f0; }
          .border-collapse { border-collapse: collapse; }

          /* line height */
          .leading-snug { line-height: 1.375; }
          .leading-tight { line-height: 1.25; }
          .leading-relaxed { line-height: 1.625; }

          /* word break */
          .break-all { word-break: break-all; }

          /* vertical align */
          .align-top { vertical-align: top; }

          /* shadow */
          .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
          .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }

          /* object fit */
          .object-cover { object-fit: cover; }

          /* print */
          @media print {
            .print\\:gap-0 { gap: 0; }
            .print\\:pb-0 { padding-bottom: 0; }
            .print\\:shadow-none { box-shadow: none; }
            .print\\:m-0 { margin: 0; }
            .print\\:block { display: block; }
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
