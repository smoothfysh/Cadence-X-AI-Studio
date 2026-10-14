import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { X, Send, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const captchaRef = useRef<HCaptcha | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStatusMessage(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const onHCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const onHCaptchaExpire = () => {
    setCaptchaToken('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    // Check hCaptcha verification as per Web3Forms documentation
    const textareaCaptcha = (form.querySelector('textarea[name="h-captcha-response"]') as HTMLTextAreaElement | null)?.value;
    const finalCaptchaToken = captchaToken || textareaCaptcha;

    if (!finalCaptchaToken) {
      alert("Please fill out captcha field");
      setStatusMessage({ type: 'error', text: 'Please complete the captcha verification.' });
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const originalText = submitBtn ? submitBtn.textContent : 'Book Consultation';

    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(form);
    formData.append("access_key", "4bd9817e-d021-4c8a-acd9-8abd9a1993ff");
    if (!formData.get("h-captcha-response")) {
      formData.append("h-captcha-response", finalCaptchaToken);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        setStatusMessage({ type: 'success', text: 'Success! Your message has been sent.' });
        form.reset();
        setCaptchaToken('');
        captchaRef.current?.resetCaptcha();
        // Optional smooth close after a short interval
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorMsg = data.message || "Failed to submit form.";
        alert("Error: " + errorMsg);
        setStatusMessage({ type: 'error', text: "Error: " + errorMsg });
        captchaRef.current?.resetCaptcha();
        setCaptchaToken('');
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setStatusMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E8E4DA] rounded-2xl shadow-2xl overflow-hidden my-8 transform transition-all">
        
        {/* Top Header Bar */}
        <div className="flex items-start justify-between p-6 sm:p-7 border-b border-[#E8E4DA] bg-white/70">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-semibold tracking-wider uppercase bg-blue-50 text-[#1D4ED8] border border-blue-200/60 mb-2">
              <Calendar className="w-3 h-3" />
              <span>CONSULTATION INQUIRY</span>
            </div>
            <h2 id="modal-headline" className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] tracking-tight">
              Book a Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct product leadership, advisory, and operational cadence for scaling teams.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body & Form */}
        <div className="p-6 sm:p-7 max-h-[calc(85vh-120px)] overflow-y-auto">
          {statusMessage && (
            <div
              className={`mb-5 p-3.5 rounded-lg flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form id="form" ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden Config Fields */}
            <input type="hidden" name="access_key" value="4bd9817e-d021-4c8a-acd9-8abd9a1993ff" />
            <input type="hidden" name="subject" value="Cadence-X Consultation Inquiry" />
            <input type="hidden" name="from_name" value="Cadence-X Consultation Form" />
            <input type="hidden" name="h-captcha-response" value={captchaToken} />

            {/* Grid: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono-tag mb-1.5">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DA] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono-tag mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="sarah@company.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DA] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Grid: Company & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono-tag mb-1.5">
                  Company & Role
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Acme Tech / Founder"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DA] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono-tag mb-1.5">
                  Service of Interest
                </label>
                <select
                  name="service"
                  defaultValue="Product Consulting"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DA] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all text-slate-900"
                >
                  <option value="Interim CPO">Interim CPO / Fractional Leadership</option>
                  <option value="Product Advisory">Product Advisory & Strategic Guidance</option>
                  <option value="Product Consulting">Product Consulting & Team Alignment</option>
                  <option value="Cadence Alignment">Sprint & Delivery Cadence Audit</option>
                  <option value="General Inquiry">General Exploration</option>
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono-tag mb-1.5">
                Message / Context <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={3}
                placeholder="Tell me about your product stage, current hurdles, or what you're looking to achieve..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DA] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* hCaptcha Container matching Web3Forms specification */}
            <div className="pt-2 flex flex-col items-center sm:items-start">
              <div className="h-captcha" data-captcha="true">
                <HCaptcha
                  ref={captchaRef}
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  reCaptchaCompat={false}
                  onVerify={onHCaptchaVerify}
                  onExpire={onHCaptchaExpire}
                />
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="pt-3 border-t border-[#E8E4DA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono-tag">
                Direct: <a href="mailto:consult@cadence-x.com" className="text-slate-700 underline hover:text-[#1D4ED8]">consult@cadence-X.com</a>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium text-sm transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
