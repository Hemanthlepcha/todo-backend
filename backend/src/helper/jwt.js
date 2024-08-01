import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const getTokenSecret = () => secret;
export const reqToken = (req) => {
  if (req && req.headers && req.headers.authorization) {
    console.log("No header");
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

console.log("reqToken", reqToken);

export const parseToken = (reqToken) => {
  if (!reqToken) {
    throw new Error("Token is required");
  }
  return jwt.verify(reqToken, secret);
};
export default { getTokenSecret, reqToken, parseToken };
