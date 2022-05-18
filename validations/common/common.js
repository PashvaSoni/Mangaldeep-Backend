import joi from '@hapi/joi';

const commonschema = {
    category:joi.string()
        .label("Product Category")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
        })
        .min(3)
        .max(50)
        .required(),
    class:joi.array()
        .label("Product Class")
        .items(
            joi.string()
            .trim()
            .lowercase()
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            })
        )
        .min(1) // atleast 1 class should be assigned 
        .required(),
    ocassion:joi.array()
        .label("Product Occasion")
        .items(
            joi.string()
            .trim()
            .lowercase()
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            })
        .default(['everyday']), 
}

export default commonschema;