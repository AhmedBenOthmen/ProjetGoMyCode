const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  picture: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
  },
  updatedAt: { 
    type: Date,
    default:null
  },
  ratings: [
    {
      givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
  isActive: { 
    type: Boolean, 
    default: true 
  },
});



module.exports = mongoose.model("User", userSchema);
