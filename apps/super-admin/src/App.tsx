// import { AccessControlProvider } from "@clife/rbac/AccessControlContext";
import { ThemeProvider } from "@clife/theme/ThemeProvider";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./App.css";
// import { useAuth } from "./hooks/useAuthContext";
import { RouterApp } from "./routes/router";
import { store } from "./store";

function App() {
  // const { user } = useAuth();

  return (
    // <AccessControlProvider user={user}>
    <Provider store={store}>
      <ThemeProvider storageKey={"clife-super-admin-theme"}>
        <Toaster />
        <RouterApp />
      </ThemeProvider>
    </Provider>
    // </AccessControlProvider>
  );
}

export default App;
