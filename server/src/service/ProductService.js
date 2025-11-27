import Category from "../models/Category";

const calculateDiscountPercentage=(mrpPrice ,sellingPrice)=>{
    if(mrpPrice<=0){
        throw new Error("MRP Price should be greater than zero");
    }

    const discount=mrpPrice-sellingPrice;

    return Math.round((discount/mrpPrice)*100)
};

class ProductService{

    async createProduct(req ,seller){
        try {
            const discountPresent=calculateDiscountPercentage(
                req.mrpPrice,
                req.sellingPrice
            );

            const category1= await this.createOrGetCategory(req.category,1);
            const category2=await this.createOrGetCategory(req.category2, 2, category1._id);
            const category3=await this.createOrGetCategory(req.category3,3,category2._id);

            
            const product=new Product({
                title:req.title,
                description:req.description
            })
        } catch (error) {}
    }

    async createOrGetCategory(categoryId, lavel , parentId=null){
        let category =await Category.findOne({categoryId});
        
        if(!category){
            category =new Category({
                categoryId,
                lavel,
                parentCategory:parentId
            });
           category = await category.save();
        }
        return category;

    }
}