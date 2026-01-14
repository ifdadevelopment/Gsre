import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
                    <div className="bg-white rounded-md p-2 shadow">
            <Image
              src="/flogo.png"
              alt="GS Refrigeration Enterprises Logo"
              width={56}
              height={56}
              priority
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-md md:text-xl font-bold text-white">
              GS Refrigeration Enterprises
            </h2>
            <p className="text-xs text-gray-400">
              HVAC • Refrigeration • Industrial Cooling
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
        <div>
          <h4 className="text-white font-semibold mb-4">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 md:ml-0  ml-[-8px]">Services</h4>
          <ul className="space-y-2 text-[12px] md:text-sm">
            <li className="md:ml-0  ml-[-8px]">HVAC System Design</li>
            <li className="md:ml-0  ml-[-8px]">Air Conditioning Solutions</li>
            <li className="md:ml-0  ml-[-8px]">Refrigeration Systems</li>
            <li className="md:ml-0  ml-[-8px]">Industrial Cooling</li>
            <li className="md:ml-0  ml-[-8px]">Maintenance & Support</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex  md:gap-4 gap-2 md:text-lg text-xs">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center
                             rounded-full bg-gray-800 hover:bg-white
                             hover:text-gray-900 transition"
                >
                  <Icon />
                </Link>
              )
            )}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 md:ml-0  ml-[-8px]">Contact Us</h4>
          <ul className="space-y-3  md:text-sm text-[12px]">
            <li className="md:ml-0  ml-[-8px]">
              <a
                href="tel:+919873159140"
                className="flex items-start gap-2 hover:text-white transition"
              >
                <FaPhoneAlt className="md:text-sm text-[14px] mt-1" />
                <span className="text-xs md:text-sm">+91 9873159140</span>
              </a>
            </li>
            <li className="md:ml-0  ml-[-8px]">
              <a
                href="mailto:gsrefrigeration31@gmail.com"
                className="flex items-start gap-2 hover:text-white transition break-all"
              >
                <FaEnvelope className="md:text-sm text-[14px] mt-1" />
                <span>gsrefrigeration31@gmail.com</span>
              </a>
            </li>
            <li className="flex items-start gap-2 md:ml-0  ml-[-8px]">
              <FaMapMarkerAlt className="mt-1 md:text-sm text-[14px]" />
              <span>
                T-787 Church Lane, Bhogal, New Delhi-110014
              </span>
            </li>
          </ul>
        </div>

      </div>
      <div className="bg-gray-950 text-center py-4 text-xs md:text-sm text-gray-400">
        © {new Date().getFullYear()} GS Refrigeration Enterprises. All rights reserved.
      </div>

    </footer>
  );
}
