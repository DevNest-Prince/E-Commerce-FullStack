import DealService from "../service/DealService.js"


class DealController {
    async getAllDeals(req, res) {
        try {
            const deal = req.body
            const deals = await DealService.getDeals(deal)
            return res.status(200).json(deals);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching deals: ${error.message}` });
        }
    }

    async createDeal(req, res) {
        try {
            const deal = req.body;
            const creatDeal = await DealService.createDeal(deal)

            return res.status(201).json(creatDeal);
        } catch (error) {
            return res.status(500).json({ message: `Error creating deal: ${error.message}` });
        }
    }

    async updateDeal(req, res) {
        const deal = req.body;
        const { id } = req.params;

        try {
            const updatedDeal = await DealService.updateDeal(deal, id)
            return res.status(200).json(updatedDeal);

        } catch (error) {
            return res.status(500).json({ message: `Error updating deal: ${error.message}` });
        }
    }

    async deleteDeal(req, res) {
        const { id } = req.params;
        
        try {
            await DealService.deleteDeal(id);
            return res.status(200).json({ message: 'Deal deleted successfully' });
        } catch (error) {
            throw new Error('Error deleting deal: ' + error.message);
        }
    }
}

export default new DealController();