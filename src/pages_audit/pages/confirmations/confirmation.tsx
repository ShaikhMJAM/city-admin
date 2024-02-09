import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const ConfirmationGridWrapper = lazy(() => import("./confirmationGrid"));
const VirtualCardProductTypeConfirm = lazy(
  () =>
    import(
      "../configurations/virtualCardProductType/virtualCardProductTypeConfirmGrid"
    )
);
const ChargeTemplateMasterConfirm = lazy(
  () => import("../configurations/chargeTemplate/chargeTemplateConfirm")
);
const DynamicBillerChargeConfirm = lazy(
  () => import("../configurations/dynamicBiller/billerChargeConfirmation")
);
const DynamicBillerConfirm = lazy(
  () => import("../configurations/dynamicBiller/dynamicBillerConfirm")
);
const MFSConfigConfirm = lazy(
  () => import("../configurations/mfsConfig/mfsConfigConfirmGrid")
);
const PGWConfigConfirm = lazy(
  () => import("../configurations/pgwMerUser/pgwMerUserConfirmGrid")
);
const MobileValidConfirm = lazy(
  () =>
    import("../configurations/servMobileValidMst/servMobileValidConfirmGrid")
);
const SchemeMasterConfirm = lazy(
  () => import("../configurations/schemeMaster/schemeMasterConfirm")
);
const UserBlockConfirmGridWrapper = lazy(
  () => import("../configurations/userBlockConfig/Confirmation")
);

export const ConfirmationMenu = () => (
  <Routes>
    <Route
      path="user-limit/*"
      element={<ConfirmationGridWrapper screenFlag="userLimit" />}
    />
    <Route
      path="pass_reset/*"
      element={<ConfirmationGridWrapper screenFlag="passReset" />}
    />

    <Route path="mfs-config-conf/*" element={<MFSConfigConfirm />} />
    <Route path="pgw-user-conf/*" element={<PGWConfigConfirm />} />
    <Route
      path="service-mobile-validation-confirm/*"
      element={<MobileValidConfirm />}
    />
    <Route
      path="cust_activation/*"
      element={<ConfirmationGridWrapper screenFlag="custActivation" />}
    />
    <Route
      path="service-config/*"
      element={<ConfirmationGridWrapper screenFlag="serviceConfig" />}
    />
    <Route path="charge-template/*" element={<ChargeTemplateMasterConfirm />} />
    <Route path="scheme-master/*" element={<SchemeMasterConfirm />} />
    <Route
      path="dynamic-biller/*"
      element={<DynamicBillerConfirm isDelete={"N"} />}
    />
    <Route
      path="delete-biller/*"
      element={<DynamicBillerConfirm isDelete={"Y"} />}
    />
    <Route
      path="biller-charge-acct/*"
      element={<DynamicBillerChargeConfirm />}
    />
    <Route
      path="operator-master/*"
      element={<ConfirmationGridWrapper screenFlag="operatorMaster" />}
    />
    <Route
      path="user-block-config/*"
      element={<UserBlockConfirmGridWrapper />}
    />
    <Route
      path="merchant-conf/*"
      element={<ConfirmationGridWrapper screenFlag="merchantOnboard" />}
    />
    <Route
      path="virtual-card-prod-type/*"
      element={<VirtualCardProductTypeConfirm />}
    />
    <Route
      path="virtual-card-image/*"
      element={<ConfirmationGridWrapper screenFlag="virtualCard" />}
    />
    <Route
      path="web-rerouting/*"
      element={<ConfirmationGridWrapper screenFlag="webRerouting" />}
    />
  </Routes>
);
