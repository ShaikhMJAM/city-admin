import React, { createContext, useContext, useEffect, useState } from "react";

type TIcon = "INFO" | "ERROR" | "WARNING" | "";

type TMessage = {
  isOpen: boolean;
  messageTitle: string;
  message: string;
  icon: TIcon;
  buttonNames: string[];
}

type TPopupContextType = {
  message: TMessage;
  // MessageBox: Function;
  // CloseMessageBox: Function;
}

const initialMessage: TMessage = {
  isOpen: false,
  messageTitle: "",
  message: "",
  icon: "INFO",
  buttonNames: ["OK"],
}

const initialContext: TPopupContextType = {
  message: initialMessage,
  // MessageBox: () => { },
  // CloseMessageBox: () => { }
}

export const PopupContext = createContext<TPopupContextType>(initialContext);

export const PopupContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<TMessage>(initialMessage)

  const MessageBox = (
    messageTitle: string,
    message: string,
    icon: TIcon = "INFO",
    buttonNames: string[] = ["OK"]
  ) => {
    setMessage({
      isOpen: true,
      messageTitle,
      message,
      icon,
      buttonNames
    })
  }

  const CloseMessageBox = () => {
    setMessage(initialMessage)
  }

  useEffect(() => {
    //@ts-ignore
    window.openMessageBox = (title, body, ...rest) => MessageBox(title, body)
    //@ts-ignore
    window.closeMessageBox = () => CloseMessageBox()

  }, [])

  return (
    <PopupContext.Provider value={{ message }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopupContext = () => {
  return useContext(PopupContext)
}