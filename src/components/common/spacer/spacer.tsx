import { FC, Fragment } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Hidden, { HiddenProps } from "@mui/material/Hidden";

export interface SpacerProps {
  HiddenProps?: HiddenProps;
  GridProps?: GridProps;
  name: string;
}

const Spacer: FC<SpacerProps> = ({ name, HiddenProps, GridProps }) => {
  return (
    <Fragment key={name}>
      <Hidden {...HiddenProps}>
        <Grid item={true} {...GridProps} />
      </Hidden>
    </Fragment>
  );
};

export default Spacer;
