import {
  Fragment,
  useRef,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import { useMutation } from "react-query";
import { FormComponentView } from "components/formcomponent";
import { CustomerSearchingFilterForm } from "./metaData";
import { CustomerSearchingGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { FilterFormMetaType } from "components/formcomponent/filterform";
import { ClearCacheProvider } from "cache";
import * as API from "./api";
import { UpdateRequestDataVisibleColumn } from "components/utils";
import { useSnackbar } from "notistack";
import { CustomerCardDetailWrapper } from "./customerCardDetails";
import { AuthContext } from "pages_audit/auth";

export const CustomerActivationForm = () => {
  return (
    <ClearCacheProvider>
      <CustomerActivation />
    </ClearCacheProvider>
  );
};
const CustomerActivation = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  // const [retData, setRetData] = useState({
  //   DISP_REG_WITH: "A",
  //   DISP_REG_ACCT_CARD_NO: "",
  // });
  const reqData = useRef<any>({
    DISP_REG_WITH: "A",
    DISP_REG_ACCT_CARD_NO: "",
  });
  const [isOpenCBDetails, setOpenCBDetails] = useState(false);
  const [secondButtonVisible, setSecondButtonVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const authController = useContext(AuthContext);
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );

  const getData = useMutation(API.getCustomerActivationData, {
    onSuccess: (response: any) => {
      setSecondButtonVisible(true);
    },
    onError: (error: any) => {
      // setRetData({ DISP_REG_WITH: "A", DISP_REG_ACCT_CARD_NO: "" });
      reqData.current.DISP_REG_WITH = "A";
      reqData.current.DISP_REG_ACCT_CARD_NO = "";
      setSecondButtonVisible(false);
    },
  });

  const saveData = useMutation(API.saveCustomerRegisterRequest, {
    onSuccess: (response: any) => {
      reqData.current["DISP_REG_WITH"] = "A";
      reqData.current["DISP_REG_ACCT_CARD_NO"] = "";
      getData.mutate({
        regWith: "A",
        accountCardNo: "",
        isdefaultCall: true,
      });

      setSecondButtonVisible(false);
      enqueueSnackbar(response, {
        variant: "success",
      });
    },
    onError: (error: any) => {
      setSecondButtonVisible(true);
    },
  });

  const ClickEventManage = useCallback(
    (data, columnvisible) => {
      let retdata = UpdateRequestDataVisibleColumn(data, columnvisible);
      // setRetData(retdata);
      reqData.current.DISP_REG_WITH = retdata?.DISP_REG_WITH;
      reqData.current.DISP_REG_ACCT_CARD_NO = retdata?.DISP_REG_ACCT_CARD_NO;
      if (retdata?.DISP_REG_WITH === "I") {
        setOpenCBDetails(true);
      } else {
        getData.mutate({
          regWith: retdata?.DISP_REG_WITH,
          accountCardNo: retdata?.DISP_REG_ACCT_CARD_NO,
        });
      }
    },
    [getData]
  );
  const ClickSecondButtonEventManage = useCallback(
    (retdata, columnvisible) => {
      let retrdata = UpdateRequestDataVisibleColumn(retdata, columnvisible);
      // setRetData(retrdata);
      reqData.current.DISP_REG_WITH = retrdata?.DISP_REG_WITH;
      reqData.current.DISP_REG_ACCT_CARD_NO = retrdata?.DISP_REG_ACCT_CARD_NO;
      data.CUSTOM_USER_NM = retrdata?.CUSTOM_USER_NM;
      data["ENTERED_BY"] = authController?.authState?.user?.id;
      saveData.mutate({
        inputData: data,
      });
    },
    [getData]
  );

  const data = useMemo(() => {
    if (Array.isArray(getData.data)) {
      return { ...reqData?.current, ...getData.data[0] };
    } else {
      return { ...reqData?.current };
    }
  }, [getData.data, reqData?.current]);

  return (
    <Fragment>
      {getData.isError ? (
        <Alert
          severity={getData.error?.severity ?? "error"}
          errorMsg={getData.error?.error_msg ?? "Something went to wrong.."}
          errorDetail={getData.error?.error_detail}
          color="error"
        />
      ) : saveData.isError ? (
        <Alert
          severity={saveData.error?.severity ?? "error"}
          errorMsg={saveData.error?.error_msg ?? "Something went to wrong.."}
          errorDetail={saveData.error?.error_detail}
          color="error"
        />
      ) : null}
      <FormComponentView
        key={
          "custAct" + data?.REG_ACCT_CARD_NO ??
          "0" + data?.REG_WITH ??
          "0" + reqData?.current?.DISP_REG_WITH ??
          "0" + reqData?.current?.DISP_REG_ACCT_CARD_NO ??
          "0"
        }
        finalMetaData={CustomerSearchingFilterForm as FilterFormMetaType}
        onAction={ClickEventManage}
        loading={getData.isLoading}
        data={data ?? {}}
        submitSecondAction={ClickSecondButtonEventManage}
        submitSecondButtonName="Save"
        submitSecondButtonHide={!secondButtonVisible}
        submitSecondLoading={saveData?.isLoading}
      ></FormComponentView>
      <GridWrapper
        key={`customerActivationGrid`}
        finalMetaData={CustomerSearchingGridMetaData as GridMetaDataType}
        data={data?.ALL_ACCOUNT_DETAIL ?? []}
        setData={() => null}
        loading={getData.isLoading}
        setAction={setCurrentAction}
        refetchData={() => {}}
        ref={myGridRef}
      />
      {isOpenCBDetails && (
        <CustomerCardDetailWrapper
          open={isOpenCBDetails}
          closeDialog={() => {
            setOpenCBDetails(false);
          }}
          clientID={reqData?.current?.DISP_REG_ACCT_CARD_NO}
          onClickConfirm={(rows) => {
            //setRetData({ DISP_REG_WITH: "C", DISP_REG_ACCT_CARD_NO: rows?.ACCOUNT_NO });
            setOpenCBDetails(false);
            getData.mutate({
              regWith: "C",
              accountCardNo: rows?.ACCOUNT_NO,
            });
          }}
        />
      )}
    </Fragment>
  );
};
