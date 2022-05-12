import express from "express";
import { getAllOffers, createOffer, deleteOffer } from '../controllers/offer.js'
const Offers=express.Router()


// Getting all
Offers.get('/', getAllOffers)


// Creating One
Offers.post('/',createOffer)

//delete One
Offers.delete('/:id',deleteOffer)
export default Offers;