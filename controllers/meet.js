import { createMeeting, searchMeet, getMeetings, updateMeet, getMeeting, deleteMeeting } from "../models/meet.js";
import { v4 as uuidv4 } from 'uuid';
import GeneralUtils from "../utils/generals.js"




class MeetRepo extends GeneralUtils {

    dashboard = async (req, res) => res.render("pages/dash")
    create_meeting = async (req, res) => {
        const meetingCode = uuidv4();
        const userId = req.user._id;
        const passcode = this.generateOtp();
        try {
            const created = await createMeeting({ meetingCode, passcode, userId });
            if (!created) return res.status(500).render("pages/meetings", { message: "Ooop something went wrong" });
            return res.status(200).redirect("pages/meetings");
        } catch (error) {
            return res.status(500).render("pages/meetings", { message: error.message });
        }
    }

    start_meet = async (req, res) => {
        const { id, meetId } = req.params;  
        try {
            if (req.user._id != id)
                return res.status(200).json({ message: "you are not permitted to start a meeting you didnt create" })

            // check that the user about to start the meeting is the user that created it
            const checkMeet = await searchMeet({ _id: meetId, userId: id })

            if (!checkMeet)
                return res.status(200).json({ message: "meeting not found" })

            //if it is the  user set meeting status to true

            const updated = await updateMeet({ start: true });
            if (!updated)
                return res.status(200).json({ message: "something went wrong" })

            // redirect user to a link to start the meeting
            TODO: redirections 
            return res.status(500).redirect("pages/meetings")

        } catch (error) {
            return res.status(500).redirect("pages/meetings")
        }

    }

    delete_meeting = async (req, res) => {

        try {
            const { id } = req.params;
            await deleteMeeting(id)
            return res.status(200).json({ message: "meeting deleted" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }

    starring_meet = async (req, res)=>{
        const {meetId} = req.params;
        return res.render("pages/meetup", {meetId});
    }

    get_meetings = async (req, res) => {
        console.log(req.user)
        const userId = req.user?._id;
        const meetings = await getMeetings(userId);
        return res.status(200).render("pages/meetings", { meetings });
    }

    get_meeting = async (req, res) => {
        try {
            const { id } = req.params;
            const meeting = await getMeeting(id);
            return res.status(200).json({ meeting });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}


export default new MeetRepo();