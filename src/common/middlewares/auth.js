import {
  verifyToken
}
from "../helpers/jwt.js";

import {
  AppError
}
from "./error.js";

export const authenticate =
  (
    req,
    res,
    next
  ) => {

  const header =
    req.headers.authorization;

  if (!header) {
    return next(
      new AppError(
        "Unauthorized",
        401
      )
    );
  }

  const token =
    header.replace(
      "Bearer ",
      ""
    );

  try {

    req.user =
      verifyToken(
        token
      );

    next();

  } catch {

    next(
      new AppError(
        "Invalid token",
        401
      )
    );
  }
};