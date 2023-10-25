const router = require('express').Router();
const ProductController = require('../services/product/productController');

router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);
router.put('/', ProductController.updateProduct);
router.put('/archive/:productId', ProductController.archiveProduct);
router.put('/unarchive/:productId', ProductController.unarchiveProduct);
router.post('/checkout', ProductController.checkoutProducts);
router.post('/create-payment-intent', ProductController.createPaymentIntent);

module.exports = router;
