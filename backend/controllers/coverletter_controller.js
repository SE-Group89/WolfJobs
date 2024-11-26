const CoverLetter = require('../models/cover_letter'); // Assuming the model exists
const User = require('../models/user');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for cover letters
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) { // Accept only PDF files
      return cb(new Error('Please upload a PDF file'));
    }
    cb(undefined, true);
  }
});

// Handles cover letter upload, updates user's cover letter, and replaces old cover letter if it exists
exports.uploadCoverLetter = async (req, res) => {
  const existingCoverLetter = await CoverLetter.findOne({ applicantId: req.body.id });

  if (existingCoverLetter) {
    // Delete the existing cover letter
    await existingCoverLetter.remove();
  }

  const user = await User.findOne({ _id: req.body.id });

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  try {
    const coverLetter = new CoverLetter({
      applicantId: user._id,
      fileName: req.file.originalname,
      fileData: req.file.buffer,
      contentType: 'application/pdf'
    });
    await coverLetter.save();

    // Link the cover letter to the user
    user.coverLetterId = coverLetter._id;
    user.coverLetter = coverLetter.fileName;
    await user.save();

    res.status(201).send({ message: 'Cover letter uploaded successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Retrieves and serves a user's cover letter as a PDF
exports.getCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findOne({ applicantId: req.params.id });
    if (!coverLetter) {
      return res.status(404).send({ error: 'Cover letter not found' });
    }
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `inline; filename=${coverLetter.fileName}`);
    res.send(coverLetter.fileData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Export the multer upload configuration
exports.upload = upload;

// Ping endpoint for testing server availability
exports.ping = (req, res) => {
  res.send({ message: 'Cover Letter Service is Live!' });
};
