const express = require("express");
const router = express.Router();
const { product } = require("../../controllers");
const authenticate = require("../../utils/authenticate");

// create product
router.post("/new-product", authenticate, product.create);

// update product
router.put("/update/:productId", authenticate, product.updateProduct);

// get user products
router.get("/my-products", authenticate, product.getMyProducts);

module.exports = router;
