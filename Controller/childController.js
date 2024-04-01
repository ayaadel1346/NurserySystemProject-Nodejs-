const Child = require('../models/childModel');

const bcrypt = require('bcrypt');

exports.getAllChildren = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Only admin can get all children.' });
        }

        const children = await Child.find();
        res.status(200).json({ data: children });
    } catch (error) {
        next(error);
    }
};

exports.getChildById = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const tokenid = req.user.userId;
        const tokenRole = req.user.role;

        if (tokenRole === 'admin') {
           
            const child = await Child.findById(_id);

            if (!child) {
                return res.status(404).json({ error: 'Child not found' });
            }

            return res.status(200).json({ data: child });
        } 
       
        else if (_id.toString() === tokenid.toString()) {
            const child = await Child.findById(_id);

            if (!child) {
                return res.status(404).json({ error: 'Child not found' });
            }

            return res.status(200).json({ data: child });
        } 
       
        else {
            return res.status(403).json({ error: 'Access denied. You can only get your own child data.' });
        }
    } catch (error) {
        next(error);
    }
};



exports.insertChild = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;

        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Only admin can insert a new child.' });
        }

        const { fullName, username, password, age, level, address } = req.body;
        const { city, street, building } = address;

        const newChild = await Child.create({
            fullName,
            username,
            password,
            age,
            level,
            address: { city, street, building },
           
        });

        res.status(201).json({ data: newChild, message: 'Child added successfully' });
    } catch (error) {
        console.error('Error inserting child:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updateChild = async (req, res, next) => {
    try {
        const updatedFields = req.body;
        const { _id } = req.params;
        const tokenid = req.user.userId;

        let child = null;

        if (req.user.role === 'admin') {

            if ('password' in updatedFields) {
                const hashedPassword = await bcrypt.hash(updatedFields.password, 10);
                updatedFields.password = hashedPassword;
            }
            child = await Child.findByIdAndUpdate(_id, updatedFields, { new: true });
        } 
        
        else if (_id.toString() === tokenid.toString()) {
            if ('password' in updatedFields) {
                return res.status(403).json({ error: 'Changing password is not allowed , if you want to change it go :/childrens/change-password' });
            }
            child = await Child.findByIdAndUpdate(_id, updatedFields, { new: true });
        } 
        else {
            return res.status(403).json({ error: 'Access denied. You can only update your own data' });
        }

        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        return res.status(200).json({ data: child, message: 'Child updated successfully' });
    } catch (error) {
        console.error('Error updating child:', error);
        return res.status(500).json({ error: 'Failed to update child.' });
    }
};

exports.deleteChildById = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Only admin can delete a child.' });
        }

        const deletedChild = await Child.findByIdAndDelete(req.params._id);
        if (!deletedChild) {
            return res.status(404).json({ error: 'Child not found' });
        }
        res.status(200).json({ data: deletedChild, message: 'Child deleted successfully' });
    } catch (error) {
        next(error);
    }
};
