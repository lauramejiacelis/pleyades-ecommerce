
//Validation middleware
const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    return next(new Error(`${err.name}: ${err.errors}`))
  }
};


export default validationMiddleware;