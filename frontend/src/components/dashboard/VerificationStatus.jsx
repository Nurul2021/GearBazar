"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Check,
  Upload,
  FileText,
  User,
  Building2,
  CreditCard,
  AlertCircle,
  Clock,
  BadgeCheck,
  X,
  Eye,
  RefreshCw,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { selectCurrentUser, selectIsVerified } from "@/features/auth/authSlice";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const STEPS = [
  { label: "Registration", icon: User, status: "completed" },
  { label: "Document Upload", icon: FileText, status: "completed" },
  { label: "Admin Review", icon: Building2, status: "pending" },
  { label: "Verified", icon: BadgeCheck, status: "upcoming" },
];

const DOCUMENT_TYPES = [
  {
    id: "trade_license",
    name: "Trade License",
    description: "Business registration certificate",
    icon: Building2,
  },
  {
    id: "nid",
    name: "National ID / Passport",
    description: "Owner or representative ID",
    icon: CreditCard,
  },
  {
    id: "shop_photo",
    name: "Shop Photo",
    description: "Front view of your garage/shop",
    icon: Building2,
  },
  {
    id: "bank_statement",
    name: "Bank Statement",
    description: "Recent bank statement (3 months)",
    icon: FileText,
  },
];

const getStatusFromDocument = (doc) => {
  if (!doc)
    return {
      status: "not_uploaded",
      label: "Required",
      color: "bg-red-100 text-red-700",
    };
  if (doc.status === "approved")
    return {
      status: "approved",
      label: "Approved",
      color: "bg-green-100 text-green-700",
    };
  if (doc.status === "rejected")
    return {
      status: "rejected",
      label: "Rejected",
      color: "bg-red-100 text-red-700",
    };
  if (doc.status === "pending")
    return {
      status: "pending",
      label: "Under Review",
      color: "bg-yellow-100 text-yellow-700",
    };
  return {
    status: "uploaded",
    label: "Uploaded",
    color: "bg-blue-100 text-blue-700",
  };
};

export default function VerificationStatus() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isVerified = useSelector(selectIsVerified);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [reuploadDoc, setReuploadDoc] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get("/verification/documents");
      setDocuments(response.data.data || []);
    } catch (error) {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentByType = (typeId) => {
    return documents.find((d) => d.type === typeId);
  };

  const handleFileUpload = async (typeId, file) => {
    if (!file) return;

    setUploadingDoc(typeId);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("type", typeId);

      const response = await api.post("/verification/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Document uploaded successfully");
        fetchDocuments();
        setReuploadDoc(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload document");
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleReupload = (typeId) => {
    setReuploadDoc(typeId);
  };

  const getCurrentStep = () => {
    if (isVerified) return 3;
    const allDocsUploaded = DOCUMENT_TYPES.every((doc) =>
      getDocumentByType(doc.id),
    );
    if (allDocsUploaded) return 1;
    return 0;
  };

  const currentStep = getCurrentStep();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-slate-500">
          Loading verification status...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Verification Status
        </h1>
        <p className="text-slate-500">
          Complete KYC to unlock wholesale pricing
        </p>
      </div>

      {/* Verified Alert */}
      {isVerified && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BadgeCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                Verification Complete
              </h3>
              <p className="text-green-700">
                Congratulations! Your account is verified. You now have access
                to wholesale pricing on all products.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Alert */}
      {!isVerified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                Documents Under Review
              </h3>
              <p className="text-yellow-700">
                Your documents are being reviewed by our team. Wholesale pricing
                will be unlocked shortly once verification is complete. This
                typically takes 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Stepper */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500"
                        : isCurrent
                          ? "bg-red-500"
                          : "bg-gray-100"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Icon
                        className={`w-6 h-6 ${
                          isCurrent ? "text-white" : "text-slate-400"
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      isCompleted || isCurrent
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && !isVerified && (
                    <span className="text-xs text-red-600">In Progress</span>
                  )}
                  {isCompleted && (
                    <span className="text-xs text-green-600">Done</span>
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-20 lg:w-32 h-1 mx-2 rounded ${
                      isCompleted ? "bg-green-500" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Required Documents
          </h2>
          <p className="text-sm text-slate-500">
            Upload or update your verification documents
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENT_TYPES.map((docType) => {
              const doc = getDocumentByType(docType.id);
              const docStatus = getStatusFromDocument(doc);
              const Icon = docType.icon;
              const isUploading = uploadingDoc === docType.id;
              const isReuploading = reuploadDoc === docType.id;
              const isRejected = docStatus.status === "rejected";

              return (
                <div
                  key={docType.id}
                  className={`border-2 rounded-xl p-4 ${
                    docStatus.status === "approved"
                      ? "border-green-200 bg-green-50"
                      : isRejected
                        ? "border-red-200 bg-red-50"
                        : docStatus.status === "pending"
                          ? "border-yellow-200 bg-yellow-50"
                          : doc
                            ? "border-blue-200 bg-blue-50"
                            : "border-gray-200 border-dashed"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        docStatus.status === "approved"
                          ? "bg-green-100"
                          : isRejected
                            ? "bg-red-100"
                            : doc
                              ? "bg-blue-100"
                              : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          docStatus.status === "approved"
                            ? "text-green-600"
                            : isRejected
                              ? "text-red-600"
                              : doc
                                ? "text-blue-600"
                                : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900">
                          {docType.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full ${docStatus.color}`}
                        >
                          {docStatus.status === "rejected" && (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {docStatus.status === "approved" && (
                            <Check className="w-3 h-3" />
                          )}
                          {docStatus.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        {docType.description}
                      </p>

                      {/* Rejected Notice */}
                      {isRejected && doc?.rejectionReason && (
                        <div className="mt-2 p-2 bg-red-100 rounded-lg">
                          <p className="text-xs text-red-700 font-medium">
                            Reason: {doc.rejectionReason}
                          </p>
                        </div>
                      )}

                      {/* File Info / Upload */}
                      {doc && !isReuploading ? (
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-slate-500 truncate flex-1">
                            {doc.fileName ||
                              doc.originalName ||
                              "Uploaded file"}
                            {doc.uploadedAt &&
                              ` • ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                          </span>
                          <div className="flex items-center gap-2">
                            {doc.fileUrl && (
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            )}
                            {(isRejected ||
                              !doc.status ||
                              doc.status === "pending") && (
                              <button
                                onClick={() => handleReupload(docType.id)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : isReuploading ? (
                        <div className="mt-3">
                          <input
                            type="file"
                            id={`upload-${docType.id}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) =>
                              handleFileUpload(docType.id, e.target.files?.[0])
                            }
                            className="hidden"
                          />
                          <label
                            htmlFor={`upload-${docType.id}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {isUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Choose File
                          </label>
                          <button
                            onClick={() => setReuploadDoc(null)}
                            className="ml-2 px-3 py-1.5 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3">
                          <input
                            type="file"
                            id={`upload-${docType.id}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) =>
                              handleFileUpload(docType.id, e.target.files?.[0])
                            }
                            className="hidden"
                          />
                          <label
                            htmlFor={`upload-${docType.id}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {isUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload CTA */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Accepted formats: JPG, PNG, PDF. Max file size: 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Need help?</h3>
        <p className="text-blue-700 text-sm mb-4">
          If you have any questions about the verification process, contact our
          support team.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
