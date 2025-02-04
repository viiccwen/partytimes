// __test__/user.utils.test.ts
import { expect, mock, describe, it } from "bun:test";
import { prisma } from "../db";
import {
  findUser,
  findGuest,
  getUserEmails,
  createUser,
  deleteUser,
  deleteGuest,
  updateUser,
} from "../utils/user";
import type {
  CreateUserType,
  GitHubEmailType,
  UserType,
} from "../utils/user.type";

// --- Create mocks for Prisma methods ---
const findFirst = mock(prisma.user.findFirst);
prisma.user.findFirst = findFirst as unknown as typeof prisma.user.findFirst;

const createMock = mock(prisma.user.create);
prisma.user.create = createMock as unknown as typeof prisma.user.create;

const deleteMock = mock(prisma.user.delete);
prisma.user.delete = deleteMock as unknown as typeof prisma.user.delete;

const updateMock = mock(prisma.user.update);
prisma.user.update = updateMock as unknown as typeof prisma.user.update;

// --- Define fake user data ---
const user: UserType = {
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

const guest: UserType = {
  id: "2",
  email: "test@example.com",
  nickname: "test",
  username: "test",
  password: "test",
  role: "GUEST",
  githubId: null,
  googleId: null,
  accessToken: null,
  refreshToken: null,
};

describe("User Utils", () => {
  // --- Test for findUser ---
  describe("findUser", () => {
    it("should call prisma.user.findFirst with the correct email and return the user", async () => {
      // Arrange: set the mock to resolve with the fake user.
      findFirst.mockResolvedValue(user);

      // Act: call findUser with type "email" and the test email.
      const result = await findUser("email", "test@example.com");

      // Assert: verify the mock was called with the correct parameters.
      expect(findFirst).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      // And that the result equals the fake user.
      expect(result).toEqual(user);
    });
  });

  // --- Test for findGuest ---
  describe("findGuest", () => {
    it("call prisma.user.findFirst with the correct id and role and return the guest", async () => {
      // Arrange: set the mock to resolve with the fake guest.
      findFirst.mockResolvedValue(guest);

      // Act: call findGuest with type "id" and guest id "2".
      const result = await findGuest("id", "2");

      // Assert: verify the mock was called with the correct parameters.
      expect(findFirst).toHaveBeenCalledWith({
        where: { id: "2", role: "GUEST" },
      });
      // And that the result equals the fake guest.
      expect(result).toEqual(guest);
    });
  });

  // --- Test for getUserEmails ---
  describe("getUserEmails", () => {
    it("should fetch GitHub emails and return them", async () => {
      const fakeEmails: GitHubEmailType[] = [
        {
          email: "email@example.com",
          primary: true,
          verified: true,
          visibility: "public",
        },
      ];

      // Arrange: create a fake fetch response.
      const fakeResponse = {
        json: async () => fakeEmails,
      };

      // Override global.fetch with a mock that resolves to fakeResponse.
      (global as any).fetch = mock(() => Promise.resolve(fakeResponse));

      // Act: call getUserEmails with a fake token.
      const result = await getUserEmails("fakeToken");

      // Assert: verify the result equals the fake emails.
      expect(result).toEqual(fakeEmails);
    });

    it("should throw an error when fetch fails", async () => {
      // Arrange: override global.fetch to reject with an error.
      (global as any).fetch = mock(() =>
        Promise.reject(new Error("fetch error"))
      );

      // Act & Assert: calling getUserEmails should reject with the expected error message.
      await expect(getUserEmails("fakeToken")).rejects.toThrow(
        "取得email失敗..."
      );
    });
  });

  // --- Test for createUser ---
  describe("createUser", () => {
    it("should call prisma.user.create with the correct data and return the created user", async () => {
      const newUser: CreateUserType = {
        username: "newUser",
        nickname: "newUser",
        email: "new@example.com",
        password: "",
        role: "FREE",
        githubId: null,
        googleId: null,
        accessToken: null,
        refreshToken: null,
      };
      const createdUser = { id: "3", ...newUser };

      // Arrange: set the create mock to resolve with the createdUser.
      createMock.mockResolvedValue(createdUser);

      // Act: call createUser with the newUser data.
      const result = await createUser(newUser);

      // Assert: verify the create mock was called correctly.
      expect(createMock).toHaveBeenCalledWith({
        data: { ...newUser },
      });
      expect(result).toEqual(createdUser);
    });
  });

  // --- Test for deleteUser ---
  describe("deleteUser", () => {
    it("should call prisma.user.delete with the correct id and return the deleted user", async () => {
      // Arrange: set the delete mock to resolve with the fake user.
      deleteMock.mockResolvedValue(user);

      // Act: call deleteUser with the fake user.
      const result = await deleteUser(user);

      // Assert: verify the delete mock was called with the correct parameters.
      expect(deleteMock).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(result).toEqual(user);
    });

    it("should throw an error if deletion fails", async () => {
      // Arrange: set the delete mock to reject with an error.
      deleteMock.mockRejectedValue(new Error("delete error"));

      // Act & Assert: calling deleteUser should throw the expected error.
      await expect(deleteUser(user)).rejects.toThrow("刪除失敗...");
    });
  });

  // --- Test for deleteGuest ---
  describe("deleteGuest", () => {
    it("should call prisma.user.delete with the correct guest id and role and return the deleted guest", async () => {
      // Arrange: set the delete mock to resolve with the fake guest.
      deleteMock.mockResolvedValue(guest);

      // Act: call deleteGuest with the guest's id.
      const result = await deleteGuest(guest.id);

      // Assert: verify the delete mock was called with the correct parameters.
      expect(deleteMock).toHaveBeenCalledWith({
        where: { id: guest.id, role: "GUEST" },
      });
      expect(result).toEqual(guest);
    });
  });

  // --- Test for updateUser ---
  describe("updateUser", () => {
    it("should call prisma.user.update with the correct parameters and return the updated user", async () => {
      const updatedUser = { ...user, nickname: "updatedName" };

      // Arrange: set the update mock to resolve with the updated user.
      updateMock.mockResolvedValue(updatedUser);

      // Act: call updateUser with the fake user, updating the nickname.
      const result = await updateUser(user, "nickname", "updatedName");

      // Assert: verify the update mock was called with the correct parameters.
      expect(updateMock).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { nickname: "updatedName" },
      });
      expect(result).toEqual(updatedUser);
    });

    it("should throw an error if update fails", async () => {
      // Arrange: set the update mock to reject with an error.
      updateMock.mockRejectedValue(new Error("update error"));

      // Act & Assert: calling updateUser should throw the expected error.
      await expect(updateUser(user, "nickname", "updatedName")).rejects.toThrow(
        "更新名稱失敗..."
      );
    });
  });
});
