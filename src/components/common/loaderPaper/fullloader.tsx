import "./style.css";
import { useTranslation } from "react-i18next";
export const FullScreenLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="wrap-forloader">
      <div className="loading">
        <div className="bounceball"></div>
        <div className="text-forloader">{t("Loading")}...</div>
      </div>
    </div>
  );
};
