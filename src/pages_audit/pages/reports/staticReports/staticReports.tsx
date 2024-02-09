import Report from "components/report";
import * as API from "../api";
import { accountDeletionMetaData } from "./metaData/accountDeletion";
import { loginHistoryMetaData } from "./metaData/loginHistory";
import { passwordChangeHistoryMetaData } from "./metaData/passwordChangeHistory";
import { registrationCustomerMetaData } from "./metaData/registrationCustomer";
import { userActivityMetaData } from "./metaData/userActivity";
import { mobileEmailUpdHistoryMetaData } from "./metaData/mobileEmailUpdHistory";
import { beneficiaryDetailMetaData } from "./metaData/beneficiaryDetailReport";
import { CashByCodeTransactionMetaData } from "./metaData/cashByCodeTransactionMetaData";
import { fundTrfDetailsMetaData } from "./metaData/fundTrfDetails";
import { otpNotificationReportMetaData } from "./metaData/otpNotificationReport";
import { mobEmailReportMetaData } from "./metaData/mobEmailreport";
import { emailTrfDetailsMetaData } from "./metaData/emailTrfDetails";
import { favouriteTransactionMetaData } from "./metaData/favouriteTrnDetails";
import { tagCardAccountMetaData } from "./metaData/tagCardAccount";
import { untagCardAccountMetaData } from "./metaData/untagCardAccount";
import { positivePayReqMetaData } from "./metaData/positivePayReqReport";
import { qrGeneratedMetaData } from "./metaData/qrGeneratedReport";
import { qrMerchantMetaData } from "./metaData/qrMerchantPayment";
import { chequeBookReqMetaData } from "./metaData/chequeBookReq";
import { chequeStopReqMetaData } from "./metaData/chequestopReqReport";
import { userBlockUnblockReqMetaData } from "./metaData/userBlockUnblockReport";
import { applyFixedDepositeMetaData } from "./metaData/applyToFixedDeposite";
import { applypensionSchemeMetaData } from "./metaData/applyToSchemeDeposite";
import { creditCardPaymentDetail } from "./metaData/creditCardPayment";
import { applyQuickLoanSummaryMetaData } from "./metaData/applyQuickLoanSummary";
import { applyForQuickLoanDetailMetaData } from "./metaData/applyForQuickLoanDetail";
import { supportingDocumentUploadMetaData } from "./metaData/supportingDocumentsUpload";
import { payOrderDetailsMetaData } from "./metaData/payOrderDetails";
import { fdrIssuanceMetaData } from "./metaData/FDRIssuance";
import { dpsIssuanceMetaData } from "./metaData/DPSIssuance";
import { apiResponseMetaData } from "./metaData/apiResponse";
import { adminUserInfoMetaData } from "./metaData/adminUserInformation";
import { adminUserActivityMetaData } from "./metaData/adminPanelUserActivity";
import { auditTrailDetailsMetaData } from "./metaData/userAuditTrailDetail";
import { userWiseScreenAccessMetaData } from "./metaData/userWiseScreenAccess";
import { perameterMasterAuditMetaData } from "./metaData/auditrailPerameterMaster";
import { primaryChangeMetaData } from "./metaData/primaryCustIDChange";
import { deviceChangeMetaData } from "./metaData/deviceChange";
import { mobileRechargeDetailMetaData } from "./metaData/mobileRechargeDetails";
import { topupRetrivalMetaData } from "./metaData/topupRetrival";
import { statusChangAuditMetaData } from "./metaData/statusChangeAudit";
import { mfsTranDetailMetaData } from "./metaData/MFSTransferTranDetail";
import { insurancePrePaymentMetaData } from "./metaData/insurancePremimumPayment";

import { paymentDetailsMetaData } from "./metaData/paymentDetails";
import { appUsageHistoryMetaData } from "./metaData/adminUserapplicationHistory";
import { monthlyServiceChanneletaData } from "./metaData/monthlyServiceMAU";
import { dailyUserwiseChanneletaData } from "./metaData/dailyUserwiseChannelMAU";
import { dailyServiceChanneletaData } from "./metaData/dailyServiceChannelMAU";
import { monthlyUserwiseChanneletaData } from "./metaData/monthlyUserwiseChannelMAU";
import { useState } from "react";

