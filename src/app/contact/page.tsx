"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Send } from "lucide-react";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Product Design (UI/UX)",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pranavedvankar3@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <article className="min-h-screen bg-dark text-light pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16 pt-8">
        
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-800 pb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 border border-neutral-800 bg-neutral-900 text-catYellow">
            <span>TRANSMISSION DOSSIER // DIRECT CONTACT</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] uppercase tracking-tight text-light leading-[0.88]">
            INITIATE CONTACT
          </h1>
          <p className="font-serif italic text-xl md:text-3xl text-catYellow font-normal">
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
                    className="p-1.5 border border-black/30 hover:bg-black/10 transition-colors shrink-0"
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
              <h3 className="font-display text-3xl uppercase tracking-tight text-light">
                DIRECT TRANSMISSION FORM
              </h3>

              {formSubmitted ? (
                <div className="p-6 bg-catYellow text-dark space-y-2">
                  <h4 className="font-display text-2xl uppercase">TRANSMISSION RECEIVED</h4>
                  <p className="font-serif text-sm">
                    Thank you. I will review your requirements and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-muted block uppercase">01. YOUR NAME / ORGANIZATION *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Studio Apex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-catYellow"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted block uppercase">02. YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@studioapex.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-catYellow"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted block uppercase">03. MESSAGE / BRIEF *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe scope and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-neutral-700 text-light focus:outline-none focus:border-catYellow resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-catYellow hover:bg-catYellow/90 text-dark font-display text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>DISPATCH MESSAGE</span>
                    <Send className="w-4 h-4" />
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
