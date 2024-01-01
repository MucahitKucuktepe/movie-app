import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import MovieContextProvider from "./context/MovieContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter />
          <ToastContainer />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
