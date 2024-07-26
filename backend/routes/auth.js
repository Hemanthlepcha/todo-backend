import { parseToken, reqToken } from "../helper/jwt.js";
import db from "../models/index.js";
import { AUTH_ERROR, AuthenticationError } from "../helper/error.js";

const MOCK_USER_ID = process.env.MOCK_USER_ID;

const auth = (app) => {
  app.use(async (req, _, next) => {
    try {
      const token = reqToken(req);
      // console.log("auth token:", token);
      if (token) {
        const payload = parseToken(token);
        // console.log("Payload", payload);
        const user = await db.User.findByPk(payload.id);
        // console.log(" auth", user);
        req.userId = user.id;
      } else {
        const user = await db.User.findByPk(MOCK_USER_ID);
        // console.log(user);
        req.userId = user.id;
      }
    } catch (err) {
      console.error(err);
    }
    next();
  });
  app.use(async (req, res, next) => {
    next();
  });
};

export default auth;
