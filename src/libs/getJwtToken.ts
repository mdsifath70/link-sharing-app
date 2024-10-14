import jwt from "jsonwebtoken";

export default function getJwtToken(payload: object) {
  const token = jwt.sign({ sub: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
}
