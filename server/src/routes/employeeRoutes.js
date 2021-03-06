/**
  
 *
 */
const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const EmployeeService = require('src/services/EmployeeService');
const EmployeeController = require('src/controllers/EmployeeController');
const employeeController = new EmployeeController(new EmployeeService());
const { authenticateRoute } = require('src/helpers/auth');

/**
 * GET: /api/products endpoint to get records for provided userId and jobname
 * Possible outcomes:
 * Successfully fetches all records { "success": true, "statusCode": 200, "result": [] }
 * SQL Errors: I.e., { "success": false, "statusCode": 500, "error": {} }
 */
router.route(`/`).get(employeeController.getAll);
router.route(`/:BannerId/:RoleId`).put(employeeController.deleteUserRole);
router.route(`/add`).put(employeeController.addUserRole);
router.route(`/role`).get(employeeController.getRole);
router.route(`/student`).get(employeeController.getStudent);

module.exports = router;
