const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMongooseSchema = new Schema ({
      email: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      phone: { type: 'string' },
      password: { type: 'string' },
      confirmPassword: { type: 'string' },
      id: { type: 'string', required: false },
      bio:  { type: 'string', required: false },
});

module.exports = mongoose.model('User', userMongooseSchema)