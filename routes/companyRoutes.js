const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/companyController");

router.post("/", auth, ctrl.createCompany);
router.get("/", auth, ctrl.getCompanies);
router.get("/:id", auth, ctrl.getCompanyDetails);

module.exports = router;