import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  const { email, password } = req.body;
  const user = {
    email,password
  }
  res.status(201).send(user);
});

export { router as signinRouter };
