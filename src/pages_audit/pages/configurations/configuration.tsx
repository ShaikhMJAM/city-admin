import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { BankMasterGridWrapper } from "./bankMaster";
// import { BranchMasterGridWrapper } from "./branchMaster";
// import { ChargeTemplateMaster } from "./chargeTemplate";
// import { DistMasterGridWrapper } from "./districtMaster";
// import { DynamicBillers } from "./dynamicBiller";
// import { MFSConfig } from "./mfsConfig";
// import { OperatorMasterGridWrapper } from "./operatorMaster";
// import { EMailSMSTemplateGridWrapper } from "./emailSMSTemplate";
// import { OtherEntityMasters } from "./otherEntityMasters";
// import { ParametersGridWrapper } from "./parameter";
// import { ParameterConfirmGridWrapper } from "./parameter/Confirmation";
// import { SchemeMaster } from "./schemeMaster";
// import { ServiceActiveConfigGridWrapper } from "./serviceActivateConfig";
// import { ServiceWiseConfigGridWrapper } from "./serviceWiseConfig";
// import { SourceParentGridWrapper } from "./sourceParentTypeMaster";
// import { ValidationMessagesGridWrapper } from "./validationMessages";
// import { CardCategoryMaster } from "./cardCategoryMaster";
// import { ScreenNotesGridWrapper } from "./screenNotes";
// import { MarqueMessageGrid } from "./marqueeMessage";
// import { FromSourceConfigGridWrapper } from "./fromSourceConfig";
// import { AppVersionMasterGridWrapper } from "./appVersionMaster";
// import { UserBlockConfigGridWrapper } from "./userBlockConfig";
// import { PgwMerUser } from "./pgwMerUser";
// import { CardBinImage } from "./cardBinImage";
// import { AtmLocMasterGridWrapper } from "./atmLocationMaster";
// import { EmiscMasterGridWrapper } from "./emiscMaster";
// import { BeneresMasterGridWrapper } from "./beneresMaster";
// import { FdschemeMasterGridWrapper } from "./fdschemeMaster";
// import { FileconfigMasterGridWrapper } from "./fileconfigMaster";
// import { GuessPwdMasterGridWrapper } from "./guessPwdMaster";

import { AppReviewGridWrapper } from "./appReviewMaster";
import { MobileValidationTemplateGridWrapper } from "./mobileValidationTempl";
import { ServiceMonitorGridWrapper } from "./serviceMonitorMst";
import { MsMessageConfig } from "./msMessageConfig";

import { LeaveMasterGridWrapper } from "./leavesMaster";
import { Cardactivedeactivegridwrapper } from "./cardActiveDeactiveConfigration";
import { ProductNameGridWrapper } from "./productDispalyNameConfigration";
import IdtpChargeConfigConfirmGridWrapper from "./IdtpChargeConfig/idtpChargeConfirmConfigGrid";
import { WebReroutingGridWrapper } from "./webRerouting/webReroutingGrid";
import { ServiceActiveDeactiveGridWrapper } from "./serviceActivateConfig/serviceActivateGrid";
// import CardImageGridWrapper from "./cardImageConfiguration";

