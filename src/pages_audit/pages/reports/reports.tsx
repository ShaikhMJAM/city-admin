import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { StaticAdminUserReports } from "./staticReports";
// import { DynamicReportConfig } from "./dynamicReportConfig";

const StaticAdminUserReports = lazy(() => import("./staticReports"));
const DynamicReportConfig = lazy(() => import("./dynamicReportConfig"));

export const Reports = () => (
  <Routes>
    <Route path="dynamic-rpt-config/*" element={<DynamicReportConfig />} />
    <Route
      path="acct-deletion/*"
      element={<StaticAdminUserReports screenFlag="ACCOUNTDELETION" />}
    />
    <Route
      path="login-history/*"
      element={<StaticAdminUserReports screenFlag="LOGINHISTORY" />}
    />
    <Route
      path="reg-customers/*"
      element={<StaticAdminUserReports screenFlag="USERREGISTRATION" />}
    />
    <Route
      path="password-change/*"
      element={<StaticAdminUserReports screenFlag="PASSWORDCHANGEHISTORY" />}
    />
    <Route
      path="user-activity/*"
      element={<StaticAdminUserReports screenFlag="USERACTIVITY" />}
    />
    <Route
      path="mob-email-upd-hist/*"
      element={<StaticAdminUserReports screenFlag="MOBEMAILUPDATIONHISTORY" />}
    />
    <Route
      path="beneficiary-detail/*"
      element={<StaticAdminUserReports screenFlag="BENIFICARYDETAIL" />}
    />
    <Route
      path="cash-by-code-trn/*"
      element={<StaticAdminUserReports screenFlag="CASHBYCODEREQUEST" />}
    />
    <Route
      path="fund-trf-details/*"
      element={
        <StaticAdminUserReports
          screenFlag="FUNDTRANSACTIONRPTNEW"
          subScreenFlag="F"
        />
      }
    />
    <Route
      path="otp-sms-email/*"
      element={<StaticAdminUserReports screenFlag="OTPSMS" />}
    />{" "}
    <Route
      path="sms-email-notification/*"
      element={<StaticAdminUserReports screenFlag="MOBILEEMAILSMS" />}
    />
    <Route
      path="email-trf-details/*"
      element={<StaticAdminUserReports screenFlag="EMAILFUNDTRANSFER" />}
    />
    <Route
      path="favourite-trn/*"
      element={<StaticAdminUserReports screenFlag="FAVORITETRNDTL" />}
    />
    <Route
      path="tag-acct-card/*"
      element={<StaticAdminUserReports screenFlag="ACCOUNTTAG" />}
    />
    <Route
      path="untag-acct-card/*"
      element={<StaticAdminUserReports screenFlag="ACCOUNTUNTAG" />}
    />
    <Route
      path="positive-pay-req/*"
      element={<StaticAdminUserReports screenFlag="POSITIVEPAY" />}
    />
    <Route
      path="qr-ind-grp-genrate/*"
      element={<StaticAdminUserReports screenFlag="QRINDGROUP" />}
    />
    <Route
      path="qr-merchant-payment/*"
      element={<StaticAdminUserReports screenFlag="QRMERCHANT" />}
    />
    <Route
      path="cheque-book-req/*"
      element={<StaticAdminUserReports screenFlag="CHEAQUEBOOKREQDTL" />}
    />
    <Route
      path="cheque-stop-req/*"
      element={<StaticAdminUserReports screenFlag="CHEAQUESTOPREQ" />}
    />
    <Route
      path="user-block-unblock/*"
      element={<StaticAdminUserReports screenFlag="USERBLOCKUNBLOCK" />}
    />
    <Route
      path="apply-fd-req/*"
      element={
        <StaticAdminUserReports screenFlag="FDDEPOSITEREQ" subScreenFlag="FD" />
      }
    />
    <Route
      path="apply-dps-req/*"
      element={
        <StaticAdminUserReports
          screenFlag="FDDEPOSITEREQ"
          subScreenFlag="DPS"
        />
      }
    />
    <Route
      path="credit-card-payment/*"
      element={<StaticAdminUserReports screenFlag="CARDPAYTRN" />}
    />
    <Route
      path="apply-loan-summary/*"
      element={<StaticAdminUserReports screenFlag="LOANSUMMARY" />}
    />
    <Route
      path="apply-loan-detail/*"
      element={<StaticAdminUserReports screenFlag="LOANDETAIL" />}
    />
    <Route
      path="support-doc-upload/*"
      element={<StaticAdminUserReports screenFlag="SUPPDOCUPLOAD" />}
    />
    <Route
      path="pay-order-detail/*"
      element={<StaticAdminUserReports screenFlag="PAYORDER" />}
    />
    <Route
      path="fdr-issuance/*"
      element={<StaticAdminUserReports screenFlag="FIXEDDEPOSITSD" />}
    />
    <Route
      path="dps-issuance/*"
      element={<StaticAdminUserReports screenFlag="DEPOSITESSD" />}
    />
    <Route
      path="api-response/*"
      element={<StaticAdminUserReports screenFlag="ACCOUNTRESPONSE" />}
    />
    <Route
      path="admin-user-info/*"
      element={<StaticAdminUserReports screenFlag="ADMINUSERINFO" />}
    />
    <Route
      path="admin-user-activity/*"
      element={<StaticAdminUserReports screenFlag="ADMINUSERACTIVITY" />}
    />
    <Route
      path="parameter-mst-aud/*"
      element={<StaticAdminUserReports screenFlag="PARAMSTAUD" />}
    />
    <Route
      path="admin-user-aud/*"
      element={<StaticAdminUserReports screenFlag="ADMINUSERAUD" />}
    />
    <Route
      path="adminuser-screen-access/*"
      element={<StaticAdminUserReports screenFlag="TBGUSERACCESS" />}
    />
    <Route
      path="primary-id-change/*"
      element={<StaticAdminUserReports screenFlag="PRIMARYAUTHCHANGE" />}
    />
    <Route
      path="device-change/*"
      element={<StaticAdminUserReports screenFlag="DEVICECHANGE" />}
    />
    <Route
      path="mobile-recharge-details/*"
      element={<StaticAdminUserReports screenFlag="MOBILERECHARGE" />}
    />
    <Route
      path="topup-reversal/*"
      element={<StaticAdminUserReports screenFlag="TOPUPREVESAL" />}
    />
    <Route
      path="status-change-aud/*"
      element={<StaticAdminUserReports screenFlag="STATUSCHANGEAUDRPT" />}
    />
    <Route
      path="insurance-payment/*"
      element={<StaticAdminUserReports screenFlag="INSURANCEPAYTRNRPT" />}
    />
    <Route
      path="mfs-tran-detail/*"
      element={
        <StaticAdminUserReports
          screenFlag="FUNDTRANSACTIONRPTNEW"
          subScreenFlag="M"
        />
      }
    />
    <Route
      path="payment-details/*"
      element={<StaticAdminUserReports screenFlag="PAYMENTDETAIL" />}
    />
    <Route
      path="user-app-history/*"
      element={<StaticAdminUserReports screenFlag="USERTBGLOG" />}
    />
    <Route
      path="monthly-transfer-mau/*"
      element={<StaticAdminUserReports screenFlag="TRANSFERMAU" />}
    />
    <Route
      path="daily-transfer-mau/*"
      element={<StaticAdminUserReports screenFlag="DAILYTRANSFERMAU" />}
    />
    <Route
      path="monthly-userwise-mau/*"
      element={<StaticAdminUserReports screenFlag="USERWISEMAU" />}
    />
    <Route
      path="daily-userwise-mau/*"
      element={<StaticAdminUserReports screenFlag="DAILYUSERWISEMAU" />}
    />
    <Route
      path="utility-bill-payment/*"
      element={<StaticAdminUserReports screenFlag="UTILITYBILLRPT" />}
    />
    <Route
      path="daily-service-charges/*"
      element={<StaticAdminUserReports screenFlag="DAILYSERVICECHARGE" />}
    />
    <Route
      path="monthly-service-channel-charges/*"
      element={<StaticAdminUserReports screenFlag="" />}
    />
    <Route
      path="customer-global-limit/*"
      element={<StaticAdminUserReports screenFlag="USERGLOBALLIMIT" />}
    />
    <Route
      path="idtp-reg-report/*"
      element={<StaticAdminUserReports screenFlag="IDTPREGISTRATION" />}
    />
    <Route
      path="idtp-transfer-report/*"
      element={<StaticAdminUserReports screenFlag="IDTPTRANSFERRPT" />}
    />
    <Route
      path="idtp-create-rtp/*"
      element={<StaticAdminUserReports screenFlag="IDTPCREATERTP" />}
    />
    <Route
      path="idtp-beneficiary-dtl/*"
      element={<StaticAdminUserReports screenFlag="IDTPBENEFICIARYDTLRPT" />}
    />
    <Route
      path="idtp-pin-change/*"
      element={<StaticAdminUserReports screenFlag="IDTPTRANPINCHANGERPT" />}
    />
    <Route
      path="password-reset-adminpanel/*"
      element={<StaticAdminUserReports screenFlag="PASSWORDGENRPT" />}
    />
    <Route
      path="idtp-forgot-pin/*"
      element={<StaticAdminUserReports screenFlag="IDTPFORGOTPIN" />}
    />
    <Route
      path="idtp-rtp-decline/*"
      element={<StaticAdminUserReports screenFlag="IDTPRTPDECLINE" />}
    />
    <Route
      path="card-activate-reset-pin/*"
      element={<StaticAdminUserReports screenFlag="CARDMANAGE" />}
    />
    <Route
      path="currently-login-cust-dtl/*"
      element={<StaticAdminUserReports screenFlag="CURRENTCUSTLOGIN" />}
    />
    <Route
      path="club-member-report/*"
      element={<StaticAdminUserReports screenFlag="CURRENTCUSTLOGIN" />}
    />
    <Route
      path="merchant-tran-report/*"
      element={<StaticAdminUserReports screenFlag="PAYGATEWAY" />}
    />
    <Route
      path="merchant-tran-reversal/*"
      element={<StaticAdminUserReports screenFlag="MERCHANTREVERSETRN" />}
    />
    <Route
      path="club-member/*"
      element={<StaticAdminUserReports screenFlag="CLUBMEMBERRPT" />}
    />
    <Route
      path="service-active-deactive/*"
      element={<StaticAdminUserReports screenFlag="ACTIVEDEACTIVEREGISTER" />}
    />
    <Route
      path="monthly-service-charges/*"
      element={<StaticAdminUserReports screenFlag="SERVICEWISECHARGERPT" />}
    />
    <Route
      path="schedule-Payment-detail/*"
      element={<StaticAdminUserReports screenFlag="GETSCHDPAYRPT" />}
    />
    <Route
      path="virtual-card-req/*"
      element={<StaticAdminUserReports screenFlag="VIRTUALCARDREQRPT" />}
    />
    <Route
      path="mob-email-upd-log/*"
      element={
        <StaticAdminUserReports screenFlag="GETSMSEMAILUPDFRMCITYTOUCHRPT" />
      }
    />
  </Routes>
);
