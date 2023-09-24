const mongoose =require("mongoose") ;

const connectMongo =async () => {
    try {
        await mongoose.connect("mongodb+srv://yoaugusto92:ioneg123@cluster0.to3jezt.mongodb.net/Ecommerce?retryWrites=true&w=majority") //agrego enlace para mongo, y le pongo nombre "Ecommerce"
        console.log("db is connected")
    }
    catch  (error){
        console.log(error)
    }
    {
        
    }
}



module.exports= connectMongo 