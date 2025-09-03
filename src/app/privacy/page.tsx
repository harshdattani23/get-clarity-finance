import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 3, 2025";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            At Get Clarity Finance, we are committed to protecting your privacy and handling your personal information with the highest standards of security and transparency.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Last updated:</strong> {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-8">
            {/* Table of Contents */}
            <div className="mb-10 p-6 bg-blue-50 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-blue-600">
                <li><a href="#information-we-collect" className="hover:underline">1. Information We Collect</a></li>
                <li><a href="#how-we-use" className="hover:underline">2. How We Use Your Information</a></li>
                <li><a href="#ai-analysis" className="hover:underline">3. AI Analysis and Content Processing</a></li>
                <li><a href="#data-sharing" className="hover:underline">4. Information Sharing and Disclosure</a></li>
                <li><a href="#data-security" className="hover:underline">5. Data Security</a></li>
                <li><a href="#data-retention" className="hover:underline">6. Data Retention</a></li>
                <li><a href="#your-rights" className="hover:underline">7. Your Rights and Choices</a></li>
                <li><a href="#cookies" className="hover:underline">8. Cookies and Tracking Technologies</a></li>
                <li><a href="#third-party" className="hover:underline">9. Third-Party Services</a></li>
                <li><a href="#international" className="hover:underline">10. International Data Transfers</a></li>
                <li><a href="#children" className="hover:underline">11. Children's Privacy</a></li>
                <li><a href="#changes" className="hover:underline">12. Changes to This Privacy Policy</a></li>
                <li><a href="#contact" className="hover:underline">13. Contact Us</a></li>
              </ul>
            </div>

            {/* Section 1: Information We Collect */}
            <section id="information-we-collect" className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-medium text-gray-700 mb-3">1.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Account information (name, email address, phone number)</li>
                <li>Profile information and preferences</li>
                <li>Authentication data (via Clerk)</li>
                <li>Communication preferences and language settings</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">1.2 Content You Provide for Analysis</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Videos, images, and audio content submitted for fraud detection</li>
                <li>Social media posts and messages for analysis</li>
                <li>Investment-related documents and announcements</li>
                <li>Questions and queries submitted to our AI agents</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">1.3 Educational and Trading Data</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Course progress and completion data</li>
                <li>Quiz scores and assessment results</li>
                <li>Virtual trading activities and portfolio data</li>
                <li>Learning preferences and achievements</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">1.4 Technical Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>IP address, browser type, and device information</li>
                <li>Usage data and interaction patterns</li>
                <li>Performance metrics and error logs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* Section 2: How We Use Information */}
            <section id="how-we-use" className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
              </div>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li><strong>Fraud Detection:</strong> Analyze content using AI to identify potential financial scams, deepfakes, and fraudulent investment schemes</li>
                <li><strong>Educational Services:</strong> Provide personalized learning experiences, track progress, and recommend relevant content</li>
                <li><strong>Virtual Trading:</strong> Enable risk-free practice trading with real market data</li>
                <li><strong>Account Management:</strong> Create and maintain your account, provide customer support</li>
                <li><strong>Platform Improvement:</strong> Analyze usage patterns to improve our services and develop new features</li>
                <li><strong>Communication:</strong> Send important updates, educational content, and respond to inquiries</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and protect against illegal activities</li>
              </ul>
            </section>

            {/* Section 3: AI Analysis */}
            <section id="ai-analysis" className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">3. AI Analysis and Content Processing</h2>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Important Notice</h3>
                <p className="text-blue-700">
                  When you submit content for analysis, our AI systems process this information to detect potential fraud, scams, or misleading information. This processing is essential for providing our fraud detection services.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-700 mb-3">3.1 Content Processing</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Videos and audio are analyzed for deepfake detection and authenticity verification</li>
                <li>Text content is processed for misleading claims and fraudulent patterns</li>
                <li>Social media content is analyzed for pump-and-dump schemes and market manipulation</li>
                <li>Corporate announcements are cross-referenced with historical data and compliance records</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">3.2 AI Models and Third-Party Services</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>We use Google's Generative AI services for content analysis</li>
                <li>Content may be processed by third-party AI services under strict data protection agreements</li>
                <li>We do not use your content to train AI models without explicit consent</li>
                <li>Analysis results are stored to improve service accuracy and user experience</li>
              </ul>
            </section>

            {/* Section 4: Data Sharing */}
            <section id="data-sharing" className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">4. Information Sharing and Disclosure</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                We do not sell, rent, or trade your personal information. We may share information in the following limited circumstances:
              </p>

              <h3 className="text-xl font-medium text-gray-700 mb-3">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Authentication services (Clerk)</li>
                <li>AI analysis providers (Google Generative AI)</li>
                <li>Cloud hosting and database services</li>
                <li>Analytics and performance monitoring tools</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">4.2 Legal Requirements</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>To comply with applicable laws, regulations, or legal processes</li>
                <li>To respond to lawful requests from public authorities</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>To prevent or investigate suspected fraud, security breaches, or illegal activities</li>
              </ul>
            </section>

            {/* Section 5: Data Security */}
            <section id="data-security" className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">5. Data Security</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and updates</li>
                <li>Secure cloud infrastructure with leading providers</li>
                <li>Employee training on data protection best practices</li>
                <li>Incident response procedures for security breaches</li>
              </ul>
            </section>

            {/* Section 6: Data Retention */}
            <section id="data-retention" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Retention</h2>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li><strong>Account Data:</strong> Retained while your account is active and for a reasonable period after deletion</li>
                <li><strong>Content for Analysis:</strong> Processed content may be retained for up to 90 days for service improvement</li>
                <li><strong>Educational Progress:</strong> Learning data retained to maintain your progress and achievements</li>
                <li><strong>Technical Data:</strong> Logs and analytics data retained for up to 2 years for operational purposes</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with applicable laws</li>
              </ul>
            </section>

            {/* Section 7: Your Rights */}
            <section id="your-rights" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights and Choices</h2>
              
              <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Consent Withdrawal:</strong> Withdraw consent for optional data processing</li>
              </ul>

              <p className="text-gray-600">
                To exercise these rights, please contact us at privacy@getclarityfinance.com or through your account settings.
              </p>
            </section>

            {/* Section 8: Cookies */}
            <section id="cookies" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Cookies and Tracking Technologies</h2>
              
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to improve your experience:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality and security</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and language preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged in securely</li>
              </ul>

              <p className="text-gray-600">
                You can manage cookie preferences through your browser settings or our cookie preference center.
              </p>
            </section>

            {/* Section 9: Third-Party Services */}
            <section id="third-party" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Third-Party Services</h2>
              
              <p className="text-gray-600 mb-4">
                Our platform integrates with trusted third-party services:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li><strong>Clerk:</strong> Authentication and user management services</li>
                <li><strong>Google Generative AI:</strong> AI-powered content analysis</li>
                <li><strong>Market Data Providers:</strong> Real-time financial data for educational purposes</li>
                <li><strong>SEBI Database:</strong> Official registry verification services</li>
              </ul>

              <p className="text-gray-600">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            {/* Section 10: International Transfers */}
            <section id="international" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. International Data Transfers</h2>
              
              <p className="text-gray-600 mb-4">
                As we use global cloud services, your information may be transferred to and processed in countries outside of India. We ensure adequate protection through:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Contractual protections with service providers</li>
                <li>Compliance with international data protection frameworks</li>
                <li>Regular assessment of third-party security measures</li>
              </ul>
            </section>

            {/* Section 11: Children's Privacy */}
            <section id="children" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Children's Privacy</h2>
              
              <p className="text-gray-600 mb-6">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Section 12: Changes */}
            <section id="changes" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to This Privacy Policy</h2>
              
              <p className="text-gray-600 mb-6">
                We may update this Privacy Policy periodically. We will notify you of significant changes through email or a prominent notice on our platform. Your continued use of our services after such updates constitutes acceptance of the revised policy.
              </p>
            </section>

            {/* Section 13: Contact */}
            <section id="contact" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Us</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@getclarityfinance.com</p>
                  <p><strong>General Support:</strong> support@getclarityfinance.com</p>
                  <p><strong>Address:</strong> Get Clarity Finance, India</p>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This Privacy Policy is effective as of {lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
