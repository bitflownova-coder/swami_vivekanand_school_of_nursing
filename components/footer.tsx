import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Institution Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image 
                  src="/nursinglogo (1).png" 
                  alt="Nursing Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-wide">INDRAYANI</h3>
                <h3 className="font-bold text-xl tracking-wide">PRATISHTHAN</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premier institute for GNM nursing education in Maharashtra, dedicated to nurturing compassionate healthcare professionals.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link 
                href="https://www.instagram.com/svs_of_nursing/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-300"
              >
                <Image 
                  src="/instagram.png" 
                  alt="Instagram" 
                  width={24} 
                  height={24} 
                />
              </Link>
              <Link 
                href="https://www.facebook.com/swamivivekanandschoolofnursing/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-300"
              >
                <Image 
                  src="/facebook.png" 
                  alt="Facebook" 
                  width={24} 
                  height={24} 
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-blue-500 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us",         href: "/about" },
                { label: "Academic",         href: "/academic" },
                { label: "Admissions",       href: "/admissions" },
                { label: "Facilities",       href: "/facilities" },
                { label: "CNE",              href: "/cne" },
                { label: "Student's Corner", href: "/downloads" },
                { label: "Events",           href: "/events" },
                { label: "Contact Us",       href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* College Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-blue-500 after:rounded-full">
              College Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Beed Bypass Road, Beside Surya Lawns, Aurangabad, Maharashtra, India – 431009
                </p>
              </div>
              <a 
                href="tel:7517275151" 
                className="flex items-center space-x-3 group hover:text-blue-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm group-hover:text-blue-400">7517275151</p>
              </a>
              <a 
                href="mailto:swamivekanandschoolofnursing@gmail.com" 
                className="flex items-start space-x-3 group hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm group-hover:text-blue-400 break-all">
                  swamivekanandschoolofnursing@gmail.com
                </p>
              </a>
            </div>
          </div>

          {/* Trust Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-blue-500 after:rounded-full">
              Trust Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Flat No. 04, Waheguru Complex, Pundalik Nagar Road, Near Gajanan Mandir, Chh. Sambhajinagar
                </p>
              </div>
              <a 
                href="mailto:indrayanipratishthan51@gmail.com" 
                className="flex items-start space-x-3 group hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm group-hover:text-blue-400 break-all">
                  indrayanipratishthan51@gmail.com
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} INDRAYANI PRATISHTHAN. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
