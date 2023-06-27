const express = require('express')

const controller = require('../app/controllers/product_controller')
const verify = require('../app/middleware/auth_verify')


const router = express.Router();



router.use(verify.tokenVerify);



router.get('/', controller.getAll);
router.post('/', controller.addNew);
router.get('/:id', controller.getById);
router.put('/:id', controller.updateProductById);
router.delete('/:id', controller.deleteProductById);



module.exports = router