import { Model, Schema, model } from "mongoose";

const MeetSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    start:{type:Boolean, default:false},
    meetingCode: {type: String, required:true,},
    passcode:{type:String, required:true},
})

const Meet = model("Meet", MeetSchema);

// crud functions
export const createMeeting = async (values) => await Meet.create(values);
export const getMeetings =  async (userId)=> await Meet.find({userId}).populate('userId');
export const getMeeting=  async (user_id)=> await Meet.findOne({user_id});
export const searchMeet = async (values)=> await Meet.findOne(values);
export const updateMeet = async (values) => await Meet.findByIdAndUpdate(id, values, { new: true });
export const deleteMeeting = async (id)=> await Meet.findOneAndDelete({_id:id});
export default Meet;