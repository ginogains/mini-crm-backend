const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["Pending", "Done"],
    default: "Pending"
  },
  dueDate: Date,
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);