export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    // Backdrop
    <div
      className={`${isOpen ? "opacity-100" : "opacity-0 z-0 pointer-events-none"} flex fixed inset-0 bg-black/50 items-center justify-center z-50 transition-opacity duration-300 ease-out`}
      onClick={onClose}
    >
      {/* Modal container */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal content */}
        <h2 className="text-xl font-semibold mb-4 text-center">Are you sure you want to log out?</h2>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
