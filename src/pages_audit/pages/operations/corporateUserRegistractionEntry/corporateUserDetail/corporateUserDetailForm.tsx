import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { corporateUserDetailsMetaData } from "./corporateMetaData";
import Button from "@mui/material/Button";
import { InitialValuesType, SubmitFnType } from "packages/form";
import { useStyles } from "pages_audit/common/tabStyles";
import { PartnerUserGridWrapper } from "./partnerUser";
import { OtherUserGridWrapper } from "./otherUser";
import { AccountMappingGridWrapper } from "./accountMapping";
import { AuthenticationMetrixGridWrapper } from "./authenticationMetrix";
import { useLocation } from "react-router-dom";
import { DailyLimitGrid } from "./dailyLimit/dailyLimit";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const CorporateUserRegistrationDetails = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabClasses = useStyles();
  const [formMode, setFormMode] = useState(defaultView);
  const [isOpenLimit, setIsOpenLimit] = useState(false);
  const { state: rows }: any = useLocation();

  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const onSubmitHandler: SubmitFnType = (
    data: any,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    // setIsOpenSave(true);
  };

  return (
    <Dialog
      open={true}
      fullScreen={true}
      PaperProps={{
        style: {
          overflow: "auto",
          display: "auto",
        },
      }}
    >
      <FormWrapper
        key={"corporateUserDetails" + formMode}
        metaData={corporateUserDetailsMetaData as MetaDataType}
        onSubmitHandler={onSubmitHandler}
        initialValues={rows?.[0]?.data as InitialValuesType}
        //@ts-ignore
        // displayMode={formMode}
        formStyle={{
          background: "white",
        }}
        onFormButtonClickHandel={() => {
          setIsOpenLimit(true);
        }}
        containerstyle={{ padding: "10px", maxWidth: "100%" }}
      >
        {({ isSubmitting, handleSubmit }) => (
          // <>
          //   {formMode === "edit" ? (
          //     <>
          //       <Button
          //         onClick={(event) => {
          //           handleSubmit(event, "Save");
          //         }}
          //         // disabled={isSubmitting}
          //         //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          //         color={"primary"}
          //       >
          //         Save
          //       </Button>
          //       <Button
          //         onClick={() => {
          //           setFormMode("view");
          //         }}
          //         color={"primary"}
          //         // disabled={isSubmitting}
          //       >
          //         Cancel
          //       </Button>
          //     </>
          //   ) : formMode === "add" ? (
          <>
            <Button
              onClick={(event) => {
                // handleSubmit(event, "Save");
              }}
              // disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              Save
            </Button>
            <Button
              onClick={closeDialog}
              color={"primary"}
              // disabled={isSubmitting}
            >
              Close
            </Button>
          </>
          //   ) : (
          //     <>
          //       <Button
          //         onClick={() => {
          //           setFormMode("edit");
          //         }}
          //         //disabled={isSubmitting}
          //         color={"primary"}
          //       >
          //         Edit
          //       </Button>
          //       <Button
          //         onClick={closeDialog}
          //         //disabled={isSubmitting}
          //         color={"primary"}
          //       >
          //         Close
          //       </Button>
          //     </>
          //   )}
          // </>
        )}
      </FormWrapper>
      <div style={{ padding: "10px" }}>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          <Tab label="Controlling Person" id="0" />
          <Tab label="Corporate Finance Department" id="1" />
          <Tab label="Account Mapping" id="2" />
          <Tab label="Authentication Workflow" id="3" />
        </Tabs>
        <div className={tabClasses.tabPanel}>
          <TabPanel value={currentTab} index="0" key={0}>
            <PartnerUserGridWrapper mode={formMode} />
          </TabPanel>
          <TabPanel value={currentTab} index="1" key={1}>
            <OtherUserGridWrapper mode={formMode} />
          </TabPanel>
          <TabPanel value={currentTab} index="2" key={2}>
            <>
              <AccountMappingGridWrapper mode={formMode} />
            </>
          </TabPanel>
          <TabPanel value={currentTab} index="3" key={3}>
            <>
              <AuthenticationMetrixGridWrapper mode={formMode} />
            </>
          </TabPanel>
        </div>
      </div>
      {isOpenLimit && (
        <DailyLimitGrid
          isOpen={isOpenLimit}
          formMode={formMode}
          onClose={() => {
            setIsOpenLimit(false);
          }}
          reqDataRef={undefined}
        />
      )}
    </Dialog>
  );
};
