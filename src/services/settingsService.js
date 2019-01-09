import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class SettingsService {
  async getSignatures(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/signature/plan", API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);
      if (response.data.code !== 200) {
        return internalServerError();
      }
      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getSignature(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/signature", API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);
      if (response.data.code !== 200) {
        return internalServerError();
      }
      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async signSignature(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/signature",
        payload,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);
      if (response.data.code !== 200) {
        return internalServerError();
      }
      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default SettingsService;
