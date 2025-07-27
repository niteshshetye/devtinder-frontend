import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import appStore from "./store";

import FeedPage from "./pages/Feed";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";

import AppLayout from "./Layouts/AppLayout";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/feed" element={<FeedPage />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
