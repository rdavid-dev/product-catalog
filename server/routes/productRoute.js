const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.getProducts);
router.get('/top-rated', productController.getTopProducts);
router.post('/enquire', productController.storeEnquire);

module.exports = router;
