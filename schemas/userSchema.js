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


module.exports = {signupSchema, loginSchema}
