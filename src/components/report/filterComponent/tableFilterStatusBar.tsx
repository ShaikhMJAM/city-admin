import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { isValidDate } from "components/utils/utilFunctions/function";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: 0,
    overflowX: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const TableFilterStatusBar = ({ dense, filters, setAllFilters }) => {
  const classes = useStyles();
  const handleDelete = (id) => {
    let newFilter = filters.filter((one) => one.id !== id);
    setAllFilters(newFilter);
  };
  if (Array.isArray(filters) && filters.length <= 0) {
    return null;
  }
  return (
    <Toolbar
      component="ul"
      className={classes.root}
      variant={dense ? "dense" : "regular"}
    >
      <li>
        <Typography variant="h6">Retrieval Parameters: </Typography>
      </li>
      {filters.map((one: any) => {
        return (
          <>
            {Boolean(one?.value?.value) ? (
              <li key={one?.id}>
                <Chip
                  label={computeFilterLabel(
                    one?.value?.condition,
                    one?.value?.columnName,
                    one?.value?.value,
                    one?.value?.label,
                    one?.value?.displayValue
                  )}
                  // onDelete={() => handleDelete(one?.id)}
                  className={classes.chip}
                  variant="outlined"
                />
              </li>
            ) : null}
          </>
        );
      })}
    </Toolbar>
  );
};

const computeFilterLabel = (
  condition,
  columnName,
  value,
  label,
  displayValue
) => {
  let columnLabel = Boolean(label) ? label : columnName;
  switch (condition) {
    case "equal":
      return `${columnLabel} = ${isDateThenFormat(displayValue ?? value)}`;
    case "between":
      return `${columnLabel} between ${isDateThenFormat(
        value[0]
      )} and ${isDateThenFormat(value[1])}`;
    case "in":
      return `${columnLabel} in ${isLabelThenDisplay(value, label)}`;
    case "contains":
      return `${columnLabel} like ${value}`;
    case "endsWith":
      return `${columnLabel} ends with ${value}`;
    case "startsWith":
      return `${columnLabel} starts with ${value}`;
    default:
      return `${columnLabel} : ${value}`;
  }
};

const isDateThenFormat = (value) => {
  let myDate;
  if (isValidDate(value)) {
    myDate = format(new Date(value), "dd/MM/yyyy");
  }
  //@ts-ignore
  if (!isNaN(myDate)) {
    return myDate;
  } else {
    return value;
  }
};

const isLabelThenDisplay = (value, label) => {
  if (
    Array.isArray(label) &&
    Array.isArray(value) &&
    value.length === label.length
  ) {
    return JSON.stringify(label).replaceAll(/"/g, " ");
  } else {
    return JSON.stringify(value).replaceAll(/"/g, " ");
  }
};
