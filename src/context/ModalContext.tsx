import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextType = {
  isDeleteButtonTriggered: boolean;
  setIsDeleteButtonTriggered: React.Dispatch<React.SetStateAction<boolean>>;

  isArchiveButtonTriggered: boolean;
  setIsArchiveButtonTriggered: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useConfirmationModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useConfirmationModal must be used within ModalProvider");
  }
  return {
    isDeleteButtonTriggered: context.isDeleteButtonTriggered,
    setIsDeleteButtonTriggered: context.setIsDeleteButtonTriggered,

    isArchiveButtonTriggered: context.isArchiveButtonTriggered,
    setIsArchiveButtonTriggered: context.setIsArchiveButtonTriggered,
  };
}

export function useNotificationModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useNotificationModal must be used within ModalProvider");
  }
  return {};
}

type ModalProviderProps = PropsWithChildren;
export default function ModalProvider({ children }: ModalProviderProps) {
  const [isDeleteButtonTriggered, setIsDeleteButtonTriggered] = useState(false);
  const [isArchiveButtonTriggered, setIsArchiveButtonTriggered] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{
        isDeleteButtonTriggered,
        setIsDeleteButtonTriggered,

        isArchiveButtonTriggered,
        setIsArchiveButtonTriggered,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
