import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ReleaseUsersMercGridWrapper } from "./releaseUserMerc";
// import { ReleaseUsersGridWrapper } from "./releaseUser";
// import { ReleaseCardUsersGridWrapper } from "./releaseUser/releaseUserGrid/releaseCardUserGrid";

const ReleaseUsersGridWrapper = lazy(
  () => import("./releaseUser/releaseUserGrid")
);
const ReleaseCardUsersGridWrapper = lazy(
  () => import("./releaseUser/releaseUserGrid/releaseCardUserGrid")
);

export const TechnicalSupport = () => (
  <Routes>
    <Route
      path="release-block-pgw-users/*"
      element={<ReleaseUsersMercGridWrapper />}
    />
    <Route path="release-block-users/*" element={<ReleaseUsersGridWrapper />} />
    <Route
      path="release-card-block-users/*"
      element={<ReleaseCardUsersGridWrapper />}
    />
  </Routes>
);
