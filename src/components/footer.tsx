import React from "react";

const footerLinks = [
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1G8rrqlHVj8YadlK36a5bVON5DN93Tp1u/view?usp=sharing",
    target: "_blank",
  },
  { label: "GitHub", href: "https://github.com/r4yfon", target: "_blank" },
  { label: "Email", href: "mailto:srayfon93@gmail.com", target: "_blank" },
];

const Footer: React.FC = () => {
  return (
    <footer className="h-64 px-16 flex justify-between items-center inset-shadow-sm">
      {/* Favicon on the left */}
      <div>
        <img
          src="/favicon.svg"
          alt="Favicon"
          className="opacity-75 h-24 w-24"
        />
      </div>
      {/* Links on the right */}
      <div className="flex flex-col gap-y-2">
        {footerLinks.map((link) => (
          <a
            className="hover:underline px-2 py-1"
            key={link.label}
            href={link.href}
            target={link.target}
            rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
