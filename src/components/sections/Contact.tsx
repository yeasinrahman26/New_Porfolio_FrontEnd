"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiSend,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp, IoMail } from "react-icons/io5";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    label: "Email",
    value: "yeasinrahmansafa@gmail.com",
    copyable: true,
    icon: <FiMail />,
  },
  {
    label: "Phone",
    value: "01777102026",
    copyable: false,
    icon: <FiPhone />,
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    copyable: false,
    icon: <FiMapPin />,
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/yeasinrahman26",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-yeasin-rahman-safa/",
    icon: <FaLinkedin />,
  },
  {
    label: "E-Mail",
    href: "mailto:yeasinrahmansafa@gmail.com?subject=Let's%20Work%20Together",
    icon: <IoMail />,
  },
  {
    label: "Whatsapp",
    href: "https://api.whatsapp.com/send/?phone=%2B8801777102026&text=Hi%20Safa%2C%20I%20saw%20your%20portfolio...",
    icon: <IoLogoWhatsapp />,
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yeasinrahmansafa@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formRef)
    if (!formRef.current) return;

    setLoading(true);
    setError(false);

    emailjs
      .sendForm(
        "service_yw2ogms", // ← Your Service ID
        "template_f5gkf4k", // ← Your Template ID
        formRef.current,
        "vCdKRBLQAkk8sDMB5", // ← Your Public Key
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);
          formRef.current?.reset();

          setTimeout(() => {
            setSent(false);
          }, 4000);
        },
        (err) => {
          console.error("EmailJS Error:", err);
          setLoading(false);
          setError(true);
        },
      );
  };

  return (
    <section id="contact" className="py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-widest mb-4 text-accent font-head">
            Contact
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-text leading-tight">
            Let&apos;s build something
            <br />
            <span className="bg-linear-to-r from-accent to-accent2 bg-clip-text text-transparent">
              incredible
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted mb-6">
              Whether you have a project in mind or just want to talk — my inbox
              is always open.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center bg-surface border border-border rounded-xl px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs text-muted">{item.label}</p>
                      <p className="text-sm font-mono text-text">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  {item.copyable && (
                    <button
                      onClick={copyEmail}
                      className="p-2 text-muted hover:text-text transition"
                    >
                      {copied ? (
                        <FiCheck className="text-green-500" />
                      ) : (
                        <FiCopy />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-muted hover:text-text hover:border-accent transition"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="border border-border rounded-2xl overflow-hidden">
              <div className="flex gap-2 px-4 py-3 bg-bg2 border-b border-border">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-3 text-xs text-muted font-mono">
                  send-message.tsx
                </span>
              </div>

              <div className="p-6 bg-bg3">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="text-xl font-bold text-text">Message Sent!</p>
                    <p className="text-muted text-sm">
                      I&apos;ll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text focus:border-accent outline-none"
                      required
                    />

                    <input
                      type="email"
                      name="user_email"
                      placeholder="you@email.com"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text focus:border-accent outline-none"
                      required
                    />

                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Your message"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text focus:border-accent outline-none resize-none"
                      required
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition disabled:opacity-70"
                    >
                      <FiSend />
                      {loading ? "Sending..." : "Send Message"}
                    </button>

                    {error && (
                      <p className="text-red-500 text-sm text-center">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
