import joi from "@hapi/joi";

export const categoryValidationSchema = joi.object({
  name: joi
    .string()
    .label("Product Category")
    .trim()
    .lowercase()
    .regex(/[${};<>`]/, { invert: true })
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    })
    .min(3)
    .max(50)
    .required(),
});
export const classValidationSchema = joi.object({
  name: joi
    .string()
    .label("Product Class")
    .trim()
    .lowercase()
    .regex(/[${};<>`]/, { invert: true })
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    })
    .min(3)
    .max(50)
    .required(),
});
export const ocassionValidationSchema = joi.object({
  name: joi
    .string()
    .label("Product Occasion")
    .trim()
    .lowercase()
    .regex(/[${};<>`]/, { invert: true })
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    })
    .min(3)
    .max(50)
    .required(),
});
