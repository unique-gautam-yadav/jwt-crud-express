const Product = require('../models/product_model')

module.exports.getAll = async (req, res) => {

    try {
        var data = await Product.find()

        res.json({ success: true, data: data, })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id

        const data = await Product.findById(id);

        if (!data) {
            res.status(404).json({ success: false, message: 'Product not fount by the given id' })
        }
        return res.json({ success: true, data: data })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.addNew = async (req, res) => {
    try {
        const { productId, productName, expiryDate, quantity } = req.body

        const existing = await Product.findOne({ productId })

        if (existing) {
            return res.status(401).json({ success: false, message: "Product already exists by this ID try changing id or check the list of the products" })
        }

        const p = new Product({ productId: productId, productName: productName, expiryDate: expiryDate, quantity: quantity })

        await p.save();


        return res.status(201).json({ success: true, message: "Product created successfully now you can go and check the updated list of the products.", product: p })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;


        const p = await Product.findByIdAndDelete(id)

        if (!p) {
            return res.status(500).json({ success: false, message: "Product not found" })
        }

        res.json({ success: true, message: "Product deleted successfully", product: p })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.updateProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const { productId, productName, expiryDate, quantity } = req.body;

        const p = await Product.findByIdAndUpdate(id, { productId, productName, expiryDate, quantity })

        if (!p) {
            return res.status(404).json({ success: false, message: "Product not found on corresponding id" })
        }

        return res.json({ success: true, message: "Product updated successfully", product: p })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}