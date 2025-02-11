import sendSignReq from "./docusign-request/docusign.js";
import sendMail from "./resend/email.js";
import { riskAssessment } from "./gemini-api/risk.js";
import computeLoanMetrics from "./summarize/loanMetrics.js";

interface ApplicationData {
  dependents: number;
  education: string;
  selfEmployed: boolean;
  incomeAnnum: number;
  loanAmount: number;
  loanTerm: number;
  cibilScore: number;
  resedentialAssetValue: number;
  commercialAssetValue: number;
  luxuryAssetValue: number;
  bankAssetValue: number;
  debt: number;
}

interface AdditionalData {
  debtToIncomeRatio: string;
  loanToIncomeRatio: string;
  totalAssets: string;
  assetCoverageRatio: string;
  estimatedEMI: string;
}

export default class rinflow {
  resendConfig: { resendApi: string };
  docusignConfig: {
    integratorKey: string;
    userId: string;
    authServer: string;
    basePath: string;
    account_id: string;
  };
  geminiConfig: {
    geminiApi: string;
  };

  constructor({
    resendConfig,
    docusignConfig,
    geminiConfig,
  }: {
    resendConfig: { resendApi: string };
    docusignConfig: {
      integratorKey: string;
      userId: string;
      authServer: string;
      basePath: string;
      account_id: string;
    };
    geminiConfig: { geminiApi: string };
  }) {
    this.resendConfig = resendConfig;
    this.docusignConfig = docusignConfig;
    this.geminiConfig = geminiConfig;
  }

  // 1️⃣ Summarize application data
  summarizeData({ applicationData }: { applicationData: ApplicationData }) {
    return computeLoanMetrics({ applicationData });
  }

  // 2️⃣ Analyze risk using Gemini API & your ML model
  async analyzeRisk({ applicationData }: { applicationData: ApplicationData }) {
    const additionalData: AdditionalData = this.summarizeData({
      applicationData,
    });
    const response = await riskAssessment({
      applicationData,
      additionalData,
      geminiConfig: this.geminiConfig,
    });

    return response;
  }

  // 3️⃣ Send contract via DocuSign
  async sendContract({
    loanId,
    recipientEmail,
    recipientName,
  }: {
    loanId: string;
    recipientEmail: string;
    recipientName: string;
  }) {
    await sendSignReq({
      loanId,
      recipientEmail,
      recipientName,
      docusignConfig: this.docusignConfig,
    });
  }

  // 4️⃣ Send rejection email via Resend
  async sendRejectionEmail({
    loanId,
    email,
    username,
  }: {
    loanId: string;
    email: string;
    username: string;
  }) {
    await sendMail({
      loanId,
      email,
      username,
      resendConfig: this.resendConfig,
    });
  }
}
