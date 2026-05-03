export const successResponse = (data, message = 'Éxito') => ({ success: true, message, data });
export const createdResponse = (data, message = 'Creado exitosamente') => ({ success: true, message, data });
export const updatedResponse = (data, message = 'Actualizado exitosamente') => ({ success: true, message, data });
export const deletedResponse = (message = 'Eliminado exitosamente') => ({ success: true, message });
export const paginatedResponse = (data, meta) => ({ success: true, data, meta });

export const errorResponse = (error) => {
  const statusCode = error.statusCode || 500;
  return {
    success: false,
    statusCode,
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };
};