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
export default class rinflow {
    resendConfig: {
        resendApi: string;
    };
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
    constructor({ resendConfig, docusignConfig, geminiConfig, }: {
        resendConfig: {
            resendApi: string;
        };
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
    });
    summarizeData({ applicationData }: {
        applicationData: ApplicationData;
    }): {
        debtToIncomeRatio: string;
        loanToIncomeRatio: string;
        totalAssets: string;
        assetCoverageRatio: string;
        estimatedEMI: string;
    };
    analyzeRisk({ applicationData }: {
        applicationData: ApplicationData;
    }): Promise<any>;
    sendContract({ loanId, recipientEmail, recipientName, }: {
        loanId: string;
        recipientEmail: string;
        recipientName: string;
    }): Promise<void>;
    sendRejectionEmail({ loanId, email, username, }: {
        loanId: string;
        email: string;
        username: string;
    }): Promise<void>;
}
export {};
