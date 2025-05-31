
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NxxxTuClavePublica");

const PayPage = () => {
  const handleStripePayment = async () => {
    const res = await fetch("https://your-server.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [{ id: "denuncia", quantity: 1 }]
      })
    });

    const data = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sistema de Pagos</h2>

      <div className="mb-8">
        <h3 className="text-xl mb-2">Pago Internacional (Stripe)</h3>
        <button
          onClick={handleStripePayment}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Pagar con tarjeta
        </button>
      </div>

      <div>
        <h3 className="text-xl mb-2">Pago desde Cuba (Lemon)</h3>
        <p className="mb-2">Realiza el pago mediante la siguiente cuenta de Lemon:</p>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Nombre:</strong> Juan Pérez</p>
          <p><strong>Lemon Tag:</strong> @identificarep</p>
          <p><strong>Monto:</strong> 5 USD</p>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
