import "./App.css";
import "./style/global.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./components/layout";
import { Coupon, Event, Login, Mypage, Profile, Signup } from "./pages";

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
  "/mypage": {
    path: "/mypage",
    hasHeader: true,
    hasFooter: true,
    element: <Mypage />,
    title: "마이페이지",
  },
  "/mypage/profile/:id": {
    // 동적 경로 설정
    path: "/mypage/profile/:id",
    hasHeader: true,
    hasFooter: false,
    element: <Profile />,
    title: "프로필 수정",
  },
  "/mypage/coupon/:id": {
    path: "/mypage/coupon/:id",
    hasHeader: true,
    hasFooter: false,
    element: <Coupon />,
    title: "쿠폰",
  },
  "/event": {
    path: "/event",
    hasHeader: true,
    hasFooter: false,
    element: <Event />,
    title: "이벤트",
  },
};

function AppContent() {
  const location = useLocation();
  const matchedRoute = Object.values(routers).find((route) =>
    new RegExp(`^${route.path.replace(/:id/g, "[^/]+")}$`).test(
      location.pathname
    )
  );

  return (
    <AppLayout
      hasHeader={matchedRoute?.hasHeader || false}
      hasFooter={matchedRoute?.hasFooter || false}
      title={matchedRoute?.title || ""}
    >
      <Routes>
        {Object.values(routers).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
