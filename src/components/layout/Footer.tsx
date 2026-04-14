import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail, IoLogoWhatsapp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yeasinrahman26",
    icon: <FaGithub size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-yeasin-rahman-safa/",
    icon: <FaLinkedin size={20} />,
  },
  {
    label: "Email",
    href: "mailto:yeasinrahmansafa@gmail.com?subject=Let's%20Work%20Together",
    icon: <IoMail size={20} />,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=%2B8801777102026&text=Hi%20Safa%2C%20I%20saw%20your%20portfolio...",
    icon: <IoLogoWhatsapp size={20} />,
  },
  {
    label: "Resume",
    href: "/Md Yeasin Rahman Safa Frontend Developer .pdf", // Make sure this matches your public folder
    icon: <HiDocumentText size={20} />,
    download: true, // Special flag for resume
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#"
              className="font-syne text-2xl font-bold gradient-text tracking-tight"
            >
              {"< YRS. />"}
            </a>
            <p className="text-muted text-sm mt-2">
              Crafting exceptional digital experiences
            </p>
          </div>

          {/* Center - Social Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                download={
                  item.download
                    ? "Md Yeasin Rahman Safa - Frontend Developer.pdf"
                    : undefined
                }
                className="group flex flex-col items-center gap-1.5 text-muted hover:text-text transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs tracking-widest uppercase font-medium">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Right - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} Md Yeasin Rahman Safa.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
