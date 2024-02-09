import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "components/derived";
import { utilFunction } from "components/utils";
import { AuthContext } from "pages_audit/auth";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style";
import { useShortcutKeys } from "components/custom-hooks/useShortcutKeys";
import { keyMapper } from "components/custom-hooks/keyMapper";

const SearchScreen = () => {
  const [listOpen, setListOpen] = useState<any>(false);
  const [searchText, setSearchText] = useState<any>("");
  const [selectedItem, setSelectedItem] = useState<any>(0);
  const listRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const navigate = useNavigate();
  const classes = useStyles();
  const authController = useContext(AuthContext);
  useShortcutKeys({
    key: keyMapper.screenSearch,
    actionHandler: () => {
      if (inputRef.current) inputRef.current?.handleFocus();
    },
  });

  const allScreenData = useMemo(() => {
    let responseData = utilFunction.GetAllChieldMenuData(
      authController?.authState?.menulistdata,
      true
    );
    return responseData;
  }, [authController.authState.menulistdata]);
  const [screenData, setScreenData] = useState<any>([]);

  const handleLinkClick = (data) => {
    if (!data) return;
    const link = data?.navigationProps
      ? data.href + "?" + new URLSearchParams(data?.navigationProps).toString()
      : data.href;
    setListOpen(false);
    setSearchText("");
    setSelectedItem(0);
    handleStoreRecent(data);
    setScreenData(
      JSON.parse(localStorage.getItem("routeHistory") as string) ||
        allScreenData.slice(0, 5)
    );
    if (inputRef.current) inputRef.current?.handleBlur();
    navigate(link);
  };

  const handleKeyDown = (e) => {
    const container = document.getElementById("list-box");
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
      scrollSelectedItemIntoView(container, selectedItem - 1);
    } else if (e.key === "ArrowDown" && selectedItem < screenData.length - 1) {
      setSelectedItem((prev) => prev + 1);
      scrollSelectedItemIntoView(container, selectedItem + 1);
    } else if (e.key === "Enter" && selectedItem >= 0) {
      handleLinkClick(screenData[selectedItem]);
    }
  };

  const scrollSelectedItemIntoView = (container, index) => {
    const items = container.querySelectorAll(".list-links");
    if (items[index]) {
      items[index].scrollIntoView({
        block: "center",
      });
    }
  };

  const handleChange = (e) => {
    if (selectedItem >= 0) setSelectedItem(0);
    setSearchText(e.target.value);
  };

  const handleStoreRecent = (data) => {
    const storedPaths = JSON.parse(
      localStorage.getItem("routeHistory") || "[]"
    );
    const duplicate = storedPaths.filter(
      (item) => item.system_code === data.system_code
    );
    if (duplicate.length === 0) {
      const updatedPaths = [data, ...storedPaths].slice(0, 5);
      localStorage.setItem("routeHistory", JSON.stringify(updatedPaths));
    }
  };

  useEffect(() => {
    if (searchText === "") {
      // setScreenData(allScreenData.slice(0, 5));
      setScreenData(
        JSON.parse(localStorage.getItem("routeHistory") as string) ||
          allScreenData.slice(0, 5)
      );
    } else {
      const filtredValue = allScreenData.filter(({ label, user_code }) => {
        return [label, user_code].some((info) =>
          info.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setScreenData(filtredValue);
    }
  }, [searchText]);

  useEffect(() => {
    const localStorageScreenData = JSON.parse(
      localStorage.getItem("routeHistory") as string
    );
    let filteredData: any = [];
    if (localStorageScreenData) {
      filteredData = localStorageScreenData.filter((localData) => {
        return allScreenData.some((screenData) => {
          return localData.system_code === screenData.system_code;
        });
      });
    }
    let finalFilteredData = [...filteredData];
    for (let i = filteredData.length; i < 5; i++) {
      if (allScreenData[i]) {
        finalFilteredData.push(allScreenData[i]);
      }
    }

    localStorage.setItem("routeHistory", JSON.stringify(finalFilteredData));

    const initStorage =
      localStorage.getItem("routeHistory") ||
      JSON.stringify(allScreenData.slice(0, 5));
    localStorage.setItem("routeHistory", initStorage);
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setListOpen(false);
        setSelectedItem(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* search bar of screens */}
      <Box ref={listRef} position="relative">
        <SearchBar
          ref={inputRef}
          placeholder={`Search in ${allScreenData.length} screens`}
          className={`${classes.searchBar} route-search-bar`}
          onChange={handleChange}
          value={searchText}
          onFocus={() => setListOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {listOpen ? (
          <Stack id="list-box" className={classes.searchList}>
            {screenData.length > 0 ? (
              screenData.map((data, index) => (
                <button
                  key={data.user_code}
                  className={
                    selectedItem === index ? "list-links active" : "list-links"
                  }
                  onClick={() => handleLinkClick(data)}
                >
                  <Typography
                    sx={{ fontSize: ".875rem", fontWeight: 500 }}
                  >{`${data.label} - ${data.user_code}`}</Typography>
                </button>
              ))
            ) : (
              <span style={{ padding: "1rem", color: "#888" }}>
                No Screen found!
              </span>
            )}
          </Stack>
        ) : null}
      </Box>
    </>
  );
};

export default SearchScreen;
