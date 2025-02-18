import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store"; // Import the persistor
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import { PersistGate } from "redux-persist/integration/react"; // PersistGate import
import MainPages from "./pages/MainPages.jsx";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap your app with PersistGate */}
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPages />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user/:userId" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