import { StaticAdminUserDetailsReports } from "./reportDetailsData/staticReportsDetails";
import { utilityBillerPaymentMetaData } from "./metaData/utilityBillerPayment";
import { dailySeriveChargesMetaData } from "./metaData/dailySericeWiseChargesReport";
import { CustomerGlobalLimitMetaData } from "./metaData/customerWiseGlobalLimitMetaData";
import { idtpRegistrationMetaData } from "./metaData/idtpRegistrationReport";
import { idtpTransferMetaData } from "./metaData/idtpTransferReport";
import { idtpTrnPinChangeMetaData } from "./metaData/idtpTransactionPINChangeReport";
import { idtpBeneficiaryDetailMetaData } from "./metaData/idtpBeneficiaryDetailReport";
import { idtpCreateRTPMetaData } from "./metaData/idtpCreateRTPReport";
import { PasswordResetMetaData } from "./metaData/passwordResetReport";
import { idtpForgotPinMetaData } from "./metaData/idtpForgotPINReport";
import { idtpRtpDeclineMetaData } from "./metaData/idtpRTPDeclineReport";
import { cardActiveResetPINMetaData } from "./metaData/cardActivateResetPINReport";
import { CurrentlyLoginCustomerDetailsMetaData } from "./metaData/currentlyLoginCutomerDetails";
import { ClubMemberMetaData } from "./metaData/clubMemberReport";
import { merchantTransctionMetaData } from "./metaData/merchantTransctionReport";
import { merchantTranReversalMetaData } from "./metaData/merchantTransctionReversalReport";
import { TrnParticularsDetailsReports } from "./trnParticulars/trnParticulars";
import { ServiceActiveDeactiveMetaData } from "./metaData/ServiceActiveDeactive";
import { monthlyServiceChanneChargesMetaData } from "./metaData/monthServiceChannelWiseChargesReport";
import { schedulePaymentMetaData } from "./metaData/schedulepaymentdetail";
import { virtualCardReqMetaData } from "./metaData/virtualCardReq";
import { format } from "date-fns";
import { mobEmailUpdLogMetaData } from "./metaData/mobEmailUpdLog";
import ReportWrapper from "components/report/serverReport/ReportWrapper";

