import { useCart } from "../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      className="fixed bottom-8 right-8 z-60 flex items-center gap-2 rounded-xl border-4 border-retro-green-text bg-retro-orange-bg text-retro-dark-text font-semibold px-4 py-3 shadow-lg animate-toast-in">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-5 shrink-0">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
      {toast.message}
    </div>
  );
}
