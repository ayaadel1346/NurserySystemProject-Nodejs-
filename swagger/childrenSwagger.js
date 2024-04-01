const childrenSwagger = `
/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       required:
 *         - fullName
 *         - age
 *         - level
 *         - address
 *         - username
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of the child.
 *         age:
 *           type: integer
 *           description: The age of the child.
 *         level:
 *           type: string
 *           enum: [PreKG, KG1, KG2]
 *           description: The education level of the child.
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: The city where the child lives.
 *             street:
 *               type: string
 *               description: The street where the child lives.
 *             building:
 *               type: string
 *               description: The building where the child lives.
 *         username:
 *           type: string
 *           description: The username of the child.
 *         password:
 *           type: string
 *           description: The password of the child.
 *       example:
 *         fullName: basmala adel
 *         age: 4
 *         level: KG1
 *         address:
 *           city: mansoura
 *           street: Main Street
 *           building: 123
 *         username: basmala123
 *         password: password123
 */

/**
 * @swagger
 * /children:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children.
 *     responses:
 *       200:
 *         description: A list of children.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new child
 *     description: Create a new child with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       201:
 *         description: Child created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 * 
 * /children/{_id}:
 *   get:
 *     summary: Get a child by ID
 *     description: Retrieve a child by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Child ID.
 *     responses:
 *       200:
 *         description: A child object.
 *       404:
 *         description: Child not found.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Update a child by ID
 *     description: Update a child's details by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Child ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: Child updated successfully.
 *       404:
 *         description: Child not found.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a child by ID
 *     description: Delete a child by its ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Child ID.
 *     responses:
 *       200:
 *         description: Child deleted successfully.
 *       404:
 *         description: Child not found.
 *       500:
 *         description: Internal server error.
 */`;

module.exports = childrenSwagger;
