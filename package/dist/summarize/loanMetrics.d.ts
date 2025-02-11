export default function computeLoanMetrics({ applicationData }: {
    applicationData: any;
}): {
    debtToIncomeRatio: string;
    loanToIncomeRatio: string;
    totalAssets: string;
    assetCoverageRatio: string;
    estimatedEMI: string;
};
