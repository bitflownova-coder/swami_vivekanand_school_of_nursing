import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Swami Vivekanand School of Nursing",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the Swami Vivekanand School of Nursing website, you accept 
              and agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">2. Registration and Admissions</h2>
            <p className="text-gray-700 leading-relaxed">
              All registrations and admissions are subject to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Verification of submitted documents and credentials</li>
              <li>Compliance with eligibility criteria set by regulatory authorities</li>
              <li>Payment of applicable fees as per the fee structure</li>
              <li>Adherence to admission timelines and procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">3. CNE Workshop Registrations</h2>
            <p className="text-gray-700 leading-relaxed">
              For Continuing Nursing Education (CNE) workshops:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Registration is confirmed only after payment verification</li>
              <li>Cancellations must be made at least 48 hours before the event</li>
              <li>Refunds are processed as per our refund policy</li>
              <li>Attendance is mandatory for certificate issuance</li>
              <li>Maximum of 2 certificate downloads are allowed per registration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">4. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed">
              Users of our website and services agree to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>Provide accurate and truthful information</li>
              <li>Not misuse or attempt to hack our systems</li>
              <li>Respect intellectual property rights</li>
              <li>Not submit false documents or credentials</li>
              <li>Maintain confidentiality of login credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">5. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              All fees are non-refundable unless otherwise specified. Payment must be made through 
              approved payment methods. The institution reserves the right to modify fee structures 
              with prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including text, images, logos, and course materials, 
              is the property of Swami Vivekanand School of Nursing and is protected by copyright 
              laws. Unauthorized use or reproduction is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to provide accurate information, but we cannot guarantee the completeness 
              or accuracy of all content. The institution is not liable for any damages arising 
              from the use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">8. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate access to our services for users who 
              violate these terms or engage in fraudulent activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service may be updated periodically. Continued use of our services 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to 
              the jurisdiction of courts in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions regarding these Terms of Service, contact:
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
