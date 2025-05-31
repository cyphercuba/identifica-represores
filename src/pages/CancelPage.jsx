
const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Pago cancelado</h1>
      <p className="text-lg">No se completó el pago. Puedes intentarlo nuevamente cuando gustes.</p>
    </div>
  );
};

export default CancelPage;
