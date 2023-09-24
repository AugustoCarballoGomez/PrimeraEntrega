const bcrypt =require("bcrypt")

const getHashedPassword= password =>{
    const salt= bcrypt.getSaltSync(10)
    return bcrypt.hashSymc(password , salt)

}

const comparePassword = (password , passwordHashed) =>{
    return bcrypt.compareSync(password , passwordHashed)

}
module.export ={
    getHashedPassword,
    comparePassword
}