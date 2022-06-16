module.exports = (err, req, res, next) => {
   if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
   ) {
      err.statusCode = 400;
      err.message = err.errors[0].message;
   }
   if (err.name === "TokenExpiredError") {
      err.statusCode = 401;
      err.message = "Token expired";
   }
   if (err.name === "JsonwebtokenError") {
      err.statusCode = 401;
      err.message = "Invalid token";
   }

   res.status(err.statusCode || 500).json({ message: err.message });
};
