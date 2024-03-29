import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  Children,
  ReactNode,
} from "react";
import { VariableSizeList } from "react-window";

const LISTBOX_PADDING = 8;

const renderRow = (props) => {
  const { data, index, style } = props;
  return cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
};

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const useResetCache = (data) => {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
};

interface ListBoxComponentTypes {
  children?: ReactNode;
}

export const ListBoxComponent = forwardRef<
  HTMLDivElement,
  ListBoxComponentTypes
>((props, ref) => {
  const { children, ...other } = props;
  const itemData = Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = () => {
    return itemSize;
  };
  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };
  const gridRef = useResetCache(itemCount);
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={getChildSize}
          overscan={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
