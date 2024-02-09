import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ClearCacheProvider } from "cache";
import CorporateUserRegistractionGridWrapper from "./corporateUserRegistractionEntry";

const CustomerSearchingForm = lazy(() => import("./customerSearching"));
const TagAccountForm = lazy(() => import("./tagAccountCard"));
const TagCardForm = lazy(() => import("./tagAccountCard/tagAccountForm"));
const LoanRequestsGridWrapper = lazy(() => import("./loanRequest"));
const LoanClosureGridWrapper = lazy(() => import("./loanClosure"));
const CustomerActivationForm = lazy(() => import("./customerActivation"));
const PrimaryIDChangeForm = lazy(() => import("./primaryIDChange"));
const PrimaryIDChangeConfirm = lazy(
  () => import("./primaryIDChange/Confirmation")
);
const AccountDeletionReqWrapper = lazy(() => import("./accountDeletion"));
const MerchantOnboardingGrid = lazy(() => import("./merchantOnboarding"));
const FromSourceTemplateGridWrapper = lazy(
  () => import("./fromSourceTemplate")
);
const MerchantMasterGridWrapper = lazy(() => import("./merchantMaster"));
const RootDevicePermissionGrid = lazy(() => import("./rootDevicePermission"));
const RootDevicePermissionConfirmGrid = lazy(
  () => import("./rootDevicePermission/rootDevicePermissionConfirm")
);
const LoanLockReleaseRequestGridWrapper = lazy(
  () => import("./loanLockReleaseRequest")
);

export const OperationsMenu = () => (
  <Routes>
    <Route path="customer-searching/*" element={<CustomerSearchingForm />} />
    <Route
      path="tag-account/*"
      element={
        <ClearCacheProvider>
          <TagAccountForm />
        </ClearCacheProvider>
      }
    />
    <Route
      path="tag-card/*"
      element={
        <ClearCacheProvider>
          <TagCardForm />
        </ClearCacheProvider>
      }
    />
    <Route
      path="root-device-permission/*"
      element={
        <ClearCacheProvider>
          <RootDevicePermissionGrid />
        </ClearCacheProvider>
      }
    />
    <Route
      path="root-device-conf/*"
      element={
        <ClearCacheProvider>
          <RootDevicePermissionConfirmGrid />
        </ClearCacheProvider>
      }
    />
    <Route
      path="cib-loan-req/*"
      element={<LoanRequestsGridWrapper screenFlag="CIB" />}
    />
    <Route
      path="dbr-loan-req/*"
      element={<LoanRequestsGridWrapper screenFlag="DBR" />}
    />
    <Route
      path="auth-loan-req/*"
      element={<LoanRequestsGridWrapper screenFlag="AUTH" />}
    />
    <Route
      path="loan-lock-release-req/*"
      element={<LoanLockReleaseRequestGridWrapper />}
    />
    <Route path="loan-cls-req/*" element={<LoanClosureGridWrapper />} />
    {/* <Route
      path="user-limit/*"
      element={<ConfirmationGridWrapper screenFlag="userLimit" />}
    /> */}
    <Route path="customer-activation/*" element={<CustomerActivationForm />} />
    <Route path="primary-id-change/*" element={<PrimaryIDChangeForm />} />
    <Route path="primary-id-confirm/*" element={<PrimaryIDChangeConfirm />} />
    <Route
      path="acct-delete-checker/*"
      element={<AccountDeletionReqWrapper screenFlag={"N"} />}
    />
    <Route
      path="acct-delete-approval/*"
      element={<AccountDeletionReqWrapper screenFlag={"P"} />}
    />

    <Route path="merchant-add/*" element={<MerchantMasterGridWrapper />} />
    <Route path="merchant-onboard/*" element={<MerchantOnboardingGrid />} />
    <Route
      path="from-source-template/*"
      element={<FromSourceTemplateGridWrapper />}
    />
    <Route
      path="corporate-user-reg/*"
      element={<CorporateUserRegistractionGridWrapper />}
    />
    {/* <Route
      path="pass_reset_conf/*"
      element={<ConfirmationGridWrapper screenFlag="passReset" />}
    />
    <Route
      path="pass_reset_conf/*"
      element={<ConfirmationGridWrapper screenFlag="passReset" />}
    /> */}
  </Routes>
);
