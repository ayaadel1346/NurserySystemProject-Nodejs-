const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png','.PNG','.JPG','.JPEG'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: imageFilter
});


exports.uploadImage = function (req, res, next) {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'Failed to upload image' });
        } else if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ error: 'Failed to upload image' });
        }
        
        if (req.file) {
            req.teacherImage = req.file.filename;
        }
        next();
    });
};
