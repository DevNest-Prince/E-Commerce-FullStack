const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">Zosh Bazzar</h2>
            <p className="mt-3 text-sm text-gray-400">
              Your one-stop online store for fashion, electronics & more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/" className="hover:text-white">Shop</a></li>
              <li><a href="/" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Help Center</a></li>
              <li><a href="/" className="hover:text-white">Returns</a></li>
              <li><a href="/" className="hover:text-white">Shipping</a></li>
              <li><a href="/" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
            <p className="text-sm mb-3 text-gray-400">Subscribe to get latest updates.</p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-gray-700 mt-10 pt-6 text-sm">
          © {new Date().getFullYear()} Zosh Bazzar — All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
