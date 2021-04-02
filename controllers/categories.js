const Category = require('../models/Category');
const getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json({
            data: categories
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
    


}

const postCategories = async(req, res) => {
    try{
        const {name} = req.body;

        if(typeof name == 'string' && name.length > 0){
            const newCategory = new Category({
                name
            })
            const savedCategory = await newCategory.save();

            return res.status(200).json({
                msj: 'Category saved',
                data: savedCategory
            })
        }

        return res.status(400).json({
            error: 'Ingresa nombre de categoría'
        })
    

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    getCategories,
    postCategories
}