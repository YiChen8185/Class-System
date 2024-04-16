import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    fetch("/api/logout").then(res => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
  }, []);
  return <div>Logging out</div>;
};

export default Logout;
