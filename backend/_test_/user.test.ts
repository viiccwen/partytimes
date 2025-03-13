// __test__/user.utils.test.ts
import { expect, spyOn, describe, it, mock } from "bun:test";
import type { Request, Response } from "express";

// Import the controllers (assume they are defined in ../controllers/user-controllers)
import { CheckAuth, DeleteAccount, UpdateUserName } from "../controllers/user-controllers";

// Import all exported members from the utils module so we can override specific functions.
import * as userUtils from "../utils/user";
import type { UserType } from "../utils/user.type";

// Helper function: Create a fake Express response with chained methods.
const createMockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = mock(() => res) as unknown as Response["status"];
  res.json = mock(() => res) as unknown as Response["json"];
  return res as Response;
};

// Helper function: Create a fake Express request.
const createMockRequest = (userData: any, bodyData?: any): Request => {
  return { user: userData, body: bodyData } as Request;
};

const fakeUser: UserType = {
  id: "1",
  email: "test@example.com",
  nickname: "test",
  username: "test",
  password: "test",
  role: "FREE",
  githubId: null,
  googleId: null,
  accessToken: null,
  refreshToken: null,
};

describe("User Controllers", () => {
  // === DeleteAccount Controller Tests ===
  describe("DeleteAccount", () => {
    it("should call deleteUser with the correct user and return status 200 with a success message", async () => {
      const req = createMockRequest(fakeUser);
      const res = createMockResponse();

      const deleteUserSpy = spyOn(userUtils, "deleteUser").mockResolvedValue(fakeUser);

      await DeleteAccount(req, res);

      expect(deleteUserSpy).toHaveBeenCalledWith(fakeUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "帳戶已刪除！" });

      deleteUserSpy.mockRestore();
    });

    it("should return status 500 with an error message if deleteUser fails", async () => {
      const req = createMockRequest(fakeUser);
      const res = createMockResponse();

      const error = new Error("Delete failed");
      const deleteUserSpy = spyOn(userUtils, "deleteUser").mockRejectedValue(error);

      await DeleteAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });

      deleteUserSpy.mockRestore();
    });
  });

  // === CheckAuth Controller Tests ===
  describe("CheckAuth", () => {
    it("should return user basic info with status 200 when user exists", async () => {
      const req = createMockRequest(fakeUser);
      const res = createMockResponse();

      await CheckAuth(req, res);

      const expectedData = {
        id: fakeUser.id,
        nickname: fakeUser.nickname,
        email: fakeUser.email,
      };

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedData);
    });

    it("should return status 500 with an error message when user is missing", async () => {
      // 模擬沒有 user 的請求
      const req = {} as Request;
      const res = createMockResponse();

      await CheckAuth(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      // 取得 json 方法被呼叫時傳入的第一個參數
      const jsonCallArg = (res.json as any).mock.calls[0][0];
      expect(jsonCallArg.error).toBeDefined();
    });
  });

  // === UpdateUserName Controller Tests ===
  describe("UpdateUserName", () => {
    it("should update the user's nickname and return status 200 with the new nickname", async () => {
      const req = createMockRequest(fakeUser, { nickname: "newNickname" });
      const res = createMockResponse();

      const updatedUser: UserType = { ...fakeUser, nickname: "newNickname" };

      // 使用 spyOn 監視並替換 updateUser 的實作，使其回傳 updatedUser
      const updateUserSpy = spyOn(userUtils, "updateUser").mockResolvedValue(updatedUser);

      await UpdateUserName(req, res);

      expect(updateUserSpy).toHaveBeenCalledWith(fakeUser, "nickname", "newNickname");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ nickname: "newNickname" });

      updateUserSpy.mockRestore();
    });

    it("should return status 500 with an error message if updateUser fails", async () => {
      const req = createMockRequest(fakeUser, { nickname: "newNickname" });
      const res = createMockResponse();

      const error = new Error("Update failed");
      const updateUserSpy = spyOn(userUtils, "updateUser").mockRejectedValue(error);

      await UpdateUserName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });

      updateUserSpy.mockRestore();
    });
  });
});
