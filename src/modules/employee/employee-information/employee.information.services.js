import repository from "./employee.information.repository.js";
import { AppError } from "../../../common/middlewares/error.js";
import { buildTree } from "../../../common/helpers/treeBuilder.js";
import { buildWhere } from "../../../common/helpers/query.js";

export const list = async (query) => {
  const page =
      Math.max(
          Number(query.page) || 1,
          1
      );
  const limit =
      Math.min(
          Math.max(
              Number(query.limit) || 10,
              1
          ),
          100
      );
  const skip =
      (page - 1) * limit;

  const where = buildWhere(
      query,
      [
          "businessId",
          "businessMemberId"
      ],
      [
          "id"
      ]
  );

  // Filter Status
  if (
      query.isActive !== undefined &&
      query.isActive !== null &&
      query.isActive !== ""
  ) {
      where.isActive =
          query.isActive === true ||
          query.isActive === "true";
  }

  // Search
  if (query.search?.trim()) {
      const keyword =
          query.search.trim();
      where.OR = [
          {
              code: {
                  contains: keyword,
                  mode: "insensitive",
              },
          },
          {
              name: {
                  contains: keyword,
                  mode: "insensitive",
              },
          },
      ];
  }

  // Sorting
  const sortableColumns = [
      "code",
      "name",
      "seqNo",
      "createdAt",
      "updatedAt",
  ];

  const sortBy =
      sortableColumns.includes(query.sortBy)
          ? query.sortBy
          : "createdAt";

  const sortOrder =
      query.sortOrder === "asc"
          ? "asc"
          : "desc";
  
  const [rows, total] =
    await Promise.all([
        repository.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
            // include: {
            //     Warehouse: {
            //         select: {
            //             id: true,
            //             code: true,
            //             name: true,
            //         },
            //     },
            // },
        }),
        repository.count(where),
  ]);

  return {
      data: buildTree(rows),
      meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasPrevious: page > 1,
          hasNext: page < Math.ceil(total / limit),
      },
  };

};

export const create = async (payload) => {
    
    // ==========================================
    // CHECK DUPLICATE
    // ==========================================
    const where = buildWhere(
        payload,
        [
            "businessId",
            "businessMemberId"
        ],
        [
            "employeeNo"
        ]
    );

    const existing = await repository.exists(where);

    if (existing) {
        throw new AppError(
            `Employee no "${payload.employeeNo}" already exists.`,
            409,
            "DUPLICATE_DATA",
            {
                field: "employeeNo",
                value: payload.employeeNo,
            }
        );
    }

    return await repository.create(payload);
};

export const update = async (
    businessId,
    businessMemberId,
    id,
    payload
    ) => 
{

    const exists = await repository.findById(id);

    if (!exists) {
        throw new AppError(
            "Data not found",
            404
        );
    }

    if (
        exists.level === 1 &&
        payload.isActive !== undefined
    ) {
        await repository.updateMany(
            {
                businessId,
                businessMemberId,
                parentId: id,
                level: 2,
            },
            {
                isActive: payload.isActive,
            }
        );
    }
    
    return repository.update(
        id,
        payload
    );
};

export const remove = async (
  businessId,
  businessMemberId,
  id
) => {

    const outlet = await repository.findById(id);

    if (!outlet) {
        throw new AppError(
        "Category not found",
        404
        );
    }

    // ==========================================
    // CHECK CHILD CATEGORY
    // ==========================================
    if (outlet.level === 1) {

        const hasChild = await repository.exists({
            businessId,
            businessMemberId,
            parentId: id,
            level: 2,
        });

        if (hasChild) {
            throw new AppError(
                "Cannot delete category because it has child categories",
                400
            );
        }
    }

    return repository.delete(
        id
    );
};

export const removeProduct = async (
  businessId,
  businessMemberId,
  id
) => {
    const productPrice = await repositoryProductPrice.findById(id);
    console.log(id);
    
    if (!productPrice) {
        throw new AppError(
        "Product Price not found",
        404
        );
    }

    // ==========================================
    // CHECK CHILD CATEGORY
    // ==========================================
    if (productPrice.level === 1) {

        const hasChild = await repositoryProductPrice.exists({
            businessId,
            businessMemberId,
            parentId: id,
            level: 2,
        });

        if (hasChild) {
            throw new AppError(
                "Cannot delete category because it has child categories",
                400
            );
        }
    }

    return repositoryProductPrice.delete(
        id
    );
};