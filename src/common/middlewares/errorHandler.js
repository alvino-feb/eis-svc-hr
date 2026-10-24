// src/common/errors/errorHandler.js

import { Prisma } from "@prisma/client";
import { AppError } from "./error.js";

const prismaErrorMap = {

    // Value terlalu panjang
    P2000: {
        statusCode: 400,
        code: "VALUE_TOO_LONG",
        message: "Value is too long.",
    },

    // Unique constraint
    P2002: {
        statusCode: 409,
        code: "DUPLICATE_DATA",
        message: "Data already exists.",
    },

    // Foreign key constraint
    P2003: {
        statusCode: 409,
        code: "REFERENCE_CONSTRAINT",
        message:
            "Operation violates a data relationship.",
    },

    // Record tidak ditemukan
    P2025: {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Data not found.",
    },
};


export const errorHandler = (
    err,
    req,
    res,
    next
) => {

    // ==========================================
    // LOG ERROR
    // ==========================================

    console.error({
        method: req.method,
        path: req.originalUrl,
        error: err,
    });


    // ==========================================
    // APP ERROR
    // ==========================================

    if (err instanceof AppError) {

        return res.status(
            err.statusCode
        ).json({

            success: false,

            code:
                err.code,

            message:
                err.message,

            ...(err.details
                ? {
                    details:
                        err.details,
                }
                : {}),
        });
    }


    // ==========================================
    // PRISMA ERROR
    // ==========================================

    if (
        err instanceof
        Prisma.PrismaClientKnownRequestError
    ) {

        const mapped =
            prismaErrorMap[
                err.code
            ];


        if (mapped) {

            let message =
                mapped.message;


            // P2002
            if (
                err.code === "P2002"
            ) {

                const fields =
                    err.meta?.target ?? [];


                if (
                    fields.includes(
                        "code"
                    )
                ) {

                    message =
                        "Code already exists.";
                }


                return res
                    .status(
                        mapped.statusCode
                    )
                    .json({

                        success: false,

                        code:
                            mapped.code,

                        message,

                        fields,
                    });
            }


            return res
                .status(
                    mapped.statusCode
                )
                .json({

                    success: false,

                    code:
                        mapped.code,

                    message,
                });
        }
    }


    // ==========================================
    // UNKNOWN ERROR
    // ==========================================

    return res
        .status(500)
        .json({

            success: false,

            code:
                "INTERNAL_SERVER_ERROR",

            message:
                "Internal server error.",
        });
};