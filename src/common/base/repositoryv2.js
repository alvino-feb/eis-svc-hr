import { Prisma } from "@prisma/client";
import { AppError } from "../middlewares/appError.js";
// import { AppError } from "../middlewares/error.js";

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  // ==========================================
  // FIND MANY
  // ==========================================

async findMany(options = {}) {
    try {
        return await this.model.findMany(options);
    } catch (error) {
        this.handleError(error);
    }
}

  // ==========================================
  // FIND FIRST
  // ==========================================

  async findFirst(params = {}) {
    try {
      return await this.model.findFirst(params);
    } catch (error) {
      this.handleError(error);
    }
  }

  // async findFirst(where = {}) {
  //   try {
  //       return await this.model.findFirst({
  //           where,
  //       });
  //   } catch (error) {
  //       this.handleError(error);
  //   }
  // }

  // ==========================================
  // FIND UNIQUE
  // ==========================================

  async findUnique(where) {
    try {
      return await this.model.findUnique({
        where,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // FIND BY ID
  // ==========================================

  async findById(id) {
    try {
      return await this.model.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // CREATE
  // ==========================================

  async create (data) {   
    try {
      return await this.model.create({
        data,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // UPDATE
  // ==========================================

  async update(id, data) {
    try {
      return await this.model.update({
        where: {id},
        data,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateMany(where, data) {
    try {
        return await this.model.updateMany({
            where,
            data,
        });
    } catch (error) {
        this.handleError(error);
    }
  }

  // ==========================================
  // DELETE
  // ==========================================

  async delete(id) {
    try {
      return await this.model.delete({
        where : {id},
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // DELETE MANY
  // ==========================================

  async deleteMany(where) {
    try {
      return await this.model.deleteMany({
        where,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // COUNT
  // ==========================================

  async count(where = {}) {
    try {
      return await this.model.count({
        where,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // EXISTS
  // ==========================================

  async exists(where = {}) {
    try{
      return await this.model.findFirst({
        where,

        select: {
            id: true,
        },
      });
    } catch(error){
      this.handleError(error);
    }
  }

  // ==========================================
  // PAGINATION
  // ==========================================

  async paginate({
    page = 1,
    limit = 10,
    where = {},
    orderBy = {},
    include,
    select,
  }) {
    try {
      const skip = (page - 1) * limit;

      const [rows, total] = await Promise.all([
        this.model.findMany({
          skip,
          take: limit,
          where,
          orderBy,
          include,
          select,
        }),

        this.model.count({
          where,
        }),
      ]);

      return {
        rows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // UPSERT
  // ==========================================

  async upsert(where, create, update) {
    try {
      return await this.model.upsert({
        where,
        create,
        update,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // ==========================================
  // ERROR HANDLER
  // ==========================================

  handleError(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

      // UNIQUE
      if (error.code === "P2002") {
        throw new AppError(
          "Data already exists",
          409,
          "DUPLICATE_DATA"
        );
      }

      // FK CONSTRAINT
      if (error.code === "P2003") {
        throw new AppError(
          "Data cannot be deleted because it is still referenced by another record",
          409,
          "FOREIGN_KEY_CONSTRAINT"
        );
      }

      // RECORD NOT FOUND
      if (error.code === "P2025") {
        throw new AppError(
          "Data not found",
          404,
          "NOT_FOUND"
        );
      }
    }

    throw error;
  }
}