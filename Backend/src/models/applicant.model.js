
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  // ✅ Add this import

const applicantSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    number_of_prev_loans: {
        type: Number
    },
    prev_loans: [
        {
          type: Schema.Types.ObjectId,
          ref: "LoanApplication",
        },
    ]
},
{
    timestamps: true,
}
);

applicantSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

applicantSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
};

// ✅ Generate Access Token
applicantSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: "applicant"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// ✅ Generate Refresh Token
applicantSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const Applicant = mongoose.model("Applicant", applicantSchema);
