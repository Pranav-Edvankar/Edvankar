"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, MapPin, Phone, Clock, Send } from "lucide-react";

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
    <article className="min-h-screen bg-[#F5F3EE] bg-archive-grid pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 border-b border-[#DCD7C9] pb-8 pt-4">
          <div className="flex items-center gap-3">
            <span className="archive-stamp archive-stamp-rust">
              TRANSMISSION DOSSIER // DIRECT CONTACT
            </span>
            <span className="archive-tag text-xs text-[#7A786E]">
              CHANNEL OPEN
            </span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-[#1A1A18] tracking-tight leading-[0.95]">
            Initiate Contact
          </h1>
          <p className="font-editorial italic text-2xl text-[#8C3A27]">
            Available for product design contracts, enterprise UX research, and design systems.
          </p>
        </div>


        {/* Contact Information & Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Editorial Links & Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 border border-[#DCD7C9] bg-[#EFECE4] space-y-6">
              
              <div className="space-y-2 border-b border-[#DCD7C9] pb-4">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
                  ELECTRONIC MAIL
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:pranavedvankar3@gmail.com"
                    className="font-archive-mono text-sm font-medium text-[#1A1A18] hover:text-[#8C3A27] transition-colors break-all"
                  >
                    pranavedvankar3@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="p-1.5 border border-[#DCD7C9] bg-[#F5F3EE] hover:border-[#8C3A27] text-[#5E5D57] hover:text-[#8C3A27] transition-all shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-green-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="archive-tag text-[0.6rem] text-green-700 block pt-1">
                    [ EMAIL COPIED TO CLIPBOARD ]
                  </span>
                )}
              </div>

              <div className="space-y-2 border-b border-[#DCD7C9] pb-4">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
                  PROFESSIONAL NETWORK
                </span>
                <a
                  href="https://linkedin.com/in/pranav-edvankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-archive-mono text-xs text-[#1A1A18] hover:text-[#8C3A27] transition-colors flex items-center justify-between group"
                >
                  <span>linkedin.com/in/pranav-edvankar</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C3A27] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="space-y-2 border-b border-[#DCD7C9] pb-4">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
                  GEOGRAPHIC BASE
                </span>
                <p className="font-archive-mono text-xs text-[#5E5D57]">
                  Virar East, Mumbai, Maharashtra, India
                </p>
              </div>

              <div className="space-y-2">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
                  RESPONSE TIMELINE
                </span>
                <p className="text-xs text-[#5E5D57] leading-relaxed">
                  Queries are reviewed daily. Standard response window is within 12–24 hours (IST timezone).
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="md:col-span-7">
            <div className="p-6 md:p-8 border border-[#DCD7C9] bg-[#EFECE4] space-y-6">
              
              <div className="space-y-1 border-b border-[#DCD7C9] pb-3">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold">
                  TRANSMISSION FORM // INQUIRY
                </span>
                <h3 className="font-editorial text-2xl text-[#1A1A18]">
                  Send a Direct Message
                </h3>
              </div>

              {formSubmitted ? (
                <div className="p-6 border border-[#8C3A27] bg-[#8C3A27]/5 space-y-3">
                  <div className="archive-stamp archive-stamp-rust text-[0.65rem]">
                    TRANSMISSION DISPATCHED
                  </div>
                  <h4 className="font-editorial text-2xl text-[#1A1A18]">
                    Thank you for reaching out.
                  </h4>
                  <p className="text-xs font-archive-mono text-[#5E5D57]">
                    Your inquiry has been catalogued. I will review your requirements and respond shortly at {formData.email || "your email address"}.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-archive-mono text-[#8C3A27] hover:underline pt-2 inline-block"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="archive-tag text-[0.65rem] text-[#1A1A18] font-bold block">
                      01. YOUR NAME / ORGANIZATION *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova / Studio Apex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DCD7C9] bg-[#F5F3EE] text-sm text-[#1A1A18] focus:outline-none focus:border-[#8C3A27] font-archive-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="archive-tag text-[0.65rem] text-[#1A1A18] font-bold block">
                      02. YOUR EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@studioapex.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DCD7C9] bg-[#F5F3EE] text-sm text-[#1A1A18] focus:outline-none focus:border-[#8C3A27] font-archive-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="archive-tag text-[0.65rem] text-[#1A1A18] font-bold block">
                      03. ENGAGEMENT DOMAIN
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DCD7C9] bg-[#F5F3EE] text-sm text-[#1A1A18] focus:outline-none focus:border-[#8C3A27] font-archive-mono"
                    >
                      <option>Product Design (Mobile App / UI/UX)</option>
                      <option>Design Systems & Token Architecture</option>
                      <option>UX Research & Competitor Synthesis</option>
                      <option>Brand Identity & Web Storefront</option>
                      <option>Full-Time / Contract Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="archive-tag text-[0.65rem] text-[#1A1A18] font-bold block">
                      04. PROJECT BRIEF / MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your scope, timeline, and key design objectives..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DCD7C9] bg-[#F5F3EE] text-sm text-[#1A1A18] focus:outline-none focus:border-[#8C3A27] font-archive-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full archive-stamp archive-stamp-rust hover:bg-[#8C3A27] hover:text-white py-3 transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>DISPATCH TRANSMISSION</span>
                    <Send className="w-3.5 h-3.5" />
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
