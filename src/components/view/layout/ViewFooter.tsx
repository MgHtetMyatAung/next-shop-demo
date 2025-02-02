import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  GitlabIcon as GitHub,
} from "lucide-react";

export default function ViewFooter() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-7 mt-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Our Company</h2>
            <p className="mb-4">
              We provide high-quality products and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <GitHub className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-gray-900">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-900">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          {/* <div>
            <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
            <p className="mb-4">
              Stay updated with our latest offers and products.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col space-y-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className=" text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
