const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherModel');

exports.changePassword = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { new_password, old_password } = req.body;

        const teacher = await Teacher.findById(_id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        if (req.user.role === 'admin') {
            if (!new_password) {
                return res.status(400).json({ success: false, message: 'New password is required' });
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await Teacher.findByIdAndUpdate(_id, { password: hashedPassword });
            return res.status(200).json({ success: true, message: 'Password updated successfully' });
        }
        
        if (req.user.role === 'teacher' && _id.toString() === req.user.userId.toString()) {
            if (old_password) {
                const passwordMatch = await bcrypt.compare(old_password, teacher.password);
                if (!passwordMatch) {
                    return res.status(400).json({ success: false, message: 'Old password is incorrect' });
                }
            }
            if (!new_password) {
                return res.status(400).json({ success: false, message: 'New password is required' });
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await Teacher.findByIdAndUpdate(_id, { password: hashedPassword });
            return res.status(200).json({ success: true, message: 'Password updated successfully' });
        }

      
        return res.status(403).json({ success: false, message: 'Access denied. You can only change your own password' });
    } catch (error) {
        next(error);
    }
};
