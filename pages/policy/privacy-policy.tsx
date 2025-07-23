import Header from "@/components/Header";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-2">
          We collect personal information that you voluntarily provide to us when you place an order, subscribe to our newsletter, or contact us for support. This information may include your name, email address, phone number, shipping address, and payment details.
        </p>
        <p className="mb-2">
          We may also automatically collect certain information, such as your IP address, browser type, and pages visited on our site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>To process and fulfill your orders, including payment processing and shipping</li>
          <li>To communicate with you regarding your order status and customer support inquiries</li>
          <li>To send you promotional emails or newsletters if you have opted in</li>
          <li>To improve our website and customer experience by analyzing user behavior</li>
          <li>To prevent fraudulent transactions and ensure security on our website</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing of Your Information</h2>
        <p className="mb-2">
          We value your privacy and do not sell or rent your personal information to third parties. However, we may share your information with trusted third-party service providers, such as payment processors and shipping companies, to help us process your orders.
        </p>
        <p className="mb-2">
          These service providers are only permitted to use your information for the purpose of providing the requested services and are obligated to maintain its confidentiality.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
        <p className="mb-2">
          We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand how you interact with our website.
        </p>
        <p className="mb-2">
          You may choose to disable cookies through your browser settings; however, this may impact your experience on our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p className="mb-2">
          We implement security measures to protect your personal information. While we strive to use commercially acceptable means to protect your personal information, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-2">
          Depending on your jurisdiction, you may have rights related to your personal information, such as the right to access, correct, or delete your data. If you would like to exercise these rights, we will respond to your request in compliance with applicable laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
        <p className="mb-2">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for any updates.
        </p>
        <p className="mb-2">
          Changes to this policy are effective as soon as they are posted on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
        <p className="mb-2">
          For privacy-related questions, contact us at:
        </p>
        <p className="mb-2">
          <strong>Email:</strong> <Link href="mailto:ardhenduroy600@gmail.com" className="text-blue-600 underline font-semibold">ardhenduroy600@gmail.com</Link>
        </p>
      </div>
    </div>
  );
}