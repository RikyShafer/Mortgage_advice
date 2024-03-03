const PDFDocument = require('pdfkit');
const fs = require('fs');
const Questionnaire = require('../models/Questionnaire');

const downloadQuestionnairePDF = async (req, res) => {
    // Retrieve selected provider IDs from the request body
    const selectedProviderIds = req.body.selectedProviderIds;

    try {
        // Fetch details of the selected questionnaire providers from the database
        const selectedProviders = await Questionnaire.find({ _id: { $in: selectedProviderIds } }).lean();

        // Create a new PDF document
        const doc = new PDFDocument();
        const stream = doc.pipe(fs.createWriteStream('questionnaire_providers.pdf'));

        // Populate the PDF document with provider details
        selectedProviders.forEach(provider => {
            doc.text(`Provider Name: ${provider.firstName} ${provider.lastName}`);
            doc.text(`ID: ${provider.ID}`);
            doc.text(`Phone: ${provider.phone}`);
            doc.text(`Email: ${provider.email}`);
            doc.text('--------------------------------------');
            doc.moveDown();
        });

        // Finalize the PDF document
        doc.end();

        // Serve the generated PDF for download
        res.setHeader('Content-Disposition', 'attachment; filename=questionnaire_providers.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        fs.createReadStream('questionnaire_providers.pdf').pipe(res);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { downloadQuestionnairePDF };
