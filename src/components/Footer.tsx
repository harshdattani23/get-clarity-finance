import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span>Get Clarity Finance</span>
            </Link>
            <p className="text-gray-600">
              AI-Powered Investor Protection.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Navigate</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
                <li><Link href="/#agents" className="text-gray-600 hover:text-blue-600">AI Agents</Link></li>
                <li><Link href="/virtual-trading" className="text-gray-600 hover:text-blue-600">Virtual Trading</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Learn</h3>
              <ul className="space-y-2">
                <li><Link href="/investment-security-course" className="text-gray-600 hover:text-blue-600">Investment Course</Link></li>
                <li><Link href="/investment-quiz" className="text-gray-600 hover:text-blue-600">Investment Quiz</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Get Clarity Finance. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
