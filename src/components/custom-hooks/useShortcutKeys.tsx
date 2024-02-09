import { useCallback, useEffect } from "react";

interface HookTypes {
  key: string;
  actionHandler: Function;
  actionType?: string;
  toggle?: boolean;
  formMode?: string;
}

export const useShortcutKeys = ({
  key,
  actionHandler,
  actionType,
  toggle,
  formMode,
}: HookTypes) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (typeof actionHandler !== "function") return;
      if (event.altKey) {
        event.preventDefault();
        if (event.key.toLowerCase() === key) {
          if (actionType || toggle) {
            if (formMode?.toLowerCase() === "add") return;
            actionHandler(actionType);
          } else {
            actionHandler();
          }
        }
      }
    },
    [key, actionHandler]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return handleKeyPress;
};
