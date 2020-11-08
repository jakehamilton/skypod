const { model, Schema } = require("mongoose");
const bcrypt = require("twin-bcrypt");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            index: { unique: true },
        },
        password: String,
        role: String,
    },
    {
        timestamps: true,
    }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
