import "./App.css";
import "./style/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import { Login, Signup } from "./pages";

const routers = {
  "/account/login": {
    path: "/account/login",
    hasHeader: false,
    hasFooter: false,
    element: <Login />,
  },
  "/account/signup": {
    path: "/account/signup",
    hasHeader: true,
    hasFooter: false,
    element: <Signup />,
    title: "회원가입",
  },
};

function App() {
  const path = window.location.pathname;
  return (
    <AppLayout
      hasHeader={routers[path]?.hasHeader || false}
      hasFooter={routers[path]?.hasFooter || false}
      title={routers[path]?.title || ""}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path={routers[path]?.path || "*"}
            element={routers[path]?.element || null}
          />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
