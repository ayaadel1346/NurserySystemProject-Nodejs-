const bcrypt = require('bcrypt');
const Child = require('../models/childModel');

exports.changePassword = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { new_password, old_password } = req.body;

        const child = await Child.findById(_id);

        if (!child) {
            return res.status(404).json({ success: false, message: 'Child not found' });
        }

        if (req.user.role === 'admin') {
            if (!new_password) {
                return res.status(400).json({ success: false, message: 'New password is required' });
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await Child.findByIdAndUpdate(_id, { password: hashedPassword });
            return res.status(200).json({ success: true, message: 'Password updated successfully' });
        }
        
        if (_id.toString() === req.user.userId.toString()) {
            if (old_password) {
                const passwordMatch = await bcrypt.compare(old_password, child.password);
                if (!passwordMatch) {
                    return res.status(400).json({ success: false, message: 'Old password is incorrect' });
                }
            }
            if (!new_password) {
                return res.status(400).json({ success: false, message: 'New password is required' });
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await Child.findByIdAndUpdate(_id, { password: hashedPassword });
            return res.status(200).json({ success: true, message: 'Password updated successfully' });
        }

        return res.status(403).json({ success: false, message: 'Access denied. You can only change your own password' });
    } catch (error) {
        next(error);
    }
};
