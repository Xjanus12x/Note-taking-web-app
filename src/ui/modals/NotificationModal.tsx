import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

const NOTIFICATION_STATUS_STYLES = {
  success: "bg-green-600 border-l-4 border-green-800",
  failed: "bg-red-600 border-l-4 border-red-800",
};

type NotificationModalProps = {
  isVisible: boolean;
  message: string;
  status: "success" | "failed";
};

export default function NotificationModal({
  isVisible,
  message,
  status,
}: NotificationModalProps) {
  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed  z-50 p-6 w-full rounded-lg shadow-lg max-w-max text-white ${NOTIFICATION_STATUS_STYLES[status]}`}
          initial={{ top: 0, right: "50%", x: "50%", opacity: 1 }}
          animate={{ y: 30 }}
          exit={{ opacity: 0 }}
          tabIndex={0}
          aria-labelledby="notification-modal-title"
          aria-live="assertive"
          id="notification-modal"
          role="alertdialog"
        >
          <h2 id="notification-modal-title" className="sr-only">
            Notification
          </h2>
          {message}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("root-portal")!
  );
}
