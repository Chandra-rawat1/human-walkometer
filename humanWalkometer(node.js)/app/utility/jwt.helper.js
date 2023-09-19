
'use strict';
const jwt = require('jsonwebtoken');
module.exports = {
  verifyJWTToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.AUTH_TOKEN_SECRET, { algorithm: process.env.AUTH_HASH_ALGORITHM }, (err, decoded) => {
        if (err) {
          return resolve({ success: false, message: err.name });
        }
        return resolve({ success: true, data: decoded });
      });
    });
  },

  generateJwtAuthToken: (signObject, expiryTime) => {
    const token = jwt.sign(signObject, process.env.AUTH_TOKEN_SECRET, {
      algorithm: process.env.AUTH_HASH_ALGORITHM,
      expiresIn: expiryTime || process.env.AUTH_TOKEN_EXPIRES // expires in given hours
    });
    return {
      success: true,
      token: token
    };
  }
};