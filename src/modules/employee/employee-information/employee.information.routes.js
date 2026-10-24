import { Router } from "express";
import * as controller from "./employee.information.controller.js";

const router = Router();

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get Employee List
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: businessMemberId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", controller.list);

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create Employee
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessId
 *               - businessMemberId
 *               - employeeNo
 *               - fullName
 *               - birthPlace
 *               - birthDate
 *               - gender
 *               - maritalStatus
 *               - email
 *               - phone
 *               - address
 *               - photoUrl
 *               - joinDate
 *               - resignDate
 *               - employmentStatus
 *               - isActive
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: 00000000-0000-0000-0000-000000000000
 *               businessMemberId:
 *                 type: string
 *                 example: 00000001-0000-0000-0000-000000000000
 *               employeeNo:
 *                 type: string
 *                 example: business.admin
 *               fullName:
 *                 type: string
 *                 example: Business Administrator
 *               birthPlace:
 *                 type: string
 *                 example: Jakarta
 *               birthDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               gender:
 *                 type: string
 *                 example: MALE
 *               maritalStatus:
 *                 type: string
 *                 example: SINGLE
 *               email:
 *                 type: string
 *                 example: business.admin
 *               phone:
 *                 type: string
 *                 example: 0210000000
 *               address:
 *                 type: string
 *                 example: Jakarta Raya
 *               photoUrl:
 *                 type: string
 *               joinDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               resignDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               employmentStatus:
 *                 type: string
 *                 example: ACTIVE
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /employee:
 *   put:
 *     summary: Update Employee
 *     description: Update Employee
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: businessMemberId
 *         required: true
 *         description: Business Member ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID
 *         schema:
 *           type: string
 *           example: "00000001-0000-0001-0000-000000000000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - birthPlace
 *               - birthDate
 *               - gender
 *               - maritalStatus
 *               - email
 *               - phone
 *               - address
 *               - photoUrl
 *               - joinDate
 *               - resignDate
 *               - employmentStatus
 *               - isActive
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Business Administrator
 *               birthPlace:
 *                 type: string
 *                 example: Jakarta
 *               birthDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               gender:
 *                 type: string
 *                 example: MALE
 *               maritalStatus:
 *                 type: string
 *                 example: SINGLE
 *               email:
 *                 type: string
 *                 example: business.admin
 *               phone:
 *                 type: string
 *                 example: 0210000000
 *               address:
 *                 type: string
 *                 example: Jakarta Raya
 *               photoUrl:
 *                 type: string
 *               joinDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               resignDate:
 *                 type: string
 *                 example: 2026-09-14T00:00:00.000Z
 *               employmentStatus:
 *                 type: string
 *                 example: ACTIVE
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       404:
 *         description: Data not found
 *       400:
 *         description: Validation error
 */
router.put("/", controller.update);

/**
 * @swagger
 * /employee:
 *   delete:
 *     summary: Delete Employee
 *     description: Soft delete by setting deletedAt timestamp
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: businessMemberId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", controller.remove);

export default router;