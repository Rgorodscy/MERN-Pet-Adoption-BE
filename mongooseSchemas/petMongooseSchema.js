const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petMongooseSchema = new Schema ({

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
      _id: { type: 'string' },
      __v:  { type: 'number' },
      userId: { type: 'string' }

});

module.exports = mongoose.model('Pet', petMongooseSchema);