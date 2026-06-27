import { BrowserRouter } from "react-router-dom";
import AppProvider from "./providers/AppProvider.jsx";
import AppRoutes from "./routes/index.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
