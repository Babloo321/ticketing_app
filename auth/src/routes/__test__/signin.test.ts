import request from 'supertest';
import { app } from '../../app';

it("fails when an email that does not exist is supplied", async() => {
  await request(app)
  .post("/api/users/signin")
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(400)
});

it("fails when an incorrect password is supplied", async() => {
  await request(app)
   .post("/api/users/signup")
   .send({
    email:"test@test.com",
    password: "password"
   })
   .expect(201)

 await request(app)
  .post("/api/users/signin")
  .send({
    email: "bablookumar",
    password: "pdfsafas"
  })
  .expect(400)
});

it("response with cookie when given invalid credentials", async() => {
  await request(app)
   .post("/api/users/signup")
   .send({
    email:"test@test.com",
    password: "password"
   })
   .expect(201)

  const response= request(app)
  .post("/api/users/signin")
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(200)

  expect(response.get("Set-Cookie")).toBeDefined
});