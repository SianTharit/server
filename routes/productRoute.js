const express = require("express");
const ProductController = require("../controllers/productController");

const upload = require("../middlewares/upload");

const router = express.Router();

// get All products
router.get("/", ProductController.getAllProducts);

// search
router.get("/search", ProductController.getSearch);

// get Sale products
router.get("/sale", ProductController.getProductsSale);

// get Product by id
router.get("/:productId", ProductController.getProductById);

// create Product with description
router.post(
   "/create",
   upload.array("images", 6),
   ProductController.createProduct
);

// create Product with Stock
router.post("/:productId/stocks", ProductController.createStock);

router.put("/:productId/edit", ProductController.updateProduct);

// create Product with single image
router.post(
   "/:productId/single",
   upload.single("image"),
   ProductController.addImage
);

router.delete("/:productId", ProductController.deleteProduct);
// create Product with multiple images
// router.post(
//    "/:productId/multiple",
//    upload.array("images", 6),
//    ProductController.multiImage
// );

module.exports = router;
