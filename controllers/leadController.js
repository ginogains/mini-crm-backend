// controllers/leadController.js
const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
};

exports.getLeads = async (req, res) => {
  const { page = 1, search = "", status } = req.query;

  let query = {
    isDeleted: false,
    name: { $regex: search, $options: "i" },
  };

  if (status) query.status = status;

  const leads = await Lead.find(query)
    .populate("assignedTo company")
    .skip((page - 1) * 5)
    .limit(5);

  res.json(leads);
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ msg: "Soft Deleted" });
};