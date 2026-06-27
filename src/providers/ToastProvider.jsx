import { Toaster } from "react-hot-toast";

export function ToastProvider({ children }) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
}
