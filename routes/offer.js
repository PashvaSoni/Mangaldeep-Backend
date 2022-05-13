import express from "express";
import { getAllOffers, createOffer, deleteOffer, getOfferByDate } from '../controllers/offer.js'
const Offers=express.Router()


// Getting all
Offers.get('/', getAllOffers)

// get offers by date
Offers.get('/:sdate',getOfferByDate)


// Creating One
Offers.post('/',createOffer)

//delete One
Offers.delete('/:id',deleteOffer)
export default Offers;