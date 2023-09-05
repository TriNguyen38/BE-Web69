import Category from "../models/Category"
import categoriesValidator from "../validations/categories"


export const getAll = async (req,res) => {
    try {
        const data = await Category.find({})
        if (!data || data.length === 0){
            return res.status(404).json({
                message:"Category not found"
            })
        }
        return res.status(200).json({
            message:"Category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message:error.message,
        })
    }
}

export const getDetail = async (req,res) => {
    try {
        const data = await Category.findById(req.params.id).populate("products")
        if (!data){
            return res.status(404).json({
                message:"Category not found"
            })
        }
        return res.status(200).json({
            message:"Category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message:error.message,
        })
    }
}

export const createCategory = async (req,res) => {
    try {
        const { error }= categoriesValidator.validate(req.body, { abortEarly: false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.create(req.body)
        if (!data){
            return res.status(404).json({
                message:"Create not successfully"
            })
        }
        return res.status(200).json({
            message:"Create successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message:error.message,
        })
    }
}


export const update = async (req,res) => {
    try {
        const { error }= categoriesValidator.validate(req.body, { abortEarly: false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.findById(req.params.id,req.body,{ new : true})
        if (!data){
            return res.status(404).json({
                message:"Update not successfully"
            })
        }
        return res.status(200).json({
            message:"Update successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message:error.message,
        })
    }
}


export const remove = async (req,res) => {
    try {
    
        const data = await Category.findByIdAndDelete(req.params.id)
        if (!data){
            return res.status(404).json({
                message:"Delete not successfully"
            })
        }
        return res.status(200).json({
            message:"Delete successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message:error.message,
        })
    }
}



