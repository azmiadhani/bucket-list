// Generate Private Key for JWT, change ACCESS_TOKEN_SECRT & REFRESH_TOKEN_SECRET on .env
const crypto = require('crypto');

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
console.table({ key1, key2 });
