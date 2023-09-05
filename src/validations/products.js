import Joi from "joi";

const productsValidator = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    price: Joi.number(),
    desc: Joi.string(),
    categoryId: Joi.string().required(),
    imgs: Joi.array().required()

});

export default productsValidator;