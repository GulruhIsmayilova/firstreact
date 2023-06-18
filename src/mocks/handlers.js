import { faker } from "@faker-js/faker";
import { rest } from "msw";

let users = [];
for (let index = 0; index < 10; index++) {
  users.push({ name: faker.person.fullName(), email: faker.internet.email() });
}

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    if (req.body.username === "gulruh" && req.body.password === "gulruh123") {
      sessionStorage.setItem("is-auth", "true");

      return res(ctx.status(200));
    } else {
      return res(ctx.status(403));
    }
  }),
  rest.get("/users", (req, res, ctx) => {
    if (sessionStorage.getItem("is-auth") === "true") {
      return res(ctx.status(200), ctx.json(users));
    }
  }),
];
