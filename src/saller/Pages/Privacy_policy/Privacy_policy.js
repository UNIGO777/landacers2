import React from 'react'
import { motion } from 'framer-motion'

const Privacy_policy = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600">
                Welcome to Land Acre ("we," "our," or "us"). At Land Acre, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage with our services.
              </p>
              <p className="text-gray-600 mt-3">
                We encourage you to read this Privacy Policy carefully to understand our practices regarding your personal data. By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 mb-3">
                We collect several types of information from and about users of our services, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Personal Identifiers:</strong> Name, email address, phone number, postal address, and other similar identifiers you provide when registering, contacting us, or using our services.
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password, account preferences, and transaction history related to our services.
                </li>
                <li>
                  <strong>Property Information:</strong> Details about properties you list, search for, or express interest in.
                </li>
                <li>
                  <strong>Financial Information:</strong> Payment details, transaction history, and billing information when you make purchases through our platform.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our website, application, and services, including browsing history, search queries, and feature usage.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about your device, including IP address, device type, operating system, browser type, and mobile network information.
                </li>
                <li>
                  <strong>Location Data:</strong> Geographical location information when you use location-based features of our services.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Collect Information</h2>
              <p className="text-gray-600 mb-3">
                We collect information through various methods, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Direct Interactions:</strong> Information you provide when creating an account, listing a property, submitting forms, or communicating with us.
                </li>
                <li>
                  <strong>Automated Technologies:</strong> We automatically collect certain information when you visit our website or use our application through cookies, web beacons, and similar technologies.
                </li>
                <li>
                  <strong>Third Parties:</strong> We may receive information about you from third parties, such as business partners, social media platforms, and data providers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-600 mb-3">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Create and manage your account</li>
                <li>Connect buyers with sellers and facilitate property transactions</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Send marketing communications about our products, services, and promotions</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with legal obligations and enforce our terms and policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies and Similar Technologies</h2>
              <p className="text-gray-600 mb-3">
                We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. Cookies are small data files that are placed on your device when you visit a website. We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website to function properly.
                </li>
                <li>
                  <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Enable the website to provide enhanced functionality and personalization.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed to deliver more relevant advertisements.
                </li>
              </ul>
              <p className="text-gray-600 mt-3">
                You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible or not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-3">
                We may share your personal information with the following categories of recipients:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
                </li>
                <li>
                  <strong>Business Partners:</strong> Real estate agents, property developers, and other partners with whom we collaborate to offer products or services.
                </li>
                <li>
                  <strong>Other Users:</strong> When you list a property or interact with other users on our platform, certain information may be visible to them.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or to protect our rights, privacy, safety, or property, or that of our users or others.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of all or a portion of our assets.
                </li>
              </ul>
              <p className="text-gray-600 mt-3">
                We do not sell your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information in certain circumstances</li>
                <li>The right to restrict or object to the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time, where processing is based on consent</li>
              </ul>
              <p className="text-gray-600 mt-3">
                To exercise these rights, please contact us using the details provided in the "Contact Us" section below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Third-Party Links and Services</h2>
              <p className="text-gray-600">
                Our website and applications may contain links to third-party websites, applications, or services that are not owned or controlled by us. This Privacy Policy applies only to our services. We have no control over and assume no responsibility for the privacy practices of any third-party sites or services. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-3 text-gray-600">
                <p><strong>Email:</strong> contact@landAcre.in</p>
                <p><strong>Phone:</strong> +91 7224048054</p>
                <p><strong>Address:</strong> A-89, Airport Rd, Vijay Nagar, Lalghati, Bhopal, Madhya Pradesh 462030</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Privacy_policy