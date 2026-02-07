import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import Stripe from 'stripe';
import { renderToStaticMarkup } from 'react-dom/server';
import { CVPreviewContent } from '@/components/preview/CVPreviewContent';
import { ResumePreviewContent } from '@/components/preview/ResumePreviewContent';
import { PDFDocumentLayout } from '@/components/pdf/PDFDocumentLayout';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { html: clientHtml, name, sessionId, cvData, personalInfo, data } = req.body;
    console.log(`PDF Request (Pages): name=${name}, type=${cvData ? 'CV' : data ? 'Resume' : 'HTML'}`);

    // 1. Verify Payment Session
    if (process.env.NODE_ENV === 'production' || sessionId) {
      if (!sessionId) {
        return res.status(402).json({ error: 'Payment required' });
      }
      
      if (!stripe) {
        return res.status(500).json({ error: 'Payment service unavailable' });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return res.status(402).json({ error: 'Payment not verified' });
      }
    }

    // 2. Generate HTML from React Components
    let documentComponent;
    
    if (data) {
       documentComponent = <ResumePreviewContent data={data} />;
    } else if (cvData && personalInfo) {
       documentComponent = <CVPreviewContent data={cvData} personalInfo={personalInfo} />;
    } else {
       // Fallback for legacy client-side HTML
       documentComponent = <div dangerouslySetInnerHTML={{ __html: clientHtml || '' }} />;
    }

    const fullHtml = renderToStaticMarkup(
      <PDFDocumentLayout title={`Document - ${name}`}>
        {documentComponent}
      </PDFDocumentLayout>
    );

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
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

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=document_${encodeURIComponent(name)}.pdf`);
    res.status(200).send(Buffer.from(pdfBuffer));

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
