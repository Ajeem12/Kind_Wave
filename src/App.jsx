import React, { lazy, Suspense } from 'react'
import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
const NotFound = lazy(() => import("./pages/404/NotFound"))
const Landing = lazy(() => import("./pages/landing/Landing"))
const Explore = lazy(() => import("./pages/explore/Explore"))
const Org = lazy(() => import("./pages/org/Org"))
const WishList = lazy(() => import("./pages/wishlist/WishList"))
const Application = lazy(() => import("./pages/application/Application"))
const Profile = lazy(() => import("./pages/profile/Profile"))
const Layout = lazy(() => import("./layout/Layout"));
const ProfilePage = lazy(() => import("./pages/profile/profile_page/ProfilePage"))
import { Loader2 } from 'lucide-react';
import useOrgAuthStore from "./store/useOrgAuthStore"


const ProtectedRoute = ({ children }) => {
  const token = useOrgAuthStore((state) => state.orgUser?.token);
  const isTokenValid = useOrgAuthStore((state) => state.isTokenValid);
  const logoutOrg = useOrgAuthStore((state) => state.logoutOrg);
  useEffect(() => {
    if (token && !isTokenValid()) {
      logoutOrg();
    }
  }, [token, isTokenValid, logoutOrg]);
  if (!token || !isTokenValid()) {
    return <Navigate to="/landing" replace />;
  }
  return children;
};



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Explore />,
      },
      {
        path: "/organization",
        element: <Org />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/application",
        element: <Application />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile-page",
        element: <ProfilePage />
      }
    ],
  },
  {
    path: "/landing",
    element: <Landing />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


const App = () => {

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen animate-spin">
            <Loader2 />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App