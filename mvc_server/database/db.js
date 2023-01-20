const mongoose =require('mongoose')

function connectDb(){
    return new Promise((resolve,reject)=>{
        try {
            mongoose.connect(process.env.MONGO_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            }).then(data=>resolve(data))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports =connectDb;