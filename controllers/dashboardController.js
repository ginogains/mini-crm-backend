// controllers/dashboardController.js
const Lead = require("../models/Lead");
const Task = require("../models/Task");

exports.getStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments({ isDeleted: false });
  const qualifiedLeads = await Lead.countDocuments({ status: "Contacted" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasksDueToday = await Task.countDocuments({
    dueDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) }
  });

  const completedTasks = await Task.countDocuments({
    status: "Done"
  });

  res.json({
    totalLeads,
    qualifiedLeads,
    tasksDueToday,
    completedTasks
  });
};