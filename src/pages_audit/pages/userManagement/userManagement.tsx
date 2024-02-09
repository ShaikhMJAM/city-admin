import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UserCreationConfirmGridWrapper } from "./userCreation/UserConfirmGrid";
// import { UserCreationGridWrapper } from "./userCreation";
// import { UserGroupGridWrapper } from "./userGroup";
// import { UserPushnotifGridWrapper } from "./userPushnotifTempl";
// import { UserReleaseGridWrapper } from "./userRelease";

const UserCreationGridWrapper = lazy(() => import("./userCreation"));
const UserGroupGridWrapper = lazy(() => import("./userGroup"));
const UserPushnotifGridWrapper = lazy(() => import("./userPushnotifTempl"));
const ScreenAccessRightsWrapper = lazy(() => import("./screenAccessRights"));
const UserReleaseGridWrapper = lazy(() => import("./userRelease"));

export const UserManagementMenu = () => (
  <Routes>
    {<Route path="user-maintenance/*" element={<UserCreationGridWrapper />} />}
    {<Route path="user-group/*" element={<UserGroupGridWrapper />} />}
    {<Route path="user-release/*" element={<UserReleaseGridWrapper />} />}
    {<Route path="user-push/*" element={<UserPushnotifGridWrapper />} />}
    {<Route path="screen-access/*" element={<ScreenAccessRightsWrapper />} />}
    <Route path="user-confirm/*" element={<UserCreationConfirmGridWrapper />} />
  </Routes>
);
