import ErrorBoundary from "./ErrorBoundary.jsx";
import { ThemeProvider } from "./ThemeProvider.jsx";
import { ToastProvider } from "./ToastProvider.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import { ChatProvider } from "../contexts/ChatContext.jsx";

export default function AppProvider({ children }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ChatProvider>{children}</ChatProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
