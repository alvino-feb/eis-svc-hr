import bcrypt from "bcrypt";
import { ENV } from '../constants/env.js';

export const hashPassword =    
  async (password) => {

  return bcrypt.hash(
    password,
    Number(ENV.SALT_ROUND)
  );
};

export const comparePassword =
  async (
    password,
    hash
  ) => {

  return bcrypt.compare(
    password,
    hash
  );
};