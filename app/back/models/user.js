// // const { Schema, model,models } = require("mongoose");
// import mongoose from 'mongoose';
// const Joi = require("joi");
// const handleMongooseError = require("../helpers/handleMongooseError");

// const emailRegext = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// const userSchema = new mongoose.Schema({
//   password: {
//     type: String,
//     required: [true, 'Set password for user'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter"
//   },
//   token: {
//     type: String,
//     default: "",
//   },
//   avatarURL: {
//     type: String,
//     required: true,
//   },
//    verify: {
//     type: Boolean,
//     default: false,
//   },
//   verificationToken: {
//     type: String,
//     required: [true, 'Verify token is required'],
//   },
// }, { versionKey: false, timestamps: true });

// userSchema.post("save", handleMongooseError);

// const registerSchema = Joi.object({
//     name: Joi.string(),
//     email: Joi.string().pattern(emailRegext).required(),
//     password: Joi.string().min(6).required(),
//     subscription: Joi.string(),
// });

// const loginSchema = Joi.object({
//     email: Joi.string().required(),
//     password: Joi.string().min(6).required(),
// });

// const emailSchema = Joi.object({
//   email: Joi.string().pattern(emailRegext).required(),
// })
    
// const schemas = {
//     registerSchema,
//   loginSchema,
//     emailSchema,
// }

// // const User = model("user", userSchema);

// module.exports = mongoose.model('user', userSchema) || mongoose.model("user")  ;
// // module.exports = {
// //   User,
// //   schemas,
// // }