import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_avatar: {
        type: String,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('User', usersSchema);