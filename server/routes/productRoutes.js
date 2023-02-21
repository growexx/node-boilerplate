const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const GetProductController = require('../services/getProduct/getProductController');
const AddProductController = require('../services/addProduct/addProductController');
const EditProductController = require('../services/editProduct/editProductController');
const DeleteProductController = require('../services/deleteProduct/deleteProductController');

router.get('/', AuthMiddleWare, ACLMiddleWare, GetProductController.getProduct);
router.get(
  '/details',
  AuthMiddleWare,
  ACLMiddleWare,
  GetProductController.getProductDetails
);
router.post(
  '/',
  AuthMiddleWare,
  ACLMiddleWare,
  AddProductController.addProduct
);
router.put(
  '/',
  AuthMiddleWare,
  ACLMiddleWare,
  EditProductController.editProduct
);
router.delete(
  '/',
  AuthMiddleWare,
  ACLMiddleWare,
  DeleteProductController.deleteProduct
);

module.exports = router;
