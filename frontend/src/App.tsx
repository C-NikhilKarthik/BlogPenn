import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContextProvider from "@/hooks/context/appContext";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Draft from "@/pages/Draft";
import { ReduxProvider } from "@/hooks/redux/provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReduxProvider>
        <AppContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboard" element={<Login />} />
              <Route path="/onboard/register" element={<Register />} />
              <Route path="/draft/:id" element={<Draft />} />
            </Routes>
          </Router>
          <Toaster />
        </AppContextProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
