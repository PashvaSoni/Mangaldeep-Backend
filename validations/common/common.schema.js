import joi from '@hapi/joi';

const commonschema = {
    category:joi.object({
        name:joi.string()
        .label("Product Category")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
        })
        .min(3)
        .max(50)
        .required()
    }),
    class:joi.object({
        name:joi.string()
        .label("Product Class")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
        })
        .min(3)
        .max(50)
        .required()
    }),
    ocassion:joi.object({
        name:joi.string()
        .label("Product Occasion")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
        })
        .min(3)
        .max(50)
        .required()
    }), 
}

export default commonschema;