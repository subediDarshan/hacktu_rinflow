var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resend } from 'resend';
function sendMail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ loanId, email, username, resendConfig }) {
        const resend = new Resend(resendConfig.resendApi);
        try {
            const response = yield resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Application Update',
                html: `
        <p>Dear ${username},</p>
        <p>Thank you for your application for loan with Loan Id : ${loanId}. After a thorough review, we regret to inform you that we are unable to proceed with your request at this time.</p>
        <p>However, we encourage you to review our eligibility criteria and apply again in the future.</p>
        <p>If you have any questions or would like further clarification, feel free to reach out.</p>
        <p>Best regards,<br/>
        Priyansh Chowhan<br/>
        Rinflow<br/>
        7014664028</p>
      `
            });
            console.log('Email sent:', response);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    });
}
export default sendMail;
