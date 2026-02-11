import React from 'react';
import puppeteer from 'puppeteer';
import { CVPreviewContent } from '@/components/preview/CVPreviewContent';
import { ResumePreviewContent } from '@/components/preview/ResumePreviewContent';
import { PDFDocumentLayout } from '@/components/pdf/PDFDocumentLayout';

export async function generatePDF({ name, cvData, personalInfo, data }: any) {
  // 1. Generate HTML from React Components
  // Use dynamic import to bypass Next.js static analysis rules for react-dom/server
  const { renderToStaticMarkup } = await import('react-dom/server');

  let documentComponent;
  
  if (data) {
     documentComponent = <ResumePreviewContent data={data} />;
  } else if (cvData && personalInfo) {
     documentComponent = <CVPreviewContent data={cvData} personalInfo={personalInfo} />;
  } else {
     documentComponent = <div>No content provided</div>;
  }

  const fullHtml = renderToStaticMarkup(
    <PDFDocumentLayout title={`Document - ${name}`}>
      {documentComponent}
    </PDFDocumentLayout>
  );

  // 2. Convert to PDF with Puppeteer
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--font-render-hinting=none'
    ],
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    await page.setContent(`<!DOCTYPE html>${fullHtml}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}
