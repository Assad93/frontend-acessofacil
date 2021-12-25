import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";

function useConsts() {
  const { token } = useContext(AuthContext);

  // const API_URL = "http://localhost:5000";

  const API_URL = "https://api-atmacessofacil.herokuapp.com";

  const REQ_SIMPLE_CONFIG = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const REQ_BLOB_CONFIG = {
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return [API_URL, REQ_SIMPLE_CONFIG, REQ_BLOB_CONFIG];
}

export default useConsts;
