import Header from "@/components/Header";

export default function RefundPolicy() {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Refund & Exchange Policy</h1>

        <p className="mb-4">
          We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your products, please read our refund and exchange policy to understand the options available to you.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. No Returns or Refunds</h2>
        <p className="mb-2">
          <strong>Policy Overview:</strong> Due to the nature of our products, we do not accept returns, refunds, or exchanges for any items purchased. We encourage you to review product details carefully before making a purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Damaged or Defective Items</h2>
        <p className="mb-2">
          <strong>Notification:</strong> If you receive a damaged or defective item, please contact us immediately by email and return the product within <strong>7 days</strong>.
        </p>
        <p className="mb-2">
          <strong>Resolution:</strong> Once you report the issue, our team will work with you to resolve it promptly. Depending on the nature of the issue, we may provide a replacement. Verification of the damage or defect will be required. This process will be completed within <strong>7 days</strong>.
        </p>
        <p className="mb-2">
          <strong>Replacement:</strong> Once we receive the damaged product, we will process and deliver the replacement or exchange item within <strong>6–7 business days</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Contact Information</h2>
        <p className="mb-2">
          For assistance, please reach out to us at: <strong>Email:</strong> <a href="mailto:ardhenduroy600@gmail.com" className="text-blue-600 underline font-semibold">ardhenduroy600@gmail.com</a>
        </p>
      </div>
    </div>
  );
}