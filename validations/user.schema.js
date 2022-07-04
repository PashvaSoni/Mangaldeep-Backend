"use strict";

import joi from '@hapi/joi';

export const createUserValidationSchema=joi.object({
    name:joi.string()
        .label("User's Name")
        .min(4)
        .max(50)
        .lowercase()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
        }),
    email:joi.string()
        .label("User's Email")
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional()
        .lowercase()
        .trim(),
    phonenumber:joi.string()
        .label("User's Phone Number")
        .required()
        .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
        .messages({
            "string.pattern.base": `{{#label}} is not valid`
        })
        .trim(),
    dob:joi.date()
        .label("User's Date Of Birth")
        .max('now'),
    password:joi.string()
        .label("User's Password")
        .max(128)
        .min(8)
        .trim()
        .required(),
    registrationdate:joi.date()
        .label("User's Registration Date")
        .default(new Date())
        .max('now'),
    orders:joi.array()
        .label("User's Orders")
        .items(
            joi.string()
                .label("User's Order ID")
                .trim()
                .lowercase()
                .required()
                .regex(/[${};<>`]/, { invert: true })
                .messages({
                    "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
                })
        )
    

});

export const loginUserValidationSchema=joi.object({
    phonenumber:joi.string()
        .label("User's Phone Number")
        .required()
        .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
        .messages({
            "string.pattern.base": `{{#label}} is not valid`
        })
        .trim(),
    password:joi.string()
        .label("User's Password")
        .max(128)
        .min(8)
        .trim()
        .required(),
});