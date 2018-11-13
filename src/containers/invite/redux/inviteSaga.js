import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

// SERVICES
import InviteService from "../../../services/inviteService";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";

const inviteService = new InviteService();

export function* getInviteAddressSaga() {
  try {
    yield put({
      type: "SET_LOADING_ADDRESS",
      loading: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(inviteService.getInvite, token);

    let address = [];
    if (response) {
      address = response.data;
    }

    yield put({
      type: "GET_INVITE_ADDRESS_REDUCER",
      address: address // parametro mockup
    });

    let responseBalance = yield call(inviteService.getInviteBalance, token, address);
    let balance = [];
    if(responseBalance){
      balance = responseBalance.data
    }
    yield put({
      type: "GET_INVITE_BALANCE_REDUCER",
      balance: balance
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* sendMailInviteSaga(email){
  yield put({
    type: "SET_LOADING_INVITES",
    loading: true
  });

  yield put({
    type: "SEND_MAIL_INVITE_REDUCER",
    email
  });
}

export function* getInviteSentSaga(){
  try {
    yield put({
      type: "SET_LOADING_SENT",
      loading: true
    });

    yield put({
      type: "GET_INVITE_SENT_REDUCER",
      invites: [1,2,3,4] // parametro mockup
    });
  } catch (error) {
    yield put(internalServerError());
  }
}