const BankMasterGridWrapper = lazy(() => import("./bankMaster"));
const BranchMasterGridWrapper = lazy(() => import("./branchMaster"));
const ChargeTemplateMaster = lazy(() => import("./chargeTemplate"));
const DistMasterGridWrapper = lazy(() => import("./districtMaster"));
const DynamicBillers = lazy(() => import("./dynamicBiller"));
const MFSConfig = lazy(() => import("./mfsConfig"));
const OperatorMasterGridWrapper = lazy(() => import("./operatorMaster"));
const EMailSMSTemplateGridWrapper = lazy(() => import("./emailSMSTemplate"));
const OtherEntityMasters = lazy(() => import("./otherEntityMasters"));
const ParametersGridWrapper = lazy(() => import("./parameter"));
const ParameterConfirmGridWrapper = lazy(
  () => import("./parameter/Confirmation")
);
const SchemeMaster = lazy(() => import("./schemeMaster"));
const ServiceActiveConfigGridWrapper = lazy(
  () => import("./serviceActivateConfig")
);
const ServiceWiseConfigGridWrapper = lazy(() => import("./serviceWiseConfig"));
const SourceParentGridWrapper = lazy(() => import("./sourceParentTypeMaster"));
const ValidationMessagesGridWrapper = lazy(
  () => import("./validationMessages")
);
const CardCategoryMaster = lazy(() => import("./cardCategoryMaster"));
const ScreenNotesGridWrapper = lazy(() => import("./screenNotes"));
const MarqueMessageGrid = lazy(() => import("./marqueeMessage"));
const FromSourceConfigGridWrapper = lazy(() => import("./fromSourceConfig"));
const AppVersionMasterGridWrapper = lazy(() => import("./appVersionMaster"));
const UserBlockConfigGridWrapper = lazy(() => import("./userBlockConfig"));
const PgwMerUser = lazy(() => import("./pgwMerUser"));
const CardBinImage = lazy(() => import("./cardBinImage"));
const AtmLocMasterGridWrapper = lazy(() => import("./atmLocationMaster"));
const EmiscMasterGridWrapper = lazy(() => import("./emiscMaster"));
const BeneresMasterGridWrapper = lazy(() => import("./beneresMaster"));
const FdschemeMasterGridWrapper = lazy(() => import("./fdschemeMaster"));
const FileconfigMasterGridWrapper = lazy(() => import("./fileconfigMaster"));
const GuessPwdMasterGridWrapper = lazy(() => import("./guessPwdMaster"));
const MsPropertiesGridWrapper = lazy(() => import("./msPropertiesMst"));
const ServMobileValidGridWrapper = lazy(() => import("./servMobileValidMst"));
const EmailAcctMstGridWrapper = lazy(() => import("./emailAcctMst"));
const BannerMasterGridWrapper = lazy(() => import("./bannerMaster"));
const HolidayGridWrapper = lazy(() => import("./holidayConfiguration"));
const OtpSmsConfigGridWrapperform = lazy(() => import("./otpSmsConfig"));
const IdtpChargeConfigGridWrapper = lazy(() => import("./IdtpChargeConfig"));
const TenureTypeConfigGridWrapper = lazy(() => import("./tenureTypeConfig"));
const VirtualCardProductTypeGridWrapper = lazy(
  () => import("./virtualCardProductType")
);
const CardImageGridWrapper = lazy(() => import("./virtualCardImage"));
// ms monitoring
const MsMonitoringGridWrapper = lazy(() => import("./msMonitoringMaster"));
const PageContainGridWrapper = lazy(() => import("./PageContain"));

