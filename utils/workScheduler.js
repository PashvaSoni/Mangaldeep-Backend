import cron from 'node-cron'
const { deleteByDate } = require('../controllers/offer')

export const every24hr=cron.schedule('* * * * *',()=>{      
    //your callback function will be here
    // deleteByDate("2022-06-17")
    console.log("log");
    },
    {
    scheduled: false
})