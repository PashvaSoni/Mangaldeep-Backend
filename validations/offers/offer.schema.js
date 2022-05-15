import joi from '@hapi/joi';

const offerValidationSchema={
    // offer:joi.object({
    //     title:joi.string()
    //         .min(5).message({'any.only':"Offer's title should be minimum 5 characters long."})
    //         .max(50).message({'any.only':"Offer's title should be maximum 50 characters long."})
    //         .required().message({'any.only':"Offer's title is required."}),
    //     description:joi.string()
    //         .min(10).message({'any.only':"Offer's description should be minimum 10 characters long."})
    //         .max(150).message({'any.only':"Offer's description should be maximum 150 characters long."})
    //         .required().message({'any.only':"Offer's description is required."}),
    //     imageurl:joi.string().required().message({'any.only':"Offer's Image URL is required."}),
    //     startdate:joi.date()
    //         .iso().message({'any.only':"Offer's starting date must be in ISO format."})
    //         .required().message({'any.only':"Offer's starting date is required."}),
    //     enddate:joi.date()
    //         .iso().message({'any.only':"Offer's ending date must be in ISO format."})
    //         .greater(joi.ref('startdate')).message({'any.only':"Offer's ending date must be greater than starting date."})
    //         .required().message({'any.only':"Offer's ending date is required."})
    // })
    offer:joi.object({
        title:joi.string()
            .min(5)
            .max(50)
            .required(),
        description:joi.string()
            .min(10)
            .max(150)
            .required(),
        imageurl:joi.string().required(),
        targetlink:joi.string().required(),
        startdate:joi.date()
            .iso()
            .default(new Date()),
        enddate:joi.date()
            .iso()
            .greater(joi.ref('startdate'))
    })
};

export default offerValidationSchema;
