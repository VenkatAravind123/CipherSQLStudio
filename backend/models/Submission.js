const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    query: 
    { 
        type: String, 
        required: true 
    },
    passed: 
    { 
        type: Boolean, 
        default: false 
    },
    userOutput: 
    { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    },
    expectedOutput: 
    { 
        type: mongoose.Schema.Types.Mixed, default: null 
    },
    error: 
    { 
        type: String, 
        default: "" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);