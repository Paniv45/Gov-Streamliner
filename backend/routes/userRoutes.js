// backend/routes/userRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

MONGO_URI = process.env.MONGO_URI;

const User = require('../models/User');
const Scheme = require('../models/Scheme');


// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize the multer middleware with the storage configuration
const upload = multer({ storage: storage });

// POST route to handle profile submission with file upload
router.post('/profile', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadhaarCard', maxCount: 1 },
  { name: 'disabilityCertificate', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 },
]), async (req, res) => {
  try {
    const { name, age, gender, address, panCardNumber, aadhaarCardNumber, disabilityCertificateNumber, incomeCertificateNumber } = req.body;
    const files = req.files;

    // Prepare the user details, including file paths if files were uploaded
    const userDetails = {
      name,
      age,
      gender,
      address,
      panCardNumber,
      aadhaarCardNumber,
      disabilityCertificateNumber,
      incomeCertificateNumber,
      panCard: files.panCard ? {
        filePath: files.panCard[0].path,
        fileName: files.panCard[0].originalname,
      } : undefined,
      aadhaarCard: files.aadhaarCard ? {
        filePath: files.aadhaarCard[0].path,
        fileName: files.aadhaarCard[0].originalname,
      } : undefined,
      disabilityCertificate: files.disabilityCertificate ? {
        filePath: files.disabilityCertificate[0].path,
        fileName: files.disabilityCertificate[0].originalname,
      } : undefined,
      incomeCertificate: files.incomeCertificate ? {
        filePath: files.incomeCertificate[0].path,
        fileName: files.incomeCertificate[0].originalname,
      } : undefined,
    };

    // Save the user data to the database
    const user = new User(userDetails);
    await user.save();

    res.status(200).json({ message: 'User profile saved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user profile' });
  }
});


router.post('/add-scheme', async (req, res) => {
  try {
    const scheme = new Scheme({
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags],
      benefits: Array.isArray(req.body.benefits) ? req.body.benefits : [req.body.benefits],
      eligibility: Array.isArray(req.body.eligibility) ? req.body.eligibility : [req.body.eligibility],
      docs_required: Array.isArray(req.body.docs_required) ? req.body.docs_required : [req.body.docs_required],
      application_process: Array.isArray(req.body.application_process) ? req.body.application_process : [req.body.application_process],
      title: req.body.title,
      desc: req.body.desc,
    });

    console.log(req.body);
    console.log(scheme);

    await scheme.save();
    res.status(200).json({ message: 'Scheme saved successfully' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving scheme' });
  }
});


router.get('/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    console.log("Fetched All Schemes");
    res.status(200).json(schemes);
  }
  catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({ message: 'Error fetching schemes' });
  }
});

router.get('/scheme/:id', async (req, res) => {
  try {
    const schemeId = req.params.id; // Get the scheme id from the URL params
    const scheme = await Scheme.findById(schemeId); // Find scheme by ID

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' }); // Return error if scheme not found
    }

    res.status(200).json(scheme); // Send the scheme details as the response
  } catch (error) {
    console.error('Error fetching scheme details:', error);
    res.status(500).json({ message: 'Error fetching scheme details' }); // Return error if something goes wrong
  }
});

module.exports = router;




// Add this new route to get top 5 matching schemes
router.get('/schemes/matches', async (req, res) => {
  try {
    const { tags } = req.query; // tags is an array of tags passed as a query parameter

    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Invalid or missing tags parameter' });
    }

    // Fetch all schemes from the database
    const schemes = await Scheme.find();

    // Calculate match score for each scheme based on how many tags they share
    const matchedSchemes = schemes.map((scheme) => {
      const sharedTags = scheme.tags.filter(tag => tags.includes(tag)); // Find common tags
      return {
        ...scheme.toObject(),
        matchScore: sharedTags.length, // Match score is the number of matching tags
      };
    });

    // Sort schemes by match score in descending order
    const sortedSchemes = matchedSchemes.sort((a, b) => b.matchScore - a.matchScore);

    // Return the top 5 schemes based on the match score
    res.status(200).json(sortedSchemes.slice(0, 5));
  } catch (error) {
    console.error('Error fetching matching schemes:', error);
    res.status(500).json({ message: 'Error fetching matching schemes' });
  }
});
