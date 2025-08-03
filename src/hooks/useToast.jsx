import { useCallback, useState } from "react";

import Toast from "../components/Toast";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const notifiyToast = useCallback((message = "") => {
    setShowToast(true);
    setMessage(message);

    setTimeout(() => {
      setShowToast(false);
      setMessage("");
    }, 1500);
  }, []);

  const renderToast = useCallback(() => {
    return <Toast message={message} />;
  }, [message]);

  return {
    renderToast,
    notifiyToast,
    showToast,
  };
};

export default useToast;
