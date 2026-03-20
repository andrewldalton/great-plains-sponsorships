"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { trackEvent } from "@/lib/analytics";

const orgTypes = [
  "Municipality",
  "Sports Complex",
  "Team / Athletic Association",
  "Entertainment Venue",
  "Nonprofit",
  "Convention Center",
  "Stadium / Arena",
  "Touring / Entertainment Act",
  "Other",
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    orgType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/andrew.dalton@greatplainssponsorships.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          "Organization Type": formData.orgType,
          message: formData.message,
          _subject: `New GPS Inquiry from ${formData.organization || formData.name}`,
          _template: "table",
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setStatus("success");
      trackEvent("contact_form_submission", {
        orgType: formData.orgType,
        organization: formData.organization,
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please email us directly.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-b from-gps-cream to-white grid-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gps-green/10 rounded-full text-sm font-medium text-gps-green mb-6">
              Contact Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              Let&apos;s Start a{" "}
              <span className="gradient-text">Conversation</span>
            </h1>
            <p className="mt-6 text-xl text-gps-gray leading-relaxed">
              We&apos;d love to hear about your project. GPS will never send you
              unsolicited emails — we&apos;ll simply follow up on your inquiry
              to see how we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gps-light rounded-2xl p-12 text-center border border-gps-green/10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-gps-green mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gps-slate mb-3">
                        Thank You!
                      </h3>
                      <p className="text-gps-gray max-w-md mx-auto">
                        Thank you for reaching out! GPS will never send you
                        unsolicited emails. We&apos;ll follow up on your inquiry
                        to see how we can help.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gps-slate mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gps-slate mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gps-slate mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gps-slate mb-2">
                            Organization
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate"
                            placeholder="Your organization"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gps-slate mb-2">
                          Organization Type
                        </label>
                        <select
                          name="orgType"
                          value={formData.orgType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate bg-white"
                        >
                          <option value="">Select type...</option>
                          {orgTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gps-slate mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gps-green focus:ring-2 focus:ring-gps-green/20 outline-none transition-all text-gps-slate resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-red-500 text-sm">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gps-green text-white font-semibold rounded-full hover:bg-gps-green-dark transition-all glow-green disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="bg-gps-light rounded-2xl p-8 border border-gps-green/5 sticky top-28">
                  <h3 className="text-xl font-bold text-gps-slate mb-8">
                    Get in Touch
                  </h3>

                  <div className="space-y-6">
                    <a
                      href="mailto:andrew.dalton@greatplainssponsorships.com"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gps-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gps-green transition-colors">
                        <Mail className="w-5 h-5 text-gps-green group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gps-slate">
                          Email
                        </p>
                        <p className="text-sm text-gps-gray group-hover:text-gps-green transition-colors">
                          andrew.dalton@greatplainssponsorships.com
                        </p>
                      </div>
                    </a>

                    <a
                      href="tel:402-657-8170"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gps-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gps-green transition-colors">
                        <Phone className="w-5 h-5 text-gps-green group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gps-slate">
                          Phone
                        </p>
                        <p className="text-sm text-gps-gray group-hover:text-gps-green transition-colors">
                          (402) 657-8170
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gps-green/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-gps-green" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gps-slate">
                          Office
                        </p>
                        <p className="text-sm text-gps-gray">
                          Great Plains Sponsorships, Inc.
                          <br />
                          18919 Margo St.
                          <br />
                          Omaha, NE 68136
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gps-green/10">
                    <p className="text-xs text-gps-gray leading-relaxed">
                      GPS will never send you unsolicited emails. We respect
                      your privacy and will only follow up on your specific
                      inquiry.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
