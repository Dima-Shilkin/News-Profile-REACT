import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { WeatherPage } from "./pages/WeatherPage/WeatherPage";
import { CurrencyPage } from "./pages/CurrencyPage/CurrencyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/news" element={<NewsPage />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/currency" element={<CurrencyPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
