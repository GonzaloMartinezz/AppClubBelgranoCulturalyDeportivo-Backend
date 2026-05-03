export const getPagination = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

export const getSort = (sort, defaultSort = '-createdAt') => {
    return sort || defaultSort;
};

export const getFilters = (filters) => {
    const query = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (key === 'search') {
                query.$or = [
                    { name: { $regex: value, $options: 'i' } },
                    { lastName: { $regex: value, $options: 'i' } }
                ];
            } else if (key === 'status') {
                query.status = value;
            } else {
                query[key] = value;
            }
        }
    });

    return query;
};