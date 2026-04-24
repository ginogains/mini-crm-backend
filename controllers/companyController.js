// controllers/companyController.js
const Company = require("../models/Company");
const Lead = require("../models/Lead");

exports.createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
};

exports.getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

exports.getCompanyDetails = async (req, res) => {
  const company = await Company.findById(req.params.id);
  const leads = await Lead.find({ company: req.params.id });

  res.json({ company, leads });
};