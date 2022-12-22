const signupSchema = {
    type: 'object',
    properties: {
      email: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      phone: { type: 'string' },
      password: { type: 'string' },
      confirmPassword: { type: 'string' },
    },
    required: ["email", "firstName", "lastName", "phone", "password", "confirmPassword"],
    additionalProperties: false,
};
  
const loginSchema = {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

const userUpdateSchema = {
  type: 'object',
  properties: {
    newUserInfo: {type: 'object',
      properties: {
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        id:  { type: 'string' },
        bio: { type: 'string' },
      },
      required: ["email", "firstName", "lastName", "phone", "password", "confirmPassword", "id"],
      additionalProperties: false,
    },
    currentUser: {type: 'object',
        properties: {
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        id:  { type: 'string' },
      },
      required: ["email", "firstName", "lastName", "phone", "password", "confirmPassword", "id"],
      additionalProperties: false,
    },
  },
  required: ["newUserInfo", "currentUser"],
  additionalProperties: false,
};

module.exports = {signupSchema, loginSchema, userUpdateSchema}
