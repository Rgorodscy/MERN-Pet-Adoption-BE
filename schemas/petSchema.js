const petSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      name: { type: 'string' },
      adoptionStatus: { type: 'string' },
      image: { type: 'string' },
      height: { type: 'number' },
      weight: { type: 'number' },
      color: { type: 'string' },
      bio: { type: 'string' },
      hypoallergenic: { type: 'boolean' },
      dietary: { type: 'string' },
      breed: { type: 'string' },
      id: { type: 'string' },
      __v:  { type: 'number' },
      userId: { type: 'string' }
    },
    required: ["type", "name", "adoptionStatus", "image", "height", "weight", "color", "bio", "hypoallergenic", "dietary", "breed"],
    additionalProperties: false,
};
  
module.exports = {petSchema}

