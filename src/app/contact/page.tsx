"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Send, Loader2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pranavedvankar3@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/pranavedvankar3@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Transmission from ${formData.name} [Portfolio Contact]`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();
      if (response.ok && (data.success === "true" || data.success === true || data.message)) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to dispatch transmission. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to dispatch transmission. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="min-h-screen bg-dark text-light pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16 pt-8">
        
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-800 pb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 border border-neutral-800 bg-neutral-900 text-light">
            <span>TRANSMISSION DOSSIER // DIRECT CONTACT</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] uppercase tracking-tight text-light leading-[0.88]">
            INITIATE CONTACT
          </h1>
          <p className="font-serif italic text-xl md:text-3xl text-light font-normal">
            Available for product design contracts, enterprise UX research, and design systems.
          </p>
        </div>

        {/* Form & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Direct Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 bg-paper-card text-dark space-y-6 shadow-2xl">
              <div className="space-y-2 border-b border-black/20 pb-4">
                <span className="font-display text-base uppercase text-dark block">
                  ELECTRONIC MAIL
                </span>
                <div className="flex items-center justify-between gap-2 font-mono text-sm">
                  <a href="mailto:pranavedvankar3@gmail.com" className="font-bold hover:underline break-all">
                    pranavedvankar3@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    title="Copy Email"
                    className="p-1.5 border border-black/30 hover:bg-black/10 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-green-800" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 border-b border-black/20 pb-4 font-mono text-xs">
                <span className="font-display text-base uppercase text-dark block">
                  LINKEDIN PROFILE
                </span>
                <a
                  href="https://linkedin.com/in/pranav-edvankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between font-bold hover:underline"
                >
                  <span>linkedin.com/in/pranav-edvankar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <span className="font-display text-base uppercase text-dark block">
                  LOCATION
                </span>
                <p className="font-bold">Virar East, Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <div className="p-8 bg-neutral-900 border border-neutral-800 space-y-6">
              <div>
                <h3 className="font-display text-3xl uppercase tracking-tight text-light">
                  DIRECT TRANSMISSION FORM
                </h3>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-white text-dark space-y-4 border border-neutral-200 shadow-xl">
                  <div className="space-y-1">
                    <h4 className="font-display text-2xl uppercase tracking-tight text-dark">TRANSMISSION DISPATCHED</h4>
                    <p className="font-serif text-sm text-neutral-800">
                      Your message has been delivered directly to <strong className="font-mono font-bold text-black">pranavedvankar3@gmail.com</strong>. I will review your requirements and respond promptly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 bg-dark text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  {errorMessage && (
                    <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                      <div className="space-y-1">
                        <p>{errorMessage}</p>
                        <a
                          href={`mailto:pranavedvankar3@gmail.com?subject=Direct Inquiry from ${encodeURIComponent(formData.name || "Portfolio Visitor")}&body=${encodeURIComponent(formData.message)}`}
                          className="underline text-red-300 hover:text-white inline-block mt-1"
                        >
                          Click here to send via your email client instead &rarr;
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-muted block uppercase">01. YOUR NAME / ORGANIZATION *</label>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      placeholder="e.g. Studio Apex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted block uppercase">02. YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      placeholder="e.g. contact@studioapex.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted block uppercase">03. MESSAGE / BRIEF *</label>
                    <textarea
                      required
                      disabled={loading}
                      rows={5}
                      placeholder="Describe scope, deliverables, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-white resize-none disabled:opacity-50 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-display text-xl font-bold uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-3 shadow-lg hover:scale-[1.005] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                        <span className="text-black">TRANSMITTING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-black">DISPATCH MESSAGE</span>
                        <Send className="w-5 h-5 text-black" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
