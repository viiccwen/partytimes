const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");

import { handleGoogleOAuthCallback, handleGitHubOAuthCallback } from "../controllers/user-controllers";

const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      callbackURL: `${process.env.AUTH_CALBACK_URL}/api/auth/callback/github`,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      done(null, { provider: "github", ...profile, accessToken });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      callbackURL: `${process.env.AUTH_CALBACK_URL}/api/auth/callback/google`,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      done(null, { provider: "google", ...profile });
    }
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
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/callback/google",
  passport.authenticate("google", { session: false }),
  handleGoogleOAuthCallback
);

export default router;
