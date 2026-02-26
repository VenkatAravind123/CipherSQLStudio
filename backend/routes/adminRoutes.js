const express = require('express')
const router = express.Router();
const {requireAuth,requireRole} = require("../middleware/authMiddleware");
const {createAssignment,getAllAssignments,getAssignmentAdmin,updateAssignment,getExpectedOutput} = require("../controllers/adminController");

router.post("/addassignment",requireAuth,requireRole("admin"),createAssignment);
router.get("/getallassignments",requireAuth,requireRole("admin"),getAllAssignments);
router.get("/getassignmentadmin/:id",requireAuth,requireRole("admin"),getAssignmentAdmin);
router.put("/updateassignment/:id",requireAuth,requireRole("admin"),updateAssignment);

module.exports = router;