import jwt from "jsonwebtoken";
import { ENV } from '../constants/env.js';

const JWT_ACCESS = ENV.JWT.ACCESS_KEY;

const JWT_REFRESH = ENV.JWT.REFRESH_KEY;

export const generateToken =
  (payload) => {

  return jwt.sign(
    payload,
    JWT_ACCESS,
    {
      expiresIn: "1d",
    }
  );
};

export const generateAccessToken = (
  payload
) => {
  return jwt.sign(
    payload,
    JWT_ACCESS,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (
  payload
) => {
  return jwt.sign(
    payload,
    JWT_REFRESH,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken =
  (token) => {

  return jwt.verify(
    token,
    JWT_ACCESS
  );
};

export const verifyRefreshToken = (
  token
) => {
  return jwt.verify(
    token,
    JWT_REFRESH
  );
};