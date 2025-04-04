const { model } = require('mongoose')
const ProductModel = require('../model/ProductModel')

class ProductController {
    async register(req, res) {
        await new ProductModel(req.body)
            .save()
            .then(response => {
                return res.status(200).json({
                    product: response,
                    msg: 'Produto cadastrado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await ProductModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await ProductModel.find({ _id: { '$ne': null } })
            .sort('product')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listAllProducts(req, res) {
        try {
            const products = await ProductModel.find({
                 _id: { '$ne': null } ,
                 isProduct: true
                })
                .sort('product')

            return await res.status(200).json({
                products
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async listAllServices(req, res) {
        try {
            const services = await ProductModel.find({
                 _id: { '$ne': null } ,
                 isProduct: false
                })
                .sort('product')

            return await res.status(200).json({
                services
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async getProductById(req, res) {
        await ProductModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Produto/Serviço não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getProductByName(req, res) {
        await ProductModel.find({ _id: { '$ne': null } })
            .sort('product')
            .then(response => {
                if (response.length > 0) {
                    if (req.params.name === '')
                        return res.status(200).json(response)
                    else {
                        let resp = response.filter(i => i.product.toLowerCase().includes(req.params.product.toLowerCase()))

                        return res.status(200).json(resp)
                    }


                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await ProductModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ status: 'Produto/Serviço removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new ProductController()