 const { checkSchema } = require("express-validator");
const { route } = require("express/lib/application");
const user = require("../controller/user.controller.js");
const router = require("express").Router();
// const { check } = require('express-validator');
const  {UserSchema}  = require('../validators/user.validator');
const validate = require('../validators/index');

// Create a new user
router.post("/register", validate(UserSchema), user.register);
router.post("/login", user.login);
router.get("/dashboard/:id",   user.dashboard);



// router.get("/read",employee.findMany);

// //Retrieve a single tutorial with id
// router.get("/read/:id", employee.findOne);

// // Update a employee with id
// router.post("/login", employee.login);
// router.post("/register", employee.register);

 
// //delete a user with the specified id in the request
module.exports = router;






































































// router.delete("/delete/:id", employee.delete);

// module.exports = router;
































































































































































































































































































































