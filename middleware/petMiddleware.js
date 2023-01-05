const Ajv = require('ajv');
const { readPetById } = require('../models/petModels');
const ajv = new Ajv();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer  = require('multer')

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
  const petId = req.params.id
  const foundPet = await readPetById(petId);
  const petAdoptStatus = foundPet[0].adoptionStatus;
  if(petAdoptStatus === "Adopted"){
    res.status(400).send("Pet already adopted");
    return;
  }
  if(petAdoptStatus === "Available"){
    next();
  }
  if(petAdoptStatus === "Fostered"){
    const userId = req.body.userId;
    const sameUser = foundPet[0].userId === userId;
    if(sameUser){
      next();
    }
    else{
      res.status(400).send("Pet already fostered by another user");
      return;
    }
  }
}

async function checkPetNotAvailable(req, res, next) {
  const petId = req.params.id
  const foundPet = await readPetById(petId);
  const petAdoptStatus = foundPet[0].adoptionStatus;

  if(petAdoptStatus === "Available"){
    res.status(400).send("Pet already available");
    return;
  }
  next();
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
  }
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
  }
}


module.exports = { validateBody, checkPetAvailable, checkPetNotAvailable, upload, rebuildReqBody };