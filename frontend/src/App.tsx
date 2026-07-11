import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import HCPDirectory from "./pages/HCPDirectory";
import LogInteraction from "./pages/LogInteraction";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LogInteraction />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/hcp" element={<HCPDirectory />} />

          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;