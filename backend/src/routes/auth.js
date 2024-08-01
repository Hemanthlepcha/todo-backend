// import { AUTH_ERROR, AuthenticationError } from "../helper/error.js";
import UserService from "../models/user/service.js";
const MOCK_USER_ID = process.env.MOCK_USER_ID;
import { parseToken, reqToken } from "../helper/jwt.js";

const auth = (app) => {
  app.use(async (req, _, next) => {
    try {
      const token = reqToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0MGM2N2IwLTRmZWMtMTFlZi1hMDIxLTRiNDY5MThmNGYzMyIsImZpcnN0TmFtZSI6IkhlbWFudGgiLCJpYXQiOjE3MjI1MDYyMDZ9.lt7FvsZTRClHzN2bNe3f4tw5b1RR2w33ygroVUvvtVU"
      );
      console.log("auth token:", token);
      if (token) {
        const payload = parseToken(token);
        // console.log("Payload", payload);
        const user = await UserService.findByPk(payload.id);
        // console.log(" auth", user);
        req.userId = user.id;
      } else {
        const user = await UserService.findByPk(MOCK_USER_ID);
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
