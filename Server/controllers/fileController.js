// controllers/fileController.js
const File = require('../models/fileSchema');

const uploadFile = async (req, res) => {
  try {
    // const { file } = req;
    const filename = (req.file?.filename ? req.file.filename : "")//: 'אישור רו"ח משנה קודמת  ',

    if (!filename) {
      return res.status(400).send('No file uploaded');
    }

    const newFile = new File({
      filename: filename
    });

    await newFile.save();

    res.status(201).json({ id: newFile._id});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server error');
  }
};
const getFileById = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'קובץ לא נמצא' });
        }



        // החזרת נתיב הקובץ יחד עם נתונים נוספים
        res.status(200).json({ 
            filename: file.filename
        });
    } catch (error) {
        console.error('שגיאה באחזור הקובץ:', error);
        res.status(500).send('שגיאת שרת');
    }
};

module.exports = { uploadFile, getFileById };
