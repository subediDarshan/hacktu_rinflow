export default sendMail;
declare function sendMail({ loanId, email, username, resendConfig }: {
    loanId: any;
    email: any;
    username: any;
    resendConfig: any;
}): Promise<void>;
