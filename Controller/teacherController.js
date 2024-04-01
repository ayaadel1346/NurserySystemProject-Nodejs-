const Teacher = require('../models/teacherModel');
const { uploadImage } = require('./uploadController');
const bcrypt = require('bcrypt');


exports.getAllTeachers = async (req, res, next) => {
    try {
        const userRole = req.user.role;
       
        if (userRole === 'admin') {
            const teachers = await Teacher.find();
            return res.status(200).json({ data: teachers });
        } else {
            
            return res.status(403).json({ error: 'Access denied,Only admin can get all teachers.' });
        }
    } catch (error) {
        next(error);
    }
};




exports.insertTeacher = async (req, res) => {
    try {  
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return res.status(403).json({ error: 'You do not have permission to perform this action.' });
        }

        const { fullname, username, password, email, image } = req.body;
    
        const newTeacher = new Teacher({
            fullname,
            username,
            password,
            email,
            image : req.file ?req.file.filename : null,
        });
       
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher created successfully.' });
    } catch (error) {
        console.error('Error inserting teacher:', error);
        res.status(500).json({ error: 'Failed to create teacher.' });
    }
};




exports.updateTeacher = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const userRole = req.user.role;
        const tokenid = req.user.userId;

        let teacher = null;

        if (userRole === 'admin') {
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                req.body.password = hashedPassword;
            }
            teacher = await Teacher.findByIdAndUpdate(_id, req.body, { new: true });
        } else if (userRole === 'teacher' && _id.toString() === tokenid.toString()) {

            if (req.body.password) {
                return res.status(400).json({ error: 'Changing password is not allowed. If you want to change it, go to /teachers/change-password' });
            }
            teacher = await Teacher.findByIdAndUpdate(tokenid, req.body, { new: true });

        } else {
            return res.status(403).json({ error: 'Access denied. You can only update your own data' });
        }

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

       
        if (req.file) {
            teacher.image = req.file.filename;
        }

        await teacher.save();

        return res.status(200).json({ data: teacher, message: 'Teacher updated successfully' });
    } catch (error) {
        console.error('Error updating teacher:', error);
        return res.status(500).json({ error: 'Failed to update teacher.' });
    }
};
exports.getTeacherById = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const userRole = req.user.role;
        const tokenid = req.user.userId;

      
        // const message = `Request id: ${_id}, token id: ${tokenid}`;
        // console.log(message);

        let teacher;

        if (userRole == 'admin') {
            teacher = await Teacher.findById(_id);
        } else if (userRole === 'teacher' && _id.toString() === tokenid.toString()) {
            teacher = await Teacher.findById(tokenid);
        } else {
            const errorMessage = 'You are not allowed to retrieve others\' data';
            return res.status(403).json({ error: errorMessage });
        }

       
        if (!teacher) {
            const errorMessage = 'Teacher not found';
            return res.status(404).json({ error: errorMessage });
        }

        
        return res.status(200).json({ data: teacher });
    } catch (error) {
        next(error);
    }
};



exports.deleteTeacherById = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const userRole = req.user.role;

       
        if (userRole == 'admin') {
            const deletedTeacher = await Teacher.findByIdAndDelete(_id);
            if (!deletedTeacher) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            return res.status(200).json({ data: deletedTeacher, message: 'Teacher deleted successfully' });
        } else {
            return res.status(403).json({ error: 'Access denied, Only admin can delete teachers.' });
        }
    } catch (error) {
        next(error);
    }
};




  
