const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
{
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        default: "easy"
    },
    category:{
        type:String,
        trim:true
    },

    setupSQL:{
        type:String,
        required:true
    },
    solutionSQL:{
        type:String,
        required:true
    },
    hint:{
            type:String,
            default:""
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Assignment",assignmentSchema);