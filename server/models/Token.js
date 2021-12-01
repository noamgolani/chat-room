const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  jwt: String,
  userId: mongoose.Types.ObjectId,
});

tokenSchema.options.toJSON = {
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports = mongoose.model("Token", tokenSchema);
