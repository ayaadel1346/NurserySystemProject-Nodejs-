const teacherSwagger = `
/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API endpoints for managing teachers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *         - password
 *         - email
 *       properties:
 *         fullname:
 *           type: string
 *           description: The full name of the teacher.
 *         username:
 *           type: string
 *           description: The username of the teacher.
 *         password:
 *           type: string
 *           description: The password of the teacher.
 *         email:
 *           type: string
 *           description: The email address of the teacher.
 *         image:
 *           type: string
 *           description: The image URL of the teacher.
 *         role:
 *           type: string
 *           enum: [admin, teacher]
 *           description: The role of the teacher.
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers.
 *     tags:
 *       - Teachers
 *     responses:
 *       200:
 *         description: A list of teachers.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher with the provided details.
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:  
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Teacher created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 * 
 * /teachers/{_id}:
 *   get:
 *     summary: Get a teacher by ID
 *     description: Retrieve a teacher by its ID.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Teacher ID.
 *     responses:
 *       200:
 *         description: A teacher object.
 *       404:
 *         description: Teacher not found.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Update a teacher by ID
 *     description: Update a teacher's details by its ID.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Teacher ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the teacher. (Optional)
 *               username:
 *                 type: string
 *                 description: The username of the teacher. (Optional)
 *               email:
 *                 type: string
 *                 description: The email address of the teacher. (Optional)
 *               password:
 *                 type: string
 *                 description: The password of the teacher. (Optional)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image of the teacher. (Optional)
 *     responses:
 *       200:
 *         description: Teacher updated successfully.
 *       404:
 *         description: Teacher not found.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a teacher by ID
 *     description: Delete a teacher by its ID.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Teacher ID.
 *     responses:
 *       200:
 *         description: Teacher deleted successfully.
 *       404:
 *         description: Teacher not found.
 *       500:
 *         description: Internal server error.
 */`;

module.exports = teacherSwagger;
