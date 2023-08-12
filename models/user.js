import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"


const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, select:false},
        username: { type: String, required: true },
        token:{type:String}
    },
    { timestamps: true }
);

// Define a pre-hook to perform an action before saving a document
UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            // Skip this hook if the password is not modified (example, when updating other fields)
            return next();
        }

        // Hash the password before saving the document
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;

        return next();
    } catch (error) {
        return next(error);
    }
});

// extend matchPassword function unto user
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = model("User", UserSchema)
export default UserModel;
// define the basic schema operations
export const getUserById = async (id) => await UserModel.findById(id);;
export const createUser = async (values) => await UserModel.create(values);
export const getUsers = async()=> await UserModel.find();
export const getUserByEmail = async (email) => await UserModel.findOne({ email }).select("+password");
