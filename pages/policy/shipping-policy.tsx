import Header from "@/components/Header";

export default function ShippingPolicy() {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        <p className="mb-4">
          We are committed to delivering your orders quickly and securely. Please read our shipping policy carefully to understand how your orders will be processed and shipped.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Processing Time</h2>
        <p className="mb-2">
          All orders are processed within <strong>1–3 business days</strong>. Bulk orders may take longer, and we will notify you of the expected timeline upon order confirmation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Shipping Rates & Delivery</h2>
        <p className="mb-2">
          Shipping charges are calculated at checkout based on your location and the weight of your order. We aim to keep shipping costs affordable while ensuring the safe delivery of our products.
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>
            <strong>Domestic Delivery (within India):</strong> Typically takes <strong>2–5 business days</strong>.
          </li>
          <li>
            <strong>International Delivery:</strong> Currently, we <span className="font-semibold">do not offer international shipping</span>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Tracking Information</h2>
        <p className="mb-2">
          Once your order is shipped, we will provide a tracking number via email. You can use this to track your order on the shipping provider’s website.
        </p>
      </div>
    </div>
  );
}