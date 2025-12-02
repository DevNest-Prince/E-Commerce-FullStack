import HomeCategoryService from "../service/HomeCategoryService.js";
import HomeService from "../service/HomeService.js";


class HomeCategoryController {
    async createHomeCategories(req, res) {
        try {
            const homeCategories = req.body;
            const categories = await HomeCategoryService.createCategories(homeCategories);
            const home = await HomeService.createHomePageData(categories)
            return res.status(201).json(home);
        } catch (error) {
            return res.status(500).json({ message: `Error creating home categories: ${error.message}` });
        }
    }

    // get all home categories
    async getHomeCategories(req, res) {
        try {
            const categories = await HomeCategoryService.getAllHomeCategories();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching home categories: ${error.message}` });
        }
    }

    async updateHomeCategory(req, res) {
        try {
            const id = req.params.id; // get id from route params
            const homeCategory = req.body; 
            const updatedCategory = await HomeCategoryService.updateHomeCategory(homeCategory, id)

            return res.status(200).json(updatedCategory);

        } catch (error) {
            throw new Error('Error updating home category: ' + error.message);
        }
    }
}

export default new HomeCategoryController();