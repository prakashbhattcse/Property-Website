const mongoose = require('mongoose')

const db =()=>{ mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB CONNECTED"))
.catch(()=>console.log("error not connecting"))
}

module.exports=db;
