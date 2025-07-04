import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We offer a curated list of exciting activities across various cities
            to help you make the most of your free time.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="hover:text-white">
                Accueil
              </a>
            </li>
            <li>
              <a href="/activities" className="hover:text-white">
                Activities
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
