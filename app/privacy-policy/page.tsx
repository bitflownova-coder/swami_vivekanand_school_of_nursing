import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Swami Vivekanand School of Nursing",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">1. Information Collection</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Register for our programs or workshops</li>
              <li>Submit inquiries through our contact forms</li>
              <li>Sign up for newsletters or updates</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">2. Information Usage</h2>
            <p className="text-gray-700 leading-relaxed">
              The information we collect is used to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Process your registrations and applications</li>
              <li>Communicate with you about programs and events</li>
              <li>Improve our services and website functionality</li>
              <li>Send important updates and notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">3. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information from 
              unauthorized access, alteration, disclosure, or destruction. All sensitive information 
              is stored securely and accessed only by authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. 
              Information may be shared only:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>With regulatory bodies as required by law</li>
              <li>With academic partners for placement purposes (with consent)</li>
              <li>To prevent fraud or protect our legal rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">5. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies to enhance user experience and analyze site traffic. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">7. Changes to Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on 
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 text-gray-700">
              <p><strong>Swami Vivekanand School of Nursing</strong></p>
              <p>Email: info@svsnursing.org</p>
              <p>Phone: +91 240 2485599</p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t text-sm text-gray-500">
            <p>Last Updated: January 26, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
