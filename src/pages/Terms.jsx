import React from "react";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#1A1A1C]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-[#5B5C60] mb-12">Last Updated: 2025</p>

          <div className="prose prose-invert max-w-none space-y-8 text-[#A9AAAC]">
            <p>
              Welcome to Smart Content Solutions. By using our website or services, you agree to these Terms of Service.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Use of the Service</h2>
              <p>You must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Be at least 18 years old</li>
                <li>Provide accurate information</li>
                <li>Use the platform legally</li>
              </ul>
              <p className="mt-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Abuse or misuse the platform</li>
                <li>Attempt to reverse engineer the system</li>
                <li>Use the service to send spam or harmful content</li>
                <li>Interfere with security or performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Accounts</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Keeping your login secure</li>
                <li>All activity under your account</li>
                <li>Not sharing your account access</li>
              </ul>
              <p className="mt-4">We may suspend or terminate accounts that break the rules.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Subscriptions and Billing</h2>
              <p>Smart Content Solutions operates on subscription plans.</p>
              <p className="mt-4">By subscribing, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your payment method will be charged automatically</li>
                <li>Subscriptions renew until cancelled</li>
                <li>You are responsible for managing your billing settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p>All code, designs, tools, branding, content, and AI generated systems belong to Smart Content Solutions.</p>
              <p className="mt-4">You receive a non-transferable license to use the tools as intended.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Use</h2>
              <p>Do not use the platform to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate laws</li>
                <li>Harass others</li>
                <li>Publish malicious content</li>
                <li>Infringe intellectual property</li>
                <li>Create automated spam systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Availability</h2>
              <p>We aim to provide consistent uptime, but we cannot guarantee that the service will always be error free, uninterrupted, or free from delays.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p>Smart Content Solutions is not liable for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Lost profits</li>
                <li>Data loss</li>
                <li>Downtime</li>
                <li>Business interruptions</li>
                <li>Damages resulting from misuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p>We may update these Terms occasionally. Continued use means you accept any changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
              <p>Email us at <a href="mailto:support@smartcontentsolutions.ai" className="text-[#E1C37A] hover:underline">support@smartcontentsolutions.ai</a> with any questions.</p>
            </section>

            {/* Refund and Cancellation Policy */}
            <section className="pt-8 border-t border-[#3B3C3E]">
              <h2 className="text-2xl font-semibold text-white mb-4">Refund and Cancellation Policy</h2>
              <p>Smart Content Solutions uses a subscription model.</p>
              
              <h3 className="text-xl font-medium text-[#D6D7D8] mt-6 mb-3">Refunds</h3>
              <p>We do not offer refunds for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Monthly subscriptions</li>
                <li>Renewals</li>
                <li>Partial months</li>
                <li>Account inactivity</li>
              </ul>
              <p className="mt-4">Refunds may be given only if a major technical issue prevents service use and our support team cannot resolve it.</p>

              <h3 className="text-xl font-medium text-[#D6D7D8] mt-6 mb-3">Cancellations</h3>
              <p>You may cancel anytime. Your subscription stays active until the end of the paid period. You must cancel before renewal to avoid charges.</p>
            </section>

            {/* Subscription Terms */}
            <section className="pt-8 border-t border-[#3B3C3E]">
              <h2 className="text-2xl font-semibold text-white mb-4">Subscription Terms</h2>
              <p>By subscribing, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Charges occur automatically</li>
                <li>You must keep your payment method valid</li>
                <li>Prices may change with notice</li>
                <li>Upgrades charge a prorated amount</li>
                <li>Downgrades take effect next billing cycle</li>
              </ul>
              <p className="mt-4">Failure to pay may suspend your account.</p>
            </section>

            {/* Cookie Policy */}
            <section className="pt-8 border-t border-[#3B3C3E]">
              <h2 className="text-2xl font-semibold text-white mb-4">Cookie Policy</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Improve functionality</li>
                <li>Personalize the dashboard</li>
                <li>Measure performance</li>
                <li>Analyze traffic</li>
              </ul>
              <p className="mt-4">Types used:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Essential cookies</li>
                <li>Analytics cookies</li>
                <li>Preference cookies</li>
                <li>Security cookies</li>
              </ul>
              <p className="mt-4">You may disable cookies but some features may break.</p>
            </section>

            {/* GDPR Compliance */}
            <section className="pt-8 border-t border-[#3B3C3E]">
              <h2 className="text-2xl font-semibold text-white mb-4">GDPR Compliance Notes</h2>
              <p>If you are in the EEA:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your data will be processed under legitimate interest, consent, or contract</li>
                <li>You may request deletion, restriction, or correction</li>
                <li>You may file complaints with your local authority</li>
              </ul>
              <p className="mt-4">We follow GDPR requirements for transparency, data handling, security, and user rights.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}