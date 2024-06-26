import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],validateRequest,
  async (req: Request, res: Response) => {

    // instead of these below three lines of code we used validateRequest middleware
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   throw new RequestValidationError(errors.array());
    // }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({});
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    // const userJwt = jwt.sign(payload, secretOrPrivateKey, callback);
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, 
    process.env.JWT_KEY!
  );


    // Store it on session object
    req.session = {
      jwt: userJwt
    }
    console.log(`
      Email: ${user.email}
      Password: ${user.password}`);

    res.status(201).send(user);

  }
);

export { router as signupRouter };
