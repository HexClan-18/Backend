//Server-side validation
const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("firstname").not().isEmpty().trim().withMessage("All fields required"),
  check("lastname").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginValidator = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  //checking whether result has any errors
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    //catching the error msg in result object
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }

  next();
};
