var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleGenerativeAI } from "@google/generative-ai";
export function riskAssessment(_a) {
    return __awaiter(this, arguments, void 0, function* ({ applicationData, additionalData, geminiConfig, }) {
        const genAI = new GoogleGenerativeAI(geminiConfig.geminiApi);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an AI-powered loan risk assessment system. Analyze the provided applicant data and determine the loan risk level as Low, Moderate, or High.

Consider factors such as income, loan amount, CIBIL score, asset values, and employment status. Also, provide a short explanation for your decision, listing the key pros and cons.

Here is the applicant's data:
- Dependents: ${applicationData.dependents}
- Education: ${applicationData.education}
- Self-Employed: ${applicationData.selfEmployed ? "Yes" : "No"}
- Annual Income: ₹${applicationData.incomeAnnum}
- Loan Amount: ₹${applicationData.loanAmount}
- Loan Term: ${applicationData.loanTerm} years
- CIBIL Score: ${applicationData.cibilScore}
- Residential Asset Value: ₹${applicationData.resedentialAssetValue}
- Commercial Asset Value: ₹${applicationData.commercialAssetValue}
- Luxury Asset Value: ₹${applicationData.luxuryAssetValue}
- Bank Asset Value: ₹${applicationData.bankAssetValue}
- Debt: ₹${applicationData.debt}


**Computed Financial Ratios:**
- Debt-to-Income Ratio: ${additionalData.debtToIncomeRatio}
- Loan-to-Income Ratio: ${additionalData.loanToIncomeRatio}
- Total Assets Value: ${additionalData.totalAssets}
- Asset Coverage Ratio: ${additionalData.assetCoverageRatio}
- Estimated Monthly EMI: ${additionalData.estimatedEMI}

Example Output:
"Applicant has a 720 credit score and a 50% debt-to-income ratio. Based on past trends, they have a high probability of timely repayment. Recommended approval with a 7% interest rate."

Remember the response should be short like in this example output.
And give proper reasoning and logic on should we accept or reject this loan.
Dont just summarize given data.
`;
        const result = yield model.generateContent(prompt);
        return result.response.text();
    });
}
