const Ajv = require('ajv');
const ajv = new Ajv();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer  = require('multer')
const Pet = require('../models/petModels');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
}

async function checkPetAvailable(req, res, next) {
  try{
    const petId = req.params.id;
    const foundPet = await Pet.readPetById(petId);
    const petAdoptStatus = foundPet.adoptionStatus;
    if(petAdoptStatus === "Adopted"){
      res.status(400).send("Pet already adopted");
      return;
    };
    if(petAdoptStatus === "Available"){
      next();
    };
    if(petAdoptStatus === "Fostered"){
      const userId = req.body.userId;
      const sameUser = foundPet.userId === userId;
      if(sameUser){
        next();
      }
      else{
        res.status(400).send("Pet already fostered by another user");
        return;
      };
    };
  }catch(err){
    console.log(err);
    throw err;
  };
};

async function checkPetNotAvailable(req, res, next) {
  try{
    const petId = req.params.id;
    const foundPet = await Pet.readPetById(petId);
    const petAdoptStatus = foundPet.adoptionStatus;
  
    if(petAdoptStatus === "Available"){
      res.status(400).send("Pet already available");
      return;
    }
    next();
  }catch(err){
    console.log(err);
    throw err;
  };
}


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const rebuildReqBody = (req, res, next) => {
  if(!req.file.path){
    const newBody = {
      ...req.body,
      image: '',
      hypoallergenic: Boolean(req.body.hypoallergenic),
      height: Number(req.body.height),
      weight: Number(req.body.weight),
    }
    req.body = newBody;
    next();
  };
  if(req.file.path){
    const newBody = {
      ...req.body,
      image: req.file.path,
      hypoallergenic: Boolean(req.body.hypoallergenic),
      height: Number(req.body.height),
      weight: Number(req.body.weight),
    }
    req.body = newBody;
    next();
  };
}

const buildSearchParams = (req, res, next) => {
  try{
    let minHeightInput = req.query.minHeight;
    let maxHeightInput = req.query.maxHeight;
    let minWeightInput = req.query.minWeight;
    let maxWeightInput = req.query.maxWeight;
    let nameInput = req.query.name;
    minHeightInput ? req.query.height = { $gte: Number(minHeightInput)} : '';
    maxHeightInput ? req.query.height = { $lte: Number(maxHeightInput)} : '';
    minHeightInput && maxHeightInput ? req.query.height = { $gte: Number(minHeightInput), $lte: Number(maxHeightInput)} : '';
    minWeightInput ? req.query.minWeight = { $gte: Number(minWeightInput)} : '';
    maxWeightInput ? req.query.maxWeight = { $lte: Number(maxWeightInput)} : '';
    minWeightInput && maxWeightInput ? req.query.weight = { $gte: Number(minWeightInput), $lte: Number(maxWeightInput)} : '';
    delete req.query.minHeight;
    delete req.query.maxHeight;
    delete req.query.minWeight;
    delete req.query.maxWeight;
    for(let key in req.query){
      nameInput ? req.query.name = { $regex: nameInput, $options: 'i' } : '';
      if(req.query[key] === '' || req.query[key] === 'Any'){
        delete req.query[key]
      }
    };
    next();
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = { validateBody, checkPetAvailable, checkPetNotAvailable, upload, rebuildReqBody, buildSearchParams };