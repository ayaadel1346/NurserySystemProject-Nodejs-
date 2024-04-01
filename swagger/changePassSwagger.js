const changePassSwagger = `
/**
 * @swagger
 * tags:
 *   name: Change Password
 *   description: Endpoints for changing passwords of teachers and children
 */

/**
 * @swagger
 * /teachers/change-password/{_id}:
 *   patch:
 *     summary: Change password for a teacher
 *     tags: [Change Password]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the teacher
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 description: The old password of the teacher
 *                 example: oldPassword123
 *               new_password:
 *                 type: string
 *                 description: The new password for the teacher
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /children/change-password/{_id}:
 *   patch:
 *     summary: Change password for a child
 *     tags: [Change Password]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the child
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 description: The old password of the child
 *                 example: oldPassword123
 *               new_password:
 *                 type: string
 *                 description: The new password for the child
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Child not found
 *       500:
 *         description: Internal server error
 */`;

module.exports = changePassSwagger;

