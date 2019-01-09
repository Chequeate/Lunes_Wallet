const initialState = {
  security: {
    urlImage: undefined
  },
  wallet: {
    modalAlias: false,
    loadingAlias: false
  },
  loading: false,
  errors: [],
  loadingP2P: false,
  signatures: [],
  signature: {},
  mySignature: {},
  fee: {},
  address: {}
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state
      };

    case "CHANGE_LOADING_SETTINGS":
      return {
        ...state,
        loading: !state.loading
      };

    case "POST_SETTINGS_CREATE_2FA":
      return {
        ...state,
        security: {
          urlImage: action.url
        },
        loading: !state.loading
      };

    case "SET_WALLET_ALIAS_MODAL_OPEN":
      return {
        ...state,
        wallet: {
          modalAlias: !state.wallet.modalAlias,
          loadingAlias: false
        }
      };

    case "SET_WALLET_ALIAS_LOADING":
      return {
        ...state,
        wallet: {
          modalAlias: state.wallet.modalAlias,
          loadingAlias: action.state ? true : false
        }
      };

    case "SET_LOADING_P2P":
      return {
        ...state,
        loadingP2P: action.loadingP2P
      };

    case "SET_LOADING_REDUCER":
      return {
        ...state,
        loading: action.loading
      };

    case "GET_SIGNATURES_P2P_REDUCER":
      return {
        ...state,
        signatures: action.signatures,
        loadingP2P: false
      };

    case "GET_SIGNATURE_P2P_REDUCER":
      return {
        ...state,
        mySignature: action.mySignature,
        loadingP2P: false
      };

    case "SET_SIGNATURE_P2P":
      return {
        ...state,
        signature: action.signature
      };

    case "GET_FEE_P2P_REDUCER":
      return {
        ...state,
        fee: action.fee,
        loading: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default settings;
