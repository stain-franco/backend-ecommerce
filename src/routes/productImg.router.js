const { getAll } = require('../controllers/productImg.controllers');
const express = require('express');
const { create, remove } = require('../controllers/productImg.controllers');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const productImgRouter = express.Router();

productImgRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single("images"), create);

productImgRouter.route("/:id")
    .delete(verifyJWT, remove) //hacer esta ruta privada

module.exports = productImgRouter;