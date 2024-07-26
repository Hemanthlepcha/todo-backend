import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const getTokenSecret = () => secret;
export const reqToken = (req) => req.headers.authorization ?.split(" ")[1];

export const parseToken = (reqToken) => jwt.verify(reqToken, secret);

export default { getTokenSecret, reqToken, parseToken };
