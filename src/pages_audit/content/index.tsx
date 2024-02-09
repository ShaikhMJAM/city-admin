import { useStyles } from "./style";
import ScrollBar from "react-perfect-scrollbar";

export const Content = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <ScrollBar style={{ height: "0%" }}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{children}</div>
      </ScrollBar>
    </main>
  );
};
