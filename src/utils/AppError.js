class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Llama al constructor de la clase Error de Node
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    // Esto nos ayuda a saber que es un error previsto por nosotros, y no un fallo fatal del servidor
    this.isOperational = true; 

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;