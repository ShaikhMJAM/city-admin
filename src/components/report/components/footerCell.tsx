import getCurrencySymbol from "components/custom/getCurrencySymbol";
import { useMemo } from "react";
import { useAmountDivider } from "../amountContext";

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

export const FooterCell = ({
  rows,
  column: {
    id: columnName,
    isNumberTotal = false,
    isDisplayTotal = false,
    currencyRefColumn,
    isCurrencyCode,
  },
}) => {
  const total = useMemo(
    () =>
      rows.reduce((sum, row) => Number(row.values?.[columnName] ?? 0) + sum, 0),
    [rows, columnName]
  );

  let finaleSymbol = getCurrencySymbol("BDT");

  if (Boolean(currencyRefColumn)) {
    const currencyCode = rows?.original?.[currencyRefColumn];
    if (isCurrencyCode) {
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
  let result = " ";
  if (total !== null && total !== "" && !isNaN(Number(total))) {
    if (isDisplayTotal) {
      result = `${formatCurrency(total.toFixed(2) / divider, finaleSymbol)}`;
    } else if (isNumberTotal) {
      result = total;
    } else {
      result = "";
    }
  }

  return result;

  // return `${isNaN(total) || !Boolean(isDisplayTotal) ? "" : result } `;
};

export const FooterCell1 = ({
  rows,
  column: {
    id: columnName,
    isDisplayValueTotal = false,
    currencyRefColumn,
    isCurrencyCode,
    DisplayValueLabel,
  },
}) => {
  const count = useMemo(() => {
    const countMap = new Map();

    rows.forEach((row) => {
      const value = String(row.values?.[columnName]);
      if (value !== undefined) {
        const currentCount = countMap.get(value) || 0;
        countMap.set(value, currentCount + 1);
      }
    });
    return countMap;
  }, [rows, columnName]);

  if (isDisplayValueTotal) {
    const countElementsTotal = Array.from(count).map(([value, count]) => (
      <div key={value}>{`${value}: ${count}`}</div>
    ));

    if (typeof DisplayValueLabel === "string") {
      return countElementsTotal;
    } else if (
      typeof DisplayValueLabel === "object" &&
      DisplayValueLabel !== null
    ) {
      const countElementsLabel = Array.from(count).map(([value, count]) => (
        <div key={value}>{`${DisplayValueLabel[value]}  : ${count}`}</div>
      ));
      return countElementsLabel;
    }
    return countElementsTotal;
  }
};
