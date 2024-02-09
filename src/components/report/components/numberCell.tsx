import { CellWrapper } from "./cellWrapper";
import { useAmountDivider } from "../amountContext";
import getCurrencySymbol from "components/custom/getCurrencySymbol";
function formatCurrency(
  amount,
  symbol,
  currencyFormat = "en-IN",
  decimalCount = 2,
  symbolPosi = "start"
) {
  const formattedAmount = new Intl.NumberFormat(currencyFormat, {
    minimumFractionDigits: decimalCount,
  }).format(amount);
  return `${symbol} ${formattedAmount}`;
}

export const NumberCell = (props) => {
  const {
    value,
    column: { isVisibleCurrSymbol = true },
  } = props;

  let finaleSymbol = getCurrencySymbol("BDT");

  if (Boolean(props?.column?.currencyRefColumn)) {
    const currencyCode =
      props?.row?.original?.[props?.column?.currencyRefColumn];
    if (props?.column?.isCurrencyCode) {
      if (Boolean(currencyCode)) {
        finaleSymbol = currencyCode;
      }
    } else {
      if (Boolean(currencyCode)) {
        finaleSymbol = getCurrencySymbol(currencyCode);
      }
    }
  }
  const divider = useAmountDivider();
  let result = `${formatCurrency(
    0 / divider,
    isVisibleCurrSymbol ? finaleSymbol : ""
  )}`;
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = `${formatCurrency(
      value / divider,
      isVisibleCurrSymbol ? finaleSymbol : ""
    )}`;
  }

  return <CellWrapper {...props}>{result}</CellWrapper>;
};

export const NumberCell2 = (props) => {
  const { value } = props;
  let result = "-";
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = `${value}`;
  }
  return <CellWrapper {...props}>{result}</CellWrapper>;
};
