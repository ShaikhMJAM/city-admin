import ReactToPrint, {
  PrintContextConsumer,
  IReactToPrintProps,
} from "react-to-print";
import { GradientButton } from "components/styledComponent/button";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "components/styledComponent/tooltip";

export interface DefaultChieldData {
  buttonText?: string;
}
type PrintAllProps = Merge<DefaultChieldData, IReactToPrintProps>;
export const PrintButton = ({
  content,
  buttonText = "",
  ...other
}: PrintAllProps) => {
  return (
    <ReactToPrint {...other} content={content}>
      <PrintContextConsumer>
        {({ handlePrint }) => (
          <>
            {Boolean(buttonText) ? (
              <GradientButton onClick={handlePrint}>
                {buttonText}
              </GradientButton>
            ) : (
              <Tooltip title={"Print"} arrow={true}>
                <IconButton onClick={handlePrint} size="small">
                  <PrintIcon style={{ color: "var(--white)" }} />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </PrintContextConsumer>
    </ReactToPrint>
  );
};
export type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
