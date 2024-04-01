const classSwagger = `
/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the class.
 *         supervisor:
 *           type: integer
 *           description: The ID of the supervisor teacher.
 *         children:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of child IDs belonging to the class.
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes.
 *     responses:
 *       200:
 *         description: A list of classes.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new class
 *     description: Create a new class with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 * /classes/{_id}:
 *   get:
 *     summary: Get a class by ID
 *     description: Retrieve a class by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID.
 *     responses:
 *       200:
 *         description: A class object.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Update a class by ID
 *     description: Update a class's details by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated successfully.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a class by ID
 *     description: Delete a class by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Class ID.
 *     responses:
 *       200:
 *         description: Class deleted successfully.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Internal server error.
 */`;

module.exports = classSwagger;
