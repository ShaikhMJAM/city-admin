import { FC, Fragment } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography, { TypographyProps } from "@mui/material/Typography";

export interface AllTypographyProps {
  TypographyProps?: TypographyProps;
  GridProps?: GridProps;
  name: string;
  label: string;
}

const MyTypography: FC<AllTypographyProps> = ({
  name,
  TypographyProps,
  GridProps,
  label,
}) => {
  return (
    <Fragment key={name}>
      <Grid {...GridProps}>
        {/* <Typography {...TypographyProps}>{label}</Typography> */}
        <Typography {...TypographyProps} variant="h6" style={undefined}>
          {label}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default MyTypography;
