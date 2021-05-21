module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  activationTokenSecret: process.env.ACTIVATION_TOKEN_SECRET,
};
