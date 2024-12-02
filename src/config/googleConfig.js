import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const prisma = new PrismaClient();

export const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: { id: profile.id },
      });
      if (!user) {
        user = profile;
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);
