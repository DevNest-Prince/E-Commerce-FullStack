import ProductService from "../service/ProductService.js";
import Seller from "../models/Seller.js";
import Product from "../models/Product.js";





class SellerProductController{
    async getProductBySellerId(req,res){
        try {
            const seller =await req.seller;

            const products =await ProductService.getProductBySellerId(seller._id);
            res.status(200).json(products);
        } catch (error) {
            // console.log("......");
            res.status(400).json({error:error.message});
        }
    }

    //Create a product
    async createProduct(req,res){
        try {
            // await createProductSchema.validate(req.body,{ abortEarly:false});

            const seller = await req.seller;

            const product = await ProductService.createProduct(req.body,seller);
            return res.status(201).json(product);
        } catch (error) {
                     
            res.status(400).json({error:error.message})
        }
    }

    // Delete a Product
    async deleteProduct(req,res){
        try {
            await ProductService.deleteProduct(req.params.productId);
           return res.status(200).json({message:"Product deleted successfully"});
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    }

    // Update a product

    async updateProduct(req,res){
        try {
            const product =await ProductService.updateProduct(
                req.params.productId,
                req.body
            );

           return res.status(200).json(product);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    }

    // Get Product by Id
    async getProductById(req,res){
        try {
            const product =await ProductService.findProductById(
                req.params.productId
            );
           return res.status(200).json(product);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    }

      // Search For product by query
      async searchProduct(req, res){
        try {
            const query =res.query.q;
            const products =await ProductService.searchProduct(query);
            return res.status(200).json(products);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
      }

      async getAllProducts(req,res){
        try {
            const products =await ProductService.getAllProducts(req.query);
           return res.status(200).json(products);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
      }
 }

export default new SellerProductController();