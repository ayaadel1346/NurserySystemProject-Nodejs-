const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const Child = require('../models/childModel');

require('dotenv').config();

async function registerTeacher(req, res, next) {
    const { fullname, username, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = await Teacher.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            role: 'teacher',
            image
        });

        
        const token = jwt.sign({ userId: newTeacher._id, role: newTeacher.role }, process.env.SECRET_KEY, { expiresIn: '2h' });

        res.status(201).json({ message: 'Registration successful', data: newTeacher, token });
    } catch (error) {
        console.error('Error during registration:', error);
        next(error);
    }
}



async function loginTeacher(req, res, next) {
    const { username, password } = req.body;

    try {
       
        let user = await Teacher.findOne({ username });
        
        if (!user) {
            user = await Child.findOne({ username });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        let token = null;
        if (user instanceof Teacher) {
           
            token = jwt.sign({ userId: user._id,  role: user.role}, process.env.SECRET_KEY, { expiresIn: '2h' });
        } else if (user instanceof Child) {
            
            token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
        }

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        next(error);
    }
}

module.exports = { registerTeacher, loginTeacher };
