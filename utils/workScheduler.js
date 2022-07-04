"use strict";
import cron from 'node-cron'
import { deleteByDate } from '../controllers/offer.js';


export const every24hr=cron.schedule('59 23 * * *',()=>{       //this will schedule function running process each 24 hours
    //your callback function will be here
    deleteByDate(new Date().toISOString())
})