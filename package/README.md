# rinflow

A TypeScript package for managing loan application workflows with integrated risk assessment, document signing, and email notifications.

## Features

- Application data summarization with loan metrics computation
- Risk analysis using Gemini AI API
- Contract generation and signing via DocuSign
- Automated email notifications through Resend

## Installation

```bash
npm install rinflow
```

## Usage

```typescript
import rinflow from "rinflow";

// Initialize the package with your config
const workflow = new rinflow({
  resendConfig: {
    resendApi: "your_resend_api_key",
  },
  docusignConfig: {
    integratorKey: "your_integrator_key",
    userId: "your_user_id",
    authServer: "your_auth_server",
    basePath: "your_base_path",
    account_id: "your_account_id",
  },
  geminiConfig: {
    geminiApi: "your_gemini_api_key",
  },
});

// Example application data
const applicationData = {
  dependents: 2,
  education: "Graduate",
  selfEmployed: false,
  incomeAnnum: 75000,
  loanAmount: 200000,
  loanTerm: 24,
  cibilScore: 750,
  resedentialAssetValue: 300000,
  commercialAssetValue: 0,
  luxuryAssetValue: 50000,
  bankAssetValue: 100000,
  debt: 25000,
};

// Summarize application data
const summary = workflow.summarizeData({ applicationData });

// Analyze risk
const riskAnalysis = await workflow.analyzeRisk({ applicationData });

// Send contract for signing
await workflow.sendContract({
  loanId: "123",
  recipientEmail: "user@example.com",
  recipientName: "John Doe",
});

// Send rejection email if needed
await workflow.sendRejectionEmail({
  loanId: "123",
  email: "user@example.com",
  username: "John Doe",
});
```

## Configuration

### Required Environment Variables

- `RESEND_API_KEY`: Your Resend API key
- `DOCUSIGN_INTEGRATOR_KEY`: DocuSign integrator key
- `DOCUSIGN_USER_ID`: DocuSign user ID
- `DOCUSIGN_AUTH_SERVER`: DocuSign authentication server URL
- `DOCUSIGN_BASE_PATH`: DocuSign API base path
- `DOCUSIGN_ACCOUNT_ID`: DocuSign account ID
- `GEMINI_API_KEY`: Your Gemini AI API key

## Methods

### summarizeData(applicationData)

Computes and returns loan metrics based on the provided application data.

### analyzeRisk(applicationData)

Performs risk assessment using Gemini AI API and returns the analysis results.

### sendContract(loanId, recipientEmail, recipientName)

Generates and sends a contract for signing via DocuSign.

### sendRejectionEmail(loanId, email, username)

Sends a rejection notification email using Resend.

## Types

### ApplicationData

```typescript
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
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
