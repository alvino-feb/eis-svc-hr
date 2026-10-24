export const buildWhere = (
    query,
    required = [],
    optional = []
) => {

    const where = {};

    // Required fields
    for (const field of required) {
        where[field] = query[field];
    }

    // Optional fields
    for (const field of optional) {

        const value = query[field];

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            where[field] = value;
        }

    }

    return where;

};