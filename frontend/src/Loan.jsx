
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Loan() {
  const { id } = useParams();
  const nav = useNavigate();
  
  const [loan, setLoan] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mlResponse, setMlResponse] = useState(null);

  useEffect(() => {
    async function fetchLoanDetails() {
      if (!id) return;
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_EXPRESS_BASE_API}/api/v1/loanOfficer/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);

        const ml = await fetch(`${import.meta.env.VITE_BACKEND_FLASK_BASE_API}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            no_of_dependents: data.loan.number_of_dependents,
            education: data.loan.education,
            self_employed: data.loan.self_employed,
            income_annum: data.loan.income_annum,
            loan_amount: data.loan.loan_amount,
            loan_term: data.loan.loan_term,
            cibil_score: data.loan.cibil_score,
            residential_assets_value: data.loan.residential_assets_value,
            commercial_assets_value: data.loan.commercial_assets_value,
            luxury_assets_value: data.loan.luxury_assets_value,
            bank_asset_value: data.loan.bank_asset_value
          }),
        });

        const mlData = await ml.json();
        console.log(mlData.predictions[0])
        setMlResponse(mlData);
        setLoan(data.loan);
        setAiResponse(data.aiResponse);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch loan details");
      } finally {
        setLoading(false);
      }
    }
    fetchLoanDetails();
  }, [id]);

  const handleAccept = async () => {
    if (!id) return;
    await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_BASE_API}/api/v1/loanOfficer/accept/${id}`, {
      method: "POST",
      credentials: "include",
    });
    nav(`/dashboard`, { replace: true });
  };

  const handleReject = async () => {
    if (!id) return;
    await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_BASE_API}/api/v1/loanOfficer/reject/${id}`, {
      method: "POST",
      credentials: "include",
    });
    nav(`/dashboard`, { replace: true });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Accepted":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading loan details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No loan data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Navbar login={false} logout={true} signup={false} dashboard={true} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ML Model Prediction Section */}
        <div className="mb-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                ML Model Prediction
              </h3>
              <div className="text-purple-800">
                {mlResponse ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className={`text-lg font-medium ${
                        mlResponse.prediction === 1 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        Predicted Outcome: {mlResponse.predictions[0] === true ? 'Approval Recommended' : 'Rejection Recommended'}
                      </div>
                    </div>
                    {mlResponse.probability && (
                      <div className="text-sm">
                        Confidence: {(mlResponse.probability * 100).toFixed(2)}%
                      </div>
                    )}
                  </div>
                ) : (
                  "ML prediction loading..."
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                AI Analysis & Recommendations
              </h3>
              <div className="text-blue-800 whitespace-pre-line prose">
                {aiResponse || "No AI analysis available for this application."}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Loan Application Details
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Loan ID</p>
                  <p className="mt-1">{loan._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Applicant ID
                  </p>
                  <p className="mt-1">{loan.Applicant_Id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Education</p>
                  <p className="mt-1">{loan.education}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Employment Status
                  </p>
                  <p className="mt-1">
                    {loan.self_employed ? "Self Employed" : "Employed"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Dependents
                  </p>
                  <p className="mt-1">{loan.number_of_dependents}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    CIBIL Score
                  </p>
                  <p className="mt-1">{loan.cibil_score}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Loan Term</p>
                  <p className="mt-1">{loan.loan_term} months</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Current Status
                  </p>
                  <p
                    className={`mt-1 font-medium ${getStatusColor(
                      loan.loan_status
                    )}`}
                  >
                    {loan.loan_status}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Annual Income
                    </p>
                    <p className="mt-1">
                      ₹{loan.income_annum.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Loan Amount
                    </p>
                    <p className="mt-1">₹{loan.loan_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Debt
                    </p>
                    <p className="mt-1">₹{loan.debt.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Residential Assets
                    </p>
                    <p className="mt-1">
                      ₹{loan.residential_assets_value.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Commercial Assets
                    </p>
                    <p className="mt-1">
                      ₹{loan.commercial_assets_value.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Luxury Assets
                    </p>
                    <p className="mt-1">
                      ₹{loan.luxury_assets_value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Accept Loan
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Reject Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loan;