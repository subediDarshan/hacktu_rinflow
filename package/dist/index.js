var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sendSignReq from "./docusign-request/docusign.js";
import sendMail from "./resend/email.js";
import { riskAssessment } from "./gemini-api/risk.js";
import computeLoanMetrics from "./summarize/loanMetrics.js";
export default class rinflow {
    constructor({ resendConfig, docusignConfig, geminiConfig, }) {
        this.resendConfig = resendConfig;
        this.docusignConfig = docusignConfig;
        this.geminiConfig = geminiConfig;
    }
    // 1️⃣ Summarize application data
    summarizeData({ applicationData }) {
        return computeLoanMetrics({ applicationData });
    }
    // 2️⃣ Analyze risk using Gemini API & your ML model
    analyzeRisk(_a) {
        return __awaiter(this, arguments, void 0, function* ({ applicationData }) {
            const additionalData = this.summarizeData({
                applicationData,
            });
            const response = yield riskAssessment({
                applicationData,
                additionalData,
                geminiConfig: this.geminiConfig,
            });
            return response;
        });
    }
    // 3️⃣ Send contract via DocuSign
    sendContract(_a) {
        return __awaiter(this, arguments, void 0, function* ({ loanId, recipientEmail, recipientName, }) {
            yield sendSignReq({
                loanId,
                recipientEmail,
                recipientName,
                docusignConfig: this.docusignConfig,
            });
        });
    }
    // 4️⃣ Send rejection email via Resend
    sendRejectionEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ loanId, email, username, }) {
            yield sendMail({
                loanId,
                email,
                username,
                resendConfig: this.resendConfig,
            });
        });
    }
}
