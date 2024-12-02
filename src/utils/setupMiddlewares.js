import { json, urlencoded } from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { AppError, globalErrorHandler } from "./errorHandler.js";
import cookieParser from "cookie-parser";
import ERROR_CODES from "../constants/errorCode.js";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { googleOauth } from "../config/googleConfig.js";
import session from "express-session";

export default function setupMiddlewares(app) {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(json({ limit: "600mb" }));
  app.use(urlencoded({ extended: true, limit: "600mb" }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(googleOauth);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
      if (!req.user.role) {
        res.redirect(
          `http://localhost:5173/signup/occupation?userId=${req.user.id}&firstName=${req.user.name.familyName}&lastName=${req.user.name.givenName}&email=${req.user.emails[0].value}&avatarUrl=${req.user.photos[0].value}`
        );
      } else {
        res.redirect(
          `http://localhost:5173/login?userId=${req.user.id}&avatarUrl=${req.user.avatarUrl}&role=${req.user.role}`
        );
      }
    }
  );
  app.use("/api", routes);
  app.all("*", (req, res, next) => {
    next(
      new AppError({
        message: `Can't find ${req.originalUrl} on this server`,
        errorCode: ERROR_CODES.AUTH.URL_NOT_FOUND,
        statusCode: StatusCodes.NOT_FOUND,
      })
    );
  });
  app.use(globalErrorHandler);
}
