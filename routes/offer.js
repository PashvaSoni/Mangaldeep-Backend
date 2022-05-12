import express from "express";
import { getAllOffers, createOffer } from '../controllers/offer.js'
const Offers=express.Router()


// Getting all
Offers.get('/', getAllOffers)


// Creating One
Offers.post('/',createOffer)

export default Offers;