export const StaticAdminUserReports = ({ screenFlag, subScreenFlag = "" }) => {
  const [isOpenSave, setIsOpenSave] = useState<any>(false);
  const [isOpenTrnParticular, setIsOpenTrnParticular] = useState<any>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [buttonName, setButtonName] = useState<any>({});
  let metaData;
  let otherAPIRequestPara;
  let apiURL = "reportServiceAPI/";
  if (screenFlag === "USERREGISTRATION") {
    metaData = registrationCustomerMetaData;
    otherAPIRequestPara = { test: "testpara" };
  } else if (screenFlag === "ACCOUNTDELETION") {
    metaData = accountDeletionMetaData;
  } else if (screenFlag === "PASSWORDCHANGEHISTORY") {
    metaData = passwordChangeHistoryMetaData;
  } else if (screenFlag === "LOGINHISTORY") {
    metaData = loginHistoryMetaData;
  } else if (screenFlag === "USERACTIVITY") {
    metaData = userActivityMetaData;
  } else if (screenFlag === "MOBEMAILUPDATIONHISTORY") {
    metaData = mobileEmailUpdHistoryMetaData;
  } else if (screenFlag === "BENIFICARYDETAIL") {
    metaData = beneficiaryDetailMetaData;
  } else if (screenFlag === "CASHBYCODEREQUEST") {
    metaData = CashByCodeTransactionMetaData;
  } else if (screenFlag === "FUNDTRANSACTIONRPTNEW") {
    metaData =
      subScreenFlag === "M" ? mfsTranDetailMetaData : fundTrfDetailsMetaData;
    otherAPIRequestPara = { A_IS_MFS_TRF: subScreenFlag === "M" ? "Y" : "N" };
  } else if (screenFlag === "OTPSMS") {
    metaData = otpNotificationReportMetaData;
  } else if (screenFlag === "MOBILEEMAILSMS") {
    metaData = mobEmailReportMetaData;
  } else if (screenFlag === "EMAILFUNDTRANSFER") {
    metaData = emailTrfDetailsMetaData;
  } else if (screenFlag === "FAVORITETRNDTL") {
    metaData = favouriteTransactionMetaData;
  } else if (screenFlag === "ACCOUNTTAG") {
    metaData = tagCardAccountMetaData;
  } else if (screenFlag === "ACCOUNTUNTAG") {
    metaData = untagCardAccountMetaData;
  } else if (screenFlag === "POSITIVEPAY") {
    metaData = positivePayReqMetaData;
  } else if (screenFlag === "QRINDGROUP") {
    metaData = qrGeneratedMetaData;
  } else if (screenFlag === "QRMERCHANT") {
    metaData = qrMerchantMetaData;
  } else if (screenFlag === "CHEAQUEBOOKREQDTL") {
    metaData = chequeBookReqMetaData;
  } else if (screenFlag === "CHEAQUESTOPREQ") {
    metaData = chequeStopReqMetaData;
  } else if (screenFlag === "USERBLOCKUNBLOCK") {
    metaData = userBlockUnblockReqMetaData;
  } else if (screenFlag === "FDDEPOSITEREQ") {
    metaData =
      subScreenFlag === "DPS"
        ? applypensionSchemeMetaData
        : applyFixedDepositeMetaData;
    otherAPIRequestPara = { A_TRN_TYPE: subScreenFlag };
  } else if (screenFlag === "CARDPAYTRN") {
    metaData = creditCardPaymentDetail;
  } else if (screenFlag === "LOANSUMMARY") {
    metaData = applyQuickLoanSummaryMetaData;
  } else if (screenFlag === "LOANDETAIL") {
    metaData = applyForQuickLoanDetailMetaData;
  } else if (screenFlag === "SUPPDOCUPLOAD") {
    metaData = supportingDocumentUploadMetaData;
  } else if (screenFlag === "PAYORDER") {
    metaData = payOrderDetailsMetaData;
  } else if (screenFlag === "FIXEDDEPOSITSD") {
    metaData = fdrIssuanceMetaData;
  } else if (screenFlag === "DEPOSITESSD") {
    metaData = dpsIssuanceMetaData;
  } else if (screenFlag === "ACCOUNTRESPONSE") {
    metaData = apiResponseMetaData;
  } else if (screenFlag === "ADMINUSERINFO") {
    metaData = adminUserInfoMetaData;
  } else if (screenFlag === "ADMINUSERACTIVITY") {
    metaData = adminUserActivityMetaData;
  } else if (screenFlag === "PARAMSTAUD") {
    metaData = perameterMasterAuditMetaData;
  } else if (screenFlag === "ADMINUSERAUD") {
    metaData = auditTrailDetailsMetaData;
  } else if (screenFlag === "TBGUSERACCESS") {
    metaData = userWiseScreenAccessMetaData;
  } else if (screenFlag === "PRIMARYAUTHCHANGE") {
    metaData = primaryChangeMetaData;
  } else if (screenFlag === "DEVICECHANGE") {
    metaData = deviceChangeMetaData;
  } else if (screenFlag === "MOBILERECHARGE") {
    metaData = mobileRechargeDetailMetaData;
  } else if (screenFlag === "TOPUPREVESAL") {
    metaData = topupRetrivalMetaData;
  } else if (screenFlag === "STATUSCHANGEAUDRPT") {
    metaData = statusChangAuditMetaData;
  } else if (screenFlag === "INSURANCEPAYTRNRPT") {
    metaData = insurancePrePaymentMetaData;
  } else if (screenFlag === "PAYMENTDETAIL") {
    metaData = paymentDetailsMetaData;
  } else if (screenFlag === "USERTBGLOG") {
    metaData = appUsageHistoryMetaData;
  } else if (screenFlag === "TRANSFERMAU") {
    metaData = monthlyServiceChanneletaData;
  } else if (screenFlag === "DAILYTRANSFERMAU") {
    metaData = dailyServiceChanneletaData;
  } else if (screenFlag === "USERWISEMAU") {
    metaData = monthlyUserwiseChanneletaData;
  } else if (screenFlag === "DAILYUSERWISEMAU") {
    metaData = dailyUserwiseChanneletaData;
  } else if (screenFlag === "UTILITYBILLRPT") {
    metaData = utilityBillerPaymentMetaData;
  } else if (screenFlag === "DAILYSERVICECHARGE") {
    metaData = dailySeriveChargesMetaData;
  } else if (screenFlag === "USERGLOBALLIMIT") {
    metaData = CustomerGlobalLimitMetaData;
  } else if (screenFlag === "IDTPREGISTRATION") {
    metaData = idtpRegistrationMetaData;
  } else if (screenFlag === "IDTPTRANSFERRPT") {
    metaData = idtpTransferMetaData;
  } else if (screenFlag === "IDTPCREATERTP") {
    metaData = idtpCreateRTPMetaData;
  } else if (screenFlag === "IDTPBENEFICIARYDTLRPT") {
    metaData = idtpBeneficiaryDetailMetaData;
  } else if (screenFlag === "IDTPTRANPINCHANGERPT") {
    metaData = idtpTrnPinChangeMetaData;
  } else if (screenFlag === "PASSWORDGENRPT") {
    metaData = PasswordResetMetaData;
  } else if (screenFlag === "IDTPFORGOTPIN") {
    metaData = idtpForgotPinMetaData;
  } else if (screenFlag === "IDTPRTPDECLINE") {
    metaData = idtpRtpDeclineMetaData;
  } else if (screenFlag === "CARDMANAGE") {
    metaData = cardActiveResetPINMetaData;
  } else if (screenFlag === "CURRENTCUSTLOGIN") {
    metaData = CurrentlyLoginCustomerDetailsMetaData;
  } else if (screenFlag === "CLUBMEMBERRPT") {
    metaData = ClubMemberMetaData;
  } else if (screenFlag === "PAYGATEWAY") {
    metaData = merchantTransctionMetaData;
  } else if (screenFlag === "MERCHANTREVERSETRN") {
    metaData = merchantTranReversalMetaData;
  } else if (screenFlag === "ACTIVEDEACTIVEREGISTER") {
    metaData = ServiceActiveDeactiveMetaData;
  } else if (screenFlag === "SERVICEWISECHARGERPT") {
    metaData = monthlyServiceChanneChargesMetaData;
  } else if (screenFlag === "GETSCHDPAYRPT") {
    metaData = schedulePaymentMetaData;
    apiURL = "commonServiceAPI/GETDYNAMICDATA/";
  } else if (screenFlag === "VIRTUALCARDREQRPT") {
    metaData = virtualCardReqMetaData;
  } else if (screenFlag === "GETSMSEMAILUPDFRMCITYTOUCHRPT") {
    metaData = mobEmailUpdLogMetaData;
    apiURL = "commonServiceAPI/GETDYNAMICDATA/";
  }

  // UTILITYBILLRPT
  return (
    <>
      {metaData.enableServerSidePagination ? (
        <ReportWrapper
          key={"reportID" + screenFlag + subScreenFlag}
          reportID={apiURL + screenFlag}
          reportName={screenFlag}
          metaData={metaData}
          // getAPIFn={API.getServerReportData}
          getAPIFn={API.getBankMasterGridDataForServer}
          maxHeight={window.innerHeight - 300}
          otherAPIRequestPara={otherAPIRequestPara}
          // autoFetch={metaData?.autoFetch ?? true}
          onClickActionEvent={(index, id, data) => {
            if (id === "TRN_PARTICULARS") {
              let rowData: any = {
                A_TRN_DT: format(
                  new Date(data?.TRAN_DT) ?? new Date(),
                  "dd/MM/yyyy HH:mm:ss"
                ),
                A_USER_ID: data?.USER_NAME ?? "",
                A_FROM_SOURCE: data?.FROM_SOURCE ?? "",
                A_FROM_ACCT: data?.FROM_ACCT_NO ?? "",
                A_TO_ACCT: data?.TO_ACCT_NO ?? "",
                A_TRN_TYPE: data?.TRAN_TYPE ?? "",
                A_MOBILE_NO: "",
                REMARKS: "",
                A_REF_NO: data?.REF_NO ?? "",
              };
              if (screenFlag === "FUNDTRANSACTIONRPTNEW") {
                rowData = {
                  ...rowData,
                  A_FROM_SOURCE: data?.APP_INDICATOR ?? "",
                  A_TRN_TYPE: data?.ORG_TRN_TYPE ?? "",
                  A_MOBILE_NO: data?.MOBILE_NO ?? "",
                  REMARKS: data?.REMARKS ?? "",
                };
              } else if (screenFlag === "CARDPAYTRN") {
                rowData = {
                  ...rowData,
                  A_TO_ACCT: data?.CARD_NO ?? "",
                  A_TRN_TYPE: data?.O_TRN_TYPE ?? "",
                  A_MOBILE_NO: data?.RECIPIENT_MOBILE_NO ?? "",
                  REMARKS: data?.REMARKS ?? "",
                };
              } else if (screenFlag === "UTILITYBILLRPT") {
                rowData = {
                  ...rowData,
                  A_TRN_TYPE: "UTLT",
                  A_CATEGORY_ID: data?.CATEGORY_ID ?? "",
                  A_SUB_CATEGORY_ID: data?.SUB_CATEGORY_ID ?? "",
                  A_BILLER_ID: data?.BILLER_ID ?? "",
                  A_BILL_NO: data?.BILL_NO ?? "",
                };
              }
              setIsOpenTrnParticular(true);
              setSelectedRow({ ...rowData, _metaData: metaData?.columns }); // attach metadata for labels
              setButtonName(id);
            } else {
              if (typeof index !== "undefined" && typeof id !== "undefined") {
                setSelectedRow({ ...data, _metaData: metaData?.columns }); // attach metadata for labels
                setIsOpenSave(true);
                setButtonName(id);
              }
            }
          }}
        />
      ) : (
        <Report
          key={"reportID" + screenFlag + subScreenFlag}
          reportID={apiURL + screenFlag}
          reportName={screenFlag}
          dataFetcher={API.getReportData}
          metaData={metaData}
          disableFilters
          maxHeight={window.innerHeight - 300}
          title={metaData.title}
          options={{
            disableGroupBy: metaData.disableGroupBy,
          }}
          hideFooter={metaData.hideFooter}
          hideAmountIn={metaData.hideAmountIn}
          retrievalType={metaData.retrievalType}
          initialState={{
            groupBy: metaData?.groupBy ?? [],
          }}
          refetchData={() => API.getReportData}
          onClickActionEvent={(index, id, data) => {
            if (id === "TRN_PARTICULARS") {
              let rowData: any = {
                A_TRN_DT: format(
                  new Date(data?.TRAN_DT) ?? new Date(),
                  "dd/MM/yyyy HH:mm:ss"
                ),
                A_USER_ID: data?.USER_NAME ?? "",
                A_FROM_SOURCE: data?.FROM_SOURCE ?? "",
                A_FROM_ACCT: data?.FROM_ACCT_NO ?? "",
                A_TO_ACCT: data?.TO_ACCT_NO ?? "",
                A_TRN_TYPE: data?.TRAN_TYPE ?? "",
                A_MOBILE_NO: "",
                REMARKS: "",
                A_REF_NO: data?.REF_NO ?? "",
              };
              if (screenFlag === "FUNDTRANSACTIONRPTNEW") {
                rowData = {
                  ...rowData,
                  A_FROM_SOURCE: data?.APP_INDICATOR ?? "",
                  A_TRN_TYPE: data?.ORG_TRN_TYPE ?? "",
                  A_MOBILE_NO: data?.MOBILE_NO ?? "",
                  REMARKS: data?.REMARKS ?? "",
                };
              } else if (screenFlag === "CARDPAYTRN") {
                rowData = {
                  ...rowData,
                  A_TO_ACCT: data?.CARD_NO ?? "",
                  A_TRN_TYPE: data?.O_TRN_TYPE ?? "",
                  A_MOBILE_NO: data?.RECIPIENT_MOBILE_NO ?? "",
                  REMARKS: data?.REMARKS ?? "",
                };
              } else if (screenFlag === "UTILITYBILLRPT") {
                rowData = {
                  ...rowData,
                  A_TRN_TYPE: "UTLT",
                  A_CATEGORY_ID: data?.CATEGORY_ID ?? "",
                  A_SUB_CATEGORY_ID: data?.SUB_CATEGORY_ID ?? "",
                  A_BILLER_ID: data?.BILLER_ID ?? "",
                  A_BILL_NO: data?.BILL_NO ?? "",
                };
              }
              setIsOpenTrnParticular(true);
              setSelectedRow({ ...rowData, _metaData: metaData?.columns }); // attach metadata for labels
              setButtonName(id);
            } else {
              if (typeof index !== "undefined" && typeof id !== "undefined") {
                setSelectedRow({ ...data, _metaData: metaData?.columns }); // attach metadata for labels
                setIsOpenSave(true);
                setButtonName(id);
              }
            }
          }}
          autoFetch={metaData?.autoFetch ?? true}
          otherAPIRequestPara={otherAPIRequestPara}
        />
      )}
      {isOpenSave ? (
        <StaticAdminUserDetailsReports
          screenFlag={screenFlag}
          rows={selectedRow}
          open={isOpenSave}
          onClose={() => setIsOpenSave(false)}
          buttonNames={buttonName}
        />
      ) : isOpenTrnParticular ? (
        <TrnParticularsDetailsReports
          rows={selectedRow}
          open={isOpenTrnParticular}
          onClose={() => setIsOpenTrnParticular(false)}
        />
      ) : null}
    </>
  );
};