export const ConfigurationsMenu = () => (
  <Routes>
    <Route
      path="validation-msg/*"
      element={<ValidationMessagesGridWrapper />}
    />
    <Route path="charge-template/*" element={<ChargeTemplateMaster />} />
    <Route path="dynamic-biller/*" element={<DynamicBillers />} />
    <Route path="mfs-config/*" element={<MFSConfig />} />
    <Route path="pgw-user/*" element={<PgwMerUser />} />
    <Route path="card-bin-img/*" element={<CardBinImage />} />
    <Route path="service-config/*" element={<ServiceWiseConfigGridWrapper />} />
    <Route path="parameter/*" element={<ParametersGridWrapper />} />
    <Route path="para-confirm/*" element={<ParameterConfirmGridWrapper />} />
    <Route path="bank-master/*" element={<BankMasterGridWrapper />} />
    <Route path="branch-master/*" element={<BranchMasterGridWrapper />} />
    <Route path="district-master/*" element={<DistMasterGridWrapper />} />
    <Route path="atm-loc-upload/*" element={<AtmLocMasterGridWrapper />} />
    <Route path="e-misc-mst/*" element={<EmiscMasterGridWrapper />} />
    <Route path="bene-res/*" element={<BeneresMasterGridWrapper />} />
    <Route path="fd-config/*" element={<FdschemeMasterGridWrapper />} />
    <Route path="guide-line/*" element={<FileconfigMasterGridWrapper />} />
    <Route path="guess-pwd/*" element={<GuessPwdMasterGridWrapper />} />
    <Route path="email-acct/*" element={<EmailAcctMstGridWrapper />} />
    <Route path="banner/*" element={<BannerMasterGridWrapper />} />

    <Route
      path="service-mobile-validation/*"
      element={<ServMobileValidGridWrapper />}
    />

    <Route
      path="service-active/*"
      element={<ServiceActiveDeactiveGridWrapper />}
    />
    <Route path="operator-master/*" element={<OperatorMasterGridWrapper />} />
    <Route path="email-template/*" element={<EMailSMSTemplateGridWrapper />} />
    <Route path="scheme-master/*" element={<SchemeMaster />} />
    <Route
      path="university-master/*"
      element={<OtherEntityMasters entityType="U" />}
    />
    <Route
      path="club-master/*"
      element={<OtherEntityMasters entityType="C" />}
    />

    <Route path="ms-properties/*" element={<MsPropertiesGridWrapper />} />

    <Route
      path="source-parent-type-master/*"
      element={<SourceParentGridWrapper />}
    />
    <Route path="serv-mon/*" element={<ServiceMonitorGridWrapper />} />
    <Route path="app-review-mst/*" element={<AppReviewGridWrapper />} />

    <Route path="cardcategory-mst/*" element={<CardCategoryMaster />} />
    <Route
      path="insurance-master/*"
      element={<OtherEntityMasters entityType="I" />}
    />
    <Route
      path="mobile-validation/*"
      element={<MobileValidationTemplateGridWrapper />}
    />
    <Route path="ms-message/*" element={<MsMessageConfig />} />

    <Route
      path="util-master/*"
      element={<OtherEntityMasters entityType="P" />}
    />
    <Route path="screen-notes/*" element={<ScreenNotesGridWrapper />} />
    <Route path="marquee-message/*" element={<MarqueMessageGrid />} />
    <Route
      path="from-source-config/*"
      element={<FromSourceConfigGridWrapper />}
    />
    <Route path="app-version-mst/*" element={<AppVersionMasterGridWrapper />} />
    <Route
      path="user-block-config/*"
      element={<UserBlockConfigGridWrapper />}
    />
    <Route path="leaves-master/*" element={<LeaveMasterGridWrapper />} />
    <Route
      path="card-active-deactive/*"
      element={<Cardactivedeactivegridwrapper />}
    />
    <Route path="product-name-config/*" element={<ProductNameGridWrapper />} />
    <Route path="holiday-config/*" element={<HolidayGridWrapper />} />
    <Route path="otp-sms-config/*" element={<OtpSmsConfigGridWrapperform />} />
    <Route
      path="idtp-charge-config/*"
      element={<IdtpChargeConfigGridWrapper />}
    />
    <Route
      path="idtp-charge-confirm/*"
      element={<IdtpChargeConfigConfirmGridWrapper />}
    />
    <Route
      path="tenure-type-config/*"
      element={<TenureTypeConfigGridWrapper />}
    />
    <Route
      path="virtual-card-prod-type/*"
      element={<VirtualCardProductTypeGridWrapper />}
    />
    <Route path="virtual-card-image/*" element={<CardImageGridWrapper />} />
    <Route path="web-rerouting/*" element={<WebReroutingGridWrapper />} />

    <Route path="ms-monitoring/*" element={<MsMonitoringGridWrapper />} />
    <Route path="page-content/*" element={<PageContainGridWrapper />} />
  </Routes>
);
