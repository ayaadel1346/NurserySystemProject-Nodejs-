const express = require('express');
const mongoose = require('mongoose');
const { specs, swaggerUi } = require('./swagger');
const childRoutes = require('./Routes/childRoute');
const teacherRoutes = require('./Routes/teacherRoute');
const classRoutes = require('./Routes/classRoute');
const changePasswordRoute = require('./Routes/changePassword');
const authRoutes = require('./Routes/authRoute');
const path = require('path');
require('dotenv').config(); 

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(childRoutes);
app.use(teacherRoutes);
app.use(changePasswordRoute);

app.use(classRoutes);
app.use(authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 

const port = process.env.PORT || 8080; 
const dbUrl = process.env.DB_URL; 

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

module.exports = app;
