import "./App.css";
import { AuthProvider } from "./context/auth_provider";
import AppRoutes from "./route/routes";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
