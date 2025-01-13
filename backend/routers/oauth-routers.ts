import passport from "passport";
import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

import type { VerifyFunction, VerifyCallback } from "passport-oauth2";
import type {
  Profile as GithubProfile,
  StrategyOptions as GitHubStrategyOptions,
} from "passport-github2";
import type {
  Profile as GoogleProfile,
  StrategyOptions as GoogleStrategyOptions,
} from "passport-google-oauth20";

const google_calendar_api = "https://www.googleapis.com/auth/calendar";

import {
  handleGoogleOAuthCallback,
  handleGitHubOAuthCallback,
  getUserEmails,
} from "../controllers/oauth-controllers";
import { createUser, findUser } from "../utils/utils";

const router = Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      callbackURL: `${process.env.AUTH_CALBACK_URL}/api/auth/callback/github`,
    } satisfies GitHubStrategyOptions,
    (async (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done: VerifyCallback
    ) => {
      try {
        const emails = await getUserEmails(accessToken);
        const email = emails.find((email) => email.primary)?.email;
        const user =
          (await findUser("githubId", profile.id)) ||
          (await createUser({
            username: profile.username!,
            email: email!,
            password: "",
            role: "FREE",
            githubId: profile.id,
            googleId: null,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }));

        done(null, user);
      } catch (error) {
        done(error);
      }
    }) satisfies VerifyFunction
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      callbackURL: `${process.env.AUTH_CALBACK_URL}/api/auth/callback/google`,
    } satisfies GoogleStrategyOptions,
    (async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails![0].value;
        const user =
          (await findUser("googleId", profile.id)) ||
          (await createUser({
            username: profile.username!,
            email: email!,
            password: "",
            role: "FREE",
            githubId: null,
            googleId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }));

        done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }) satisfies VerifyFunction
  )
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/auth/callback/github",
  passport.authenticate("github", { session: false }),
  handleGitHubOAuthCallback
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", google_calendar_api],
    accessType: "offline",
    prompt: "consent",
  })
);
router.get(
  "/auth/callback/google",
  passport.authenticate("google", { session: false }),
  handleGoogleOAuthCallback
);

export default router;
