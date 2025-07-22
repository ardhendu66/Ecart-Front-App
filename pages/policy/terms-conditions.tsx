import Header from "@/components/Header";

export default function TermsAndConditions() {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          The website is owned by <span className="font-semibold">Ardhendu Roy</span>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Terms</h2>
        <p className="mb-2">
          <strong>1.1 Eligibility:</strong> By using our website, you confirm that you are at least 18 years old or accessing the site under the supervision of a parent or guardian.
        </p>
        <p className="mb-2">
          <strong>1.2 Modifications:</strong> We reserve the right to amend these terms at any time. Updates will be posted on this page, and your continued use of the site constitutes acceptance of the changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Products and Services</h2>
        <p className="mb-2">
          <strong>2.1 Product Descriptions:</strong> We strive to provide accurate descriptions of our products. However, we do not guarantee that the descriptions, or other content are error-free, complete, or current.
        </p>
        <p className="mb-2">
          <strong>2.2 Pricing:</strong> All prices are listed in INR and are subject to change without prior notice. Any additional charges, such as taxes or shipping fees, will be displayed at checkout.
        </p>
        <p className="mb-2">
          <strong>2.3 Order Acceptance:</strong> We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or issues with payment.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
        <p className="mb-2">
          <strong>3.1 Payment Methods:</strong> We accept payments through credit cards, debit cards, UPI, etc. Payment must be completed at the time of purchase.
        </p>
        <p className="mb-2">
          <strong>3.2 Payment Security:</strong> We use secure payment gateways to process transactions. However, we are not responsible for unauthorised access or breaches on the payment platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Return and Exchange</h2>
        <p className="mb-2">
          Refer to our <a href="/policy/refund-exchange-policy" className="text-blue-600 underline">Return and Exchange Policy</a> for details on returns, refunds, and exchanges.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p className="mb-2">
          All content on this website, including text, images, logos, and designs, is the property of us and protected by applicable copyright and trademark laws. Unauthorised use is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="mb-2">
          We are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our website or products.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
        <p className="mb-2">
          For questions or concerns about these Terms and Conditions, please contact us:
        </p>
        <p className="mb-2">
          <strong>Email:</strong> <a href="mailto:ardhenduroy600@gmail.com" className="text-blue-600 underline font-semibold">ardhenduroy600@gmail.com</a>
        </p>
      </div>
    </div>
  );
}