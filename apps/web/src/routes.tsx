import { AuthProvidingLayout } from "./lib/auth/auth.layout";
import { useAuth } from "./lib/hooks/useAuth";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MyCardsPage from "./pages/MyCards";
import { PartnerPage } from "./pages/PartnerPage";
import AddCard from './pages/AddCard';

const DefaultRoute = () => {
  const user = useAuth()?.user;

  if (user) {
    return <Navigate to="/cards" replace />;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvidingLayout />}>
      <Route path="/" element={<DefaultRoute />} />
      <Route path={"/auth"} element={<AuthPage />} />
      <Route path={"/cards"} element={<MyCardsPage />} />
      <Route path={"/partner/:id"} element={<PartnerPage />} />
    </Route>,
  ),
);

export default router;
