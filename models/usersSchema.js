const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    mobile:{
        type: String,
        required: true,
        // unique: true,
    },
    messages:[]
});



// save message
userSchema.methods.Messagesave = async function(message){
   
    try {
        this.messages = this.messages.concat({message});
        await this.save();
        return message
    } catch (error) {
        res.status(422).json(error)
    }
}



// creating model
const siduser = new mongoose.model("siduser", userSchema);

module.exports = siduser; 

