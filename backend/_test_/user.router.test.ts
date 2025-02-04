import express from "express";
import request from "supertest";
import { describe, it, expect, spyOn } from "bun:test";
import * as authModule from "../middlewares/auth";
import * as userControllers from "../controllers/user-controllers";

const createApp = async () => {
  // dynamic import to avoid circular dependencies
  const { default: user_router } = await import("../routers/user-routers");
  const app = express();
  app.use(express.json());
  app.use(user_router);
  return app;
};

spyOn(authModule, "AuthMiddleware").mockImplementation(
  async (req, res, next) => {
    req.user = { id: 1, nickname: "testUser" };
    next();
  }
);

spyOn(userControllers, "CheckAuth").mockImplementation(async (req, res) => {
  res.status(200).json({ message: "Hello from GET /user" });
});
spyOn(userControllers, "DeleteAccount").mockImplementation(async (req, res) => {
  try {
    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting user" });
  }
});
spyOn(userControllers, "UpdateUserName").mockImplementation(
  async (req, res) => {
    res
      .status(200)
      .json({ message: `Nickname updated to ${req.body.nickname}` });
  }
);
const app = await createApp();

describe("User API Routes", () => {
  it("GET /user should return correct message", async () => {
    const res = await request(app).get("/user");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello from GET /user" });
  });

  it("DELETE /user/delete should return delete message", async () => {
    const res = await request(app).delete("/user/delete");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "User deleted" });
  });

  it("POST /user/update/name should return updated nickname message", async () => {
    const res = await request(app)
      .post("/user/update/name")
      .send({ nickname: "newNickname" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Nickname updated to newNickname" });
  });
});
