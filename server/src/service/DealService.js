import Deal from "../models/Deal.js";
import HomeCategory from "../models/HomeCaegory.js";



class DealService {
    async getDeals() {
        return await Deal.find().populate({path: 'category'})
    }

    async createDeal(deal){
        try {
            const category = await HomeCategory.findById(deal.category._id)

            const newDeal = new Deal({
                ...deal,
                category: category
            })

            const savedDeal = await newDeal.save()

            return await Deal.findById(savedDeal._id).populate({path: 'category'})

        } catch (error) {
            throw new Error('Error creating deal: ' + error.message);
        }
    }

    async updateDeal(deal, id){
        const existingDeal = await Deal.findById(id).populate({path: 'category'});

        if(existingDeal){
            return await Deal.findByIdAndUpdate(
                existingDeal._id,
                {discount: deal.discount},
                {new: true}
            )
        }
    }

    async deleteDeal(id){
        const deal = await Deal.findById(id)

        if(!deal){
            throw new Error('Deal not found')
        }

        await Deal.deleteOne({_id: deal._id})
    }
}

export default new DealService();