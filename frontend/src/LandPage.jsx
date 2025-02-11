import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [copied, setCopied] = useState(false);
  const nav = useNavigate();
  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm i rinflow");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                rinflow
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="https://www.npmjs.com/package/rinflow"
                target="_blank"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Documentation
              </a>
              <button
                onClick={() => nav("/signup")}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-pink-50 text-pink-700">
                Just Released: v1.0.3
                <svg
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
              Automate your lending <br className="hidden sm:block" />
              <span className="text-pink-600">operations</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-slate-600">
              Leverage AI-powered automation to process loans seamlessly,
              validate documents instantly, and accelerate approvals with
              confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition"></div>
                <button
                  onClick={() => nav("/signup")}
                  className="relative bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                  Start Free Trial
                </button>
              </div>
              <a href="https://www.npmjs.com/package/rinflow" target="_blank">
                <button className="px-8 py-3 border-2 border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-900 transition">
                  Docs
                </button>
              </a>
            </div>

            <div className="pt-8">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition"
                  >
                    <code className="text-sm font-mono text-slate-700">
                      npm i rinflow
                    </code>
                    {copied ? (
                      <svg
                        className="ml-2 h-4 w-4 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        className="ml-2 h-4 w-4 text-slate-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </div>
                </div>
                <a
                  href="https://github.com"
                  className="flex items-center text-slate-600 hover:text-slate-900 transition"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Processing",
                description:
                  "Automatically process and validate loan documents with advanced AI technology.",
              },
              {
                title: "Integrated eSignatures",
                description:
                  "Seamless DocuSign integration for automated contract signing and request management via email.",
              },
              {
                title: "Automated Notifications",
                description:
                  "Keep all parties informed with automatic email updates on loan status changes and progress.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
