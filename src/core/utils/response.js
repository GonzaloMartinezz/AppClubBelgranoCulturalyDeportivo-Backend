export const successResponse = (data, message = 'Success') => ({
    success: true,
    message,
    data
});

export const createdResponse = (data, message = 'Created successfully') => ({
    success: true,
    message,
    data
});

export const updatedResponse = (data, message = 'Updated successfully') => ({
    success: true,
    message,
    data
});

export const deletedResponse = (message = 'Deleted successfully') => ({
    success: true,
    message
});

export const paginatedResponse = (data, meta) => ({
    success: true,
    data,
    meta: {
        ...meta,
        hasNextPage: meta.page * meta.limit < meta.total,
        hasPrevPage: meta.page > 1
    }
});