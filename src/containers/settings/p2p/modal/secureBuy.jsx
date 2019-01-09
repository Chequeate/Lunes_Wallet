import React from "react";
import PropTypes from "prop-types";

//  REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../p2p/redux/p2pAction";
import { confirmBuy } from "../../../../containers/buycoin/redux/buyAction";
import { errorInput } from "../../../errors/redux/errorAction";

// UTILS
import { encryptHmacSha512Key } from "../../../../utils/cryptography";

import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import ButtonContinue from "../../../../components/buttonContinue";

class SecureBuy extends React.Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
  }

  setPassword = password => {
    this.setState({ ...this.state, password });
  };

  confirmPassword = () => {
    let { password } = this.state;
    let { user, errorInput, setModalStep } = this.props;

    if (user.password === encryptHmacSha512Key(password)) {
      setModalStep(3);
      return;
    }

    errorInput(i18n.t("MESSAGE_INVALID_PASSWORD"));

    return;
  };

  render() {
    let { password } = this.state;
    let { loading } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("P2P_CONFIRM_PASSWORD_SIGNATURE")}</span>
          <span className={style.addressConfirm}>
            {i18n.t("P2P_CONFIRM_SIGNATURE")}
          </span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            placeholder="*********"
            aria-label="password"
            alt="password"
            onChange={event => this.setPassword(event.target.value)}
            value={password}
            className={style.inputTextDefault}
          />
        </div>

        <ButtonContinue
          label={i18n.t("BTN_CONFIRM")}
          action={() => this.confirmPassword()}
          loading={loading}
        />
      </div>
    );
  }
}

SecureBuy.propTypes = {
  buypack: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  coins: PropTypes.array.isRequired,
  confirmBuy: PropTypes.func.isRequired,
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  buypack: store.buy.buypackage,
  loading: store.buy.loading,
  user: store.user.user,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      confirmBuy,
      errorInput
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecureBuy);
