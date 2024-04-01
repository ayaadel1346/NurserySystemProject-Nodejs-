const Class = require('../models/classModel');

exports.getAllClasses = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied, Only admin can get all classes.' });
        }

        const classes = await Class.find();
        res.status(200).json({ data: classes });
    } catch (error) {
        next(error);
    }
};

exports.getClassById = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied,Only admin can get class by ID.' });
        }

        const classInstance = await Class.findById(req.params._id);
        if (!classInstance) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.status(200).json({ data: classInstance });
    } catch (error) {
        next(error);
    }
};

exports.insertClass = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied, Only admin can insert new class.' });
        }

        const newClass = await Class.create(req.body);
        res.status(201).json({ data: newClass, message: 'Class added successfully' });
    } catch (error) {
        next(error);
    }
};

exports.updateClass = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied,Only admin can update class.' });
        }

        const updatedClass = await Class.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.status(200).json({ data: updatedClass, message: 'Class updated successfully' });
    } catch (error) {
        next(error);
    }
};

exports.deleteClassById = async (req, res, next) => {
    try {
        const tokenRole = req.user.role;
        
        if (tokenRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied, Only admin can delete a class.' });
        }

        const deletedClass = await Class.findByIdAndDelete(req.params._id);
        if (!deletedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.status(200).json({ data: deletedClass, message: 'Class deleted successfully' });
    } catch (error) {
        next(error);
    }
};
