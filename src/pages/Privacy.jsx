import React from "react";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#1A1A1C]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-[#5B5C60] mb-12">Last Updated: 2025</p>

          <div className="prose prose-invert max-w-none space-y-8 text-[#A9AAAC]">
            <p>
              Smart Content Solutions respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, services, or platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-[#D6D7D8] mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Payment information (processed securely by third party providers)</li>
                <li>Account details</li>
                <li>Any content or data you submit through our tools</li>
              </ul>

              <h3 className="text-xl font-medium text-[#D6D7D8] mt-6 mb-3">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Device information</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time spent on site</li>
                <li>Usage activity inside the dashboard</li>
              </ul>

              <h3 className="text-xl font-medium text-[#D6D7D8] mt-6 mb-3">Information From Third Parties</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors</li>
                <li>Analytics platforms</li>
                <li>Social media platforms you connect</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Provide and improve our services</li>
                <li>Create and manage your account</li>
                <li>Personalize your dashboard experience</li>
                <li>Communicate with you about updates, billing, and support</li>
                <li>Improve website performance and security</li>
                <li>Prevent fraud or misuse of our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Protect Your Data</h2>
              <p>We use:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Encrypted connections</li>
                <li>Secure servers</li>
                <li>Access controls</li>
                <li>Industry standard security measures</li>
              </ul>
              <p className="mt-4">No method is perfect, but we work to keep your data safe at all times.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Sharing Your Information</h2>
              <p>We may share your data with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Payment processors</li>
                <li>Analytics services</li>
                <li>Email service providers</li>
                <li>Customer support platforms</li>
              </ul>
              <p className="mt-4 font-medium text-[#D6D7D8]">We never sell your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
              <p>We use cookies and tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Improve performance</li>
                <li>Remember your settings</li>
                <li>Provide analytics</li>
                <li>Deliver a smoother experience</li>
              </ul>
              <p className="mt-4">You can disable cookies in your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Access your data</li>
                <li>Correct or update your data</li>
                <li>Request deletion of your data</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent</li>
                <li>Object to certain data uses</li>
              </ul>
              <p className="mt-4">Email us at <a href="mailto:support@smartcontentsolutions.ai" className="text-[#E1C37A] hover:underline">support@smartcontentsolutions.ai</a> to make a request.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <p>We keep your data only as long as needed for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Providing services</li>
                <li>Legal compliance</li>
                <li>Business operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">International Transfers</h2>
              <p>Your data may be stored or processed in other countries. We use industry safeguards to protect it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p>For any privacy questions, email: <a href="mailto:support@smartcontentsolutions.ai" className="text-[#E1C37A] hover:underline">support@smartcontentsolutions.ai</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}