import React, { lazy, Suspense } from 'react'
import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import useOrgAuthStore from "./store/useOrgAuthStore"
import { Loader2 } from 'lucide-react';
import Notification from './pages/notification/Notification';
import Member from './pages/member/Member';





const NotFound = lazy(() => import("./pages/404/NotFound"))
const Landing = lazy(() => import("./pages/landing/Landing"))
const Explore = lazy(() => import("./pages/explore/Explore"))
const Org = lazy(() => import("./pages/org/Org"))
const WishList = lazy(() => import("./pages/wishlist/WishList"))
const Application = lazy(() => import("./pages/application/Application"))
const Profile = lazy(() => import("./pages/profile/Profile"))
const Layout = lazy(() => import("./layout/Layout"));
const ProfilePage = lazy(() => import("./pages/profile/profile_page/ProfilePage"))
const AddEvent = lazy(() => import("./components/addevent/AddEvent"));
const ApplyVolDetails = lazy(() => import("./pages/applyVoldetails/ApplyVolDetails"))
const UpdatePassword = lazy(() => import("./pages/updatepassword/UpdatePassword"))
const OrgDetails = lazy(() => import("./pages/orgdetails/OrgDetails"))
const EditProfilePhoto = lazy(() => import("./pages/edit_profile_page_photo/EditProfilePhoto"));
const VolProfile = lazy(() => import("./pages/volProfile/VolProfile"))



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
      },
      {
        path: "/add-event",
        element: <AddEvent />
      },
      {
        path: "/vol-details/:id",
        element: <ApplyVolDetails />
      },
      {
        path: "/reset-password",
        element: <UpdatePassword />
      },
      {
        path: "/org-details",
        element: <OrgDetails />
      },
      {
        path: "/edit-profile",
        element: <EditProfilePhoto />
      },
      {
        path: "/member-details/:id",
        element: <Member />
      },
      {
        path: "/notification",
        element: <Notification />
      },
      {
        path: "/update-profile",
        element: <VolProfile />
      },
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