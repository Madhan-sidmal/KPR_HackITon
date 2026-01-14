import { Leaf } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: ["Interactive Map", "Market Prices", "Weather Alerts", "Crop Advisory"],
    },
    {
      title: "Get Involved",
      links: ["Join as Farmer", "Action Partners", "For Authorities", "Community Hub"],
    },
    {
      title: "Resources",
      links: ["Knowledge Hub", "API Access", "Data Downloads", "Success Stories"],
    },
    {
      title: "About",
      links: ["Our Mission", "Contact Us", "Privacy Policy", "Terms of Service"],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary via-secondary/95 to-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8" />
              <span className="text-2xl font-bold">KrishiDhara</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              India's Sustainable Agriculture & Environment Intelligence Network. Connecting farmers, communities, and authorities for a greener future.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2025 KrishiDhara. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Made with 🌱 for India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
