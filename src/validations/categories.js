import Joi from "joi";

const categoriesValidator = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    slug: Joi.string().min(2).max(256).required()
});

export default categoriesValidator;