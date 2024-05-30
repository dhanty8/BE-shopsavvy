module.exports = (res, statusCode, ok, message, data) => {
  res.status(statusCode).json({
    ok,
    message,
    data: data || null,
  });
};
