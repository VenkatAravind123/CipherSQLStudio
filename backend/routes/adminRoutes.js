const express = require('express')
const router = express.Router();
const {requireAuth,requireRole} = require("../middleware/authMiddleware");
const {createAssignment,getAllAssignments,getAssignmentAdmin,updateAssignment,deleteAssignment} = require("../controllers/adminController");

router.post("/addassignment",requireAuth,requireRole("admin"),createAssignment);
router.get("/getallassignments",requireAuth,requireRole("admin"),getAllAssignments);
router.get("/getassignmentadmin/:id",requireAuth,requireRole("admin"),getAssignmentAdmin);
router.put("/updateassignment/:id",requireAuth,requireRole("admin"),updateAssignment);
router.delete("/deleteassignment/:id",requireAuth,requireRole("admin"),deleteAssignment);

module.exports = router;