const express=require('express')
const router=express.Router()
const {body}=require("express-validator")
const userController=require('../controllers/user.controller')

router.post('/register', [
    body("FullName.FirstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),

    body("FullName.LastName")
      .optional({ values: "falsy" })//values: "falsy" already null, undefined, "", 0, aur false ko optional maanta hai, isliye
      .trim()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters"),
  ], userController.registerUser)

module.exports=router
