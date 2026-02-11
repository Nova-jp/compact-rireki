import express from 'express';
import puppeteer from 'puppeteer';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CVPreviewContent } from '../components/preview/CVPreviewContent';
import { ResumePreviewContent } from '../components/preview/ResumePreviewContent';
import { PDFDocumentLayout } from '../components/pdf/PDFDocumentLayout';

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PDF_SERVER_PORT || 3001;

app.post('/generate', async (req, res) => {
  try {
    const { name, cvData, personalInfo, data } = req.body;
    console.log(`[PDF-SERVER] Generating PDF for: ${name}`);

    // 1. Render React to HTML
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
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html>${fullHtml}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    await browser.close();

    console.log(`[PDF-SERVER] PDF generated successfully`);
    res.contentType('application/pdf');
    res.send(pdfBuffer);

  } catch (error: any) {
    console.error('[PDF-SERVER] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[PDF-SERVER] Running on http://localhost:${PORT}`);
});
