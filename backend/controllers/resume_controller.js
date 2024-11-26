// controllers/resume_controller.js
const Resume = require('../models/resume');
const User = require('../models/user');

const multer = require('multer'); // Middleware for handling file uploads

const upload = multer({ //Configure multer for file uploads
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) { // Accept only pdf files
      return cb(new Error('Please upload a PDF file'));
    }
    cb(undefined, true);
  }
});

// Handles resume upload, updates user's resume, and replaces old resume if it exists
exports.uploadResume = async (req, res) => {
  // first look for a resume with the same applicantId
  const existingResume = await Resume.findOne({
    applicantId: req.body.id
  });

  if (existingResume) {
    // delete the existing resume
    existingResume.remove();
  }

  // find the user and add the resume
  let user = await User.findOne({ _id: req.body.id });

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  try {
    const resume = new Resume({
      applicantId: user._id, // Assuming the user is authenticated
      fileName: req.file.originalname,
      fileData: req.file.buffer,
      contentType: 'application/pdf'
    });
    await resume.save();

    // Link the resume to the user
    user.resumeId = resume._id;
    user.resume = resume.fileName
    await user.save();

    res.status(201).send({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// Retrieves and serves a user's resume as a pdf
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ applicantId: req.params.id }); // Find the resume by applicant ID
    if (!resume) {
      return res.status(404).send({ error: 'Resume not found' });
    }
    res.set('Content-Type', 'application/pdf');
    // send file name 
    res.set('Content-Disposition', `inline; filename=${resume.fileName}`);
    res.send(resume.fileData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

// Make sure to export the multer upload as well
exports.upload = upload;

//Ping endpoint for testing server availability
exports.ping = (req, res) => {
  res.send({ message: 'Pong' });
};