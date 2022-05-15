import express from "express";
import { getAllOffers, createOffer, deleteOffer, getOfferByDate, updateOffer } from '../controllers/offer.js'
import OfferValidationMiddleware from '../validations/offers/offer.validation.js';
const Offers=express.Router()


// Getting all
Offers.get('/', getAllOffers)

// get offers by date
Offers.get('/:sdate',getOfferByDate)

// Creating One
Offers.post('/',OfferValidationMiddleware,createOffer)

// delete One
Offers.delete('/:id',deleteOffer)

// update offer
Offers.patch('/:id',OfferValidationMiddleware,updateOffer)

export default Offers;