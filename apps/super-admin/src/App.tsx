import { AccessControlProvider } from "@clife/rbac/AccessControlContext";
import { Toaster } from "sonner";
import { RouterApp } from "./routes/router";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <AccessControlProvider user={user}>
      <Toaster />
      <RouterApp />
    </AccessControlProvider>
  );
}

export default App;
