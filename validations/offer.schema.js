import joi from '@hapi/joi';

export const offerValidationSchema=joi.object({
        title:joi.string()
            .label("Offer Title")
            .trim()
            .min(5)
            .max(100)
            .lowercase()
            .regex(/[${};<>`]/, { invert: true })
            .required()
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        description:joi.string().trim()
            .label("Offer Decription")
            .lowercase()
            .min(10)
            .max(250)
            .regex(/[${};<>`]/, { invert: true })
            .required()
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        imageurl:joi.string()
            .label("Offer Image URL")
            .required()
            .trim(),
        targetlink:joi.string()
            .label("Offer Target Link")
            .required()
            .trim(),
        startdate:joi.date()
            .label("Offer Starting Date")
            .iso()
            .default(new Date()),
        enddate:joi.date()
            .label("Offer Ending Date")
            .iso()
            .greater(joi.ref('startdate'))
    });


// messages: {
//     'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
//     'string.base': '{{#label}} must be a string',
//     'string.base64': '{{#label}} must be a valid base64 string',
//     'string.creditCard': '{{#label}} must be a credit card',
//     'string.dataUri': '{{#label}} must be a valid dataUri string',
//     'string.domain': '{{#label}} must contain a valid domain name',
//     'string.email': '{{#label}} must be a valid email',
//     'string.empty': '{{#label}} is not allowed to be empty',
//     'string.guid': '{{#label}} must be a valid GUID',
//     'string.hex': '{{#label}} must only contain hexadecimal characters',
//     'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
//     'string.hostname': '{{#label}} must be a valid hostname',
//     'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
//     'string.ipVersion': '{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
//     'string.isoDate': '{{#label}} must be in iso format',
//     'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
//     'string.length': '{{#label}} length must be {{#limit}} characters long',
//     'string.lowercase': '{{#label}} must only contain lowercase characters',
//     'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
//     'string.min': '{{#label}} length must be at least {{#limit}} characters long',
//     'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
//     'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
//     'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}',
//     'string.pattern.name': '{{#label}} with value {:[.]} fails to match the {{#name}} pattern',
//     'string.pattern.invert.base': '{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}',
//     'string.pattern.invert.name': '{{#label}} with value {:[.]} matches the inverted {{#name}} pattern',
//     'string.trim': '{{#label}} must not have leading or trailing whitespace',
//     'string.uri': '{{#label}} must be a valid uri',
//     'string.uriCustomScheme': '{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
//     'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
//     'string.uppercase': '{{#label}} must only contain uppercase characters'
//   }