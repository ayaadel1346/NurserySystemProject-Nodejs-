const { body, param } = require("express-validator");
const Teacher = require("../../models/teacherModel"); 
const Child = require("../../models/childModel"); 
const Class= require("../../models/classModel"); 

exports.insertValidator = [
  body("name")
  .isString()
  .withMessage("Class name should be a string")
  .isLength({ min: 3 })
  .withMessage("Class name should have a minimum length of 3 characters")
  .custom(async (value) => {
     
      const existingClass = await Class.findOne({ name: value });
      if (existingClass) {
          throw new Error("Class name already exists");
      }
  }),
  body("children")
    .isArray()
    .withMessage("Children should be an array"),

    body("children.*")
    .isInt()
    .withMessage("Child ID in children array should be an integer")
    .custom(async (value) => {
      const child = await Child.findById(value);
      if (!child) {
        throw new Error(`Child with ID ${value} not found`);
      }
    })
];


exports.updateValidator = [
  body("_id")
    .optional()
    .isInt()
    .withMessage("Class ID should be an integer"),
  
  body("name")
    .optional()
    .isString()
    .withMessage("Class name should be a string")
    .isLength({ min: 3 })
    .withMessage("Class name should have minimum length of 3 characters")
    .custom(async (value) => {
     
      const existingClass = await Class.findOne({ name: value });
      if (existingClass) {
          throw new Error("Class name already exists");
      }
  }),
  
    body("supervisor")
    .optional()
    .isInt()
    .withMessage("Supervisor ID should be an integer")
    .custom(async (value) => {
      if (value) {
        const teacher = await Teacher.findById(value);
        if (!teacher) {
          throw new Error("Supervisor not found");
        }
      }
    }),
  
  body("children")
    .optional()
    .isArray()
    .withMessage("Children should be an array"),
  
    body("children.*")
    .optional()
    .isInt()
    .withMessage("Child ID in children array should be an integer")
    .custom(async (value) => {
      if (value) {
        const child = await Child.findById(value);
        if (!child) {
          throw new Error(`Child with ID ${value} not found`);
        }
      }
    })
];

exports.deleteValidator = [
  param("_id")
    .isInt()
    .withMessage("Class ID must be an int")
];

exports.getByIdValidator = [
  param("_id")
    .isInt()
    .withMessage("Class ID must be an int")
];
