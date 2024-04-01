const authSwagger = `
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Teacher authentication endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new teacher
 *     tags: [Authentication]
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
 *       '201':
 *         description: Registration successful
 *       '400':
 *         description: Email or username already exists
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as a teacher
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username or password
 */
`;

module.exports = authSwagger;
