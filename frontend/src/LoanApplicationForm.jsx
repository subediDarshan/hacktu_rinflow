
import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Webcam from "react-webcam";

const LoanApplication = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const nav = useNavigate();

  // Existing callback functions remain the same
  const startRecording = useCallback(() => {
    setShowWebcam(true);
    recordedChunks.current = [];

    if (webcamRef.current) {
      const stream = webcamRef.current.video.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(recordedChunks.current, {
          type: "video/webm",
        });
        const file = new File([videoBlob], "videokyc.webm", {
          type: "video/webm",
        });

        setVideoFile(file);
      };

      mediaRecorderRef.current.start();
      setTimeout(() => stopRecording(), 10000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (webcamRef.current) {
      webcamRef.current.getScreenshot();
      setShowWebcam(false);
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    
    try {
      await axios.post(`${import.meta.env.BACKEND_EXPRESS_BASE_API}/api/v1/applicant/apply`, data, {
        withCredentials: true,
      });

      setMessage("Application submitted successfully!");
      reset();
      nav("/dashboard");
    } catch (error) {
      setMessage("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, type = "text", options, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          {...props}
          className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...props}
          className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
        />
      )}
    </div>
  );

  return (
    <>
      <Navbar login={false} logout={true} signup={false} dashboard={true} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900">Apply for Loan</h2>
                <p className="mt-2 text-slate-600">Please fill in your details below</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                  label="Full Name"
                  placeholder="John Doe"
                  {...register("name")}
                  required
                />

                <InputField
                  label="Number of Dependents"
                  type="number"
                  {...register("dependents")}
                  required
                />

                <InputField
                  label="Education"
                  type="select"
                  options={[
                    { value: "Graduate", label: "Graduate" },
                    { value: "Postgraduate", label: "Postgraduate" },
                    { value: "Doctorate", label: "Doctorate" }
                  ]}
                  {...register("education")}
                  required
                />

                <InputField
                  label="Self-Employed"
                  type="select"
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" }
                  ]}
                  {...register("selfEmployed")}
                  required
                />

                <InputField
                  label="Annual Income (₹)"
                  type="number"
                  {...register("incomeAnnum")}
                  required
                />

                <InputField
                  label="Loan Amount (₹)"
                  type="number"
                  {...register("loanAmount")}
                  required
                />

                <InputField
                  label="Loan Term (Years)"
                  type="number"
                  {...register("loanTerm")}
                  required
                />

                <InputField
                  label="CIBIL Score"
                  type="number"
                  {...register("cibilScore")}
                  required
                />

                {[
                  { name: "resedentialAssetValue", label: "Residential Asset Value (₹)" },
                  { name: "commercialAssetValue", label: "Commercial Asset Value (₹)" },
                  { name: "luxuryAssetValue", label: "Luxury Asset Value (₹)" },
                  { name: "bankAssetValue", label: "Bank Asset Value (₹)" },
                  { name: "debt", label: "Debt (₹)" }
                ].map(({ name, label }) => (
                  <InputField
                    key={name}
                    label={label}
                    type="number"
                    {...register(name)}
                    required
                  />
                ))}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    CIBIL Score Proof (PDF)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    required
                    className="w-full p-2 border border-slate-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-slate-900 file:text-white hover:file:bg-slate-800 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Video KYC
                  </label>
                  {showWebcam ? (
                    <div className="relative rounded-lg overflow-hidden">
                      <Webcam ref={webcamRef} audio={true} />
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white py-2 px-6 rounded-lg hover:bg-slate-800 transition"
                      >
                        Stop Recording
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
                    >
                      Start KYC
                    </button>
                  )}
                </div>

                <div className="pt-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition"></div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:bg-slate-400"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </div>
              </form>

              {message && (
                <div className={`text-center text-sm ${
                  message.includes("Error") ? "text-red-600" : "text-green-600"
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanApplication;