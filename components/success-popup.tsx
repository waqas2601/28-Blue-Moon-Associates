"use client";

import { CheckCircle, X, Send, Loader2 } from "lucide-react";

// CONFIRMATION POPUP
interface ConfirmPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmPopup({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Close button */}
        {!isLoading && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="h-8 w-8 text-[#29ABE2] animate-spin" />
            ) : (
              <Send className="h-8 w-8 text-[#29ABE2]" />
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">
          {isLoading ? "Sending..." : "Send Message?"}
        </h3>
        <p className="text-[#4A4A4A]/70 mb-6">
          {isLoading
            ? "Please wait while we send your message."
            : "Are you sure you want to send this message to Blue Moon Associates?"}
        </p>

        {/* Buttons */}
        {!isLoading && (
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 border-2 border-gray-200 text-gray-500 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors"
            >
              Yes, Send!
            </button>
          </div>
        )}

        {/* Loading bar */}
        {isLoading && (
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#29ABE2] h-1.5 rounded-full animate-pulse w-3/4" />
          </div>
        )}
      </div>
    </div>
  );
}

// SUCCESS POPUP
interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessPopup({
  isOpen,
  onClose,
  title = "Message Sent!",
  message = "Thank you for contacting us. Our team will get back to you within 24 hours.",
}: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#4A4A4A] mb-2">{title}</h3>
        <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors"
          >
            Done
          </button>

          <a
            href="https://wa.me/923369218748?text=Hi, I just submitted an inquiry on your website. Please contact me."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
