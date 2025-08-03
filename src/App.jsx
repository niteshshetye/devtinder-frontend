import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import appStore from "./store";

import FeedPage from "./pages/Feed";
import LoginPage from "./pages/Login";
import Requests from "./pages/Requests";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";
import Connections from "./pages/Connections";

import AppLayout from "./Layouts/AppLayout";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
