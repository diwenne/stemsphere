const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('Starting PDF generation...');

    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Load the HTML template
    const htmlPath = path.join(__dirname, 'handbook-template.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
    });

    // Generate PDF
    const outputPath = path.join(__dirname, '..', 'public', 'handbook-new.pdf');

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        }
    });

    console.log(`PDF generated successfully: ${outputPath}`);

    await browser.close();
}

generatePDF().catch(console.error);
