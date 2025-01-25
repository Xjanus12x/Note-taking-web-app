import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ConfirmationModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  confirmButtonLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};
export default function ConfirmationModal({
  title,
  description,
  isOpen,
  confirmButtonLabel,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="confirmation-modal"
          className="fixed inset-0 grid p-4 place-content-center bg-black/50"
          role="alertdialog"
          aria-labelledby="note-title"
          aria-describedby="note-description"
        >
          <motion.article
            className="w-full max-w-sm p-6 rounded shadow-lg bg-background-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <header>
              <h2 id="note-title" className="text-xl font-semibold text-color-2">
                {title}
              </h2>
            </header>
            <p id="note-description" className="mt-2 text-color-2">
              {description}
            </p>
            <footer className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 text-gray-800 bg-gray-200 rounded"
                aria-label="Cancel and keep the note"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  confirmButtonLabel.toLowerCase() === "delete note"
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
                aria-label="Confirm and delete the note"
                onClick={onConfirm}
              >
                {confirmButtonLabel}
              </button>
            </footer>
          </motion.article>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root-portal")!
  );
}
