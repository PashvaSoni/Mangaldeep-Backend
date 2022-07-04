"use strict";

import express from "express";
import { getAllOffers, createOffer, deleteOffer, getOfferByDate, updateOffer } from '../controllers/offer.js'
import { validateBody } from "../utils/bodyValidationMiddleware.js";
import { offerValidationSchema } from "../validations/offer.schema.js";
const Offers=express.Router()


// Getting all
Offers.get('/', getAllOffers)

// get offers by date
Offers.get('/:sdate',getOfferByDate)

// Creating One
// Offers.post('/',OfferValidationMiddleware,createOffer)
Offers.post('/',validateBody(offerValidationSchema),createOffer)

// delete One
Offers.delete('/:id',deleteOffer)

// update offer
Offers.patch('/:id',validateBody(offerValidationSchema),updateOffer)

export default Offers;