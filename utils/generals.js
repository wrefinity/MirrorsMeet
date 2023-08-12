import otpGenerator from "otp-generator";



export default class GeneralUtils{
    generateOtp(){
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false
          });
          return otp;
    }



}