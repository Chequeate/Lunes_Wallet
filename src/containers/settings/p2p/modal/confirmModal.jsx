import React from "react";
import PropTypes from "prop-types";

// COMPONENTS
import Loading from "../../../../components/loading";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../p2p/redux/p2pAction";
import { signSignature, getFeeP2P } from "../../redux/settingsAction";

// STYLE
import style from "./style.css";

import i18n from "../../../../utils/i18n";
import ButtonContinue from "../../../../components/buttonContinue";
class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      selectFee: false
    };
  }

  calcFee = () => {
    this.setState({ selectFee: true });
  };

  componentDidMount = () => {
    const { getFeeP2P, coins, signature } = this.props;

    const fromAddress = coins["lunes"].address;
    const decimalPoint = coins["lunes"].decimalPoint;

    getFeeP2P("lunes", fromAddress, signature.coinValue, decimalPoint);
  };

  hendlerContinue = () => {
    const {
      setModalStep,
      signSignature,
      signature,
      user,
      coins,
      fee
    } = this.props;

    const coin = "lunes";
    const payload = {
      planId: signature.id,
      coin: coin,
      fromAddress: coins["lunes"].address,
      lunesUserAddress: coins["lunes"].address,
      amount: signature.coinValue,
      fee: fee.fee,
      feePerByte: fee.feePerByte,
      feeLunes: fee.feeLunes,
      price: coins["lunes"].price,
      user: user.password
    };
    signSignature(payload);
    setModalStep(2);
  };

  render() {
    const { signature, loading } = this.props;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <img
            src={"/images/icons/coins/lunes.png"}
            className={style.modalIconCoin}
          />
          <div>
            {/* <span>{i18n.t("P2P_TEXT_10")}</span> */}
            <span className={style.totalConfirm}>
              {signature && signature.coinValue}
            </span>
            <br />
            {/* <span>{i18n.t("P2P_TEXT_11")}</span> */}
          </div>

          <div className={style.confirmFee}>
            <div>{i18n.t("P2P_TEXT_12")}</div>
            <div className={style.txtamount}>{"0"}</div>
          </div>

          <div className={style.boxFee}>
            <span
              className={style.greenLabelFee}
              onClick={() => this.calcFee()}
            >
              {"Low 0.001"}
            </span>
            <span
              className={style.yellowLabelFee}
              onClick={() => this.calcFee()}
            >
              {"Medium 0.001"}
            </span>
            <span className={style.redLabelFee} onClick={() => this.calcFee()}>
              {"High 0.001"}
            </span>
          </div>
          <ButtonContinue
            className={style.btGreen}
            label={i18n.t("BTN_CONTINUE")}
            action={() => this.hendlerContinue()}
          />
        </div>
      );
    }
  }
}

ConfirmModal.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  signature: PropTypes.object,
  fee: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool,
  coins: PropTypes.array,
  signSignature: PropTypes.func,
  getFeeP2P: PropTypes.func
};

const mapStateToProps = store => ({
  signature: store.settings.signature,
  user: store.user.user,
  coins: store.skeleton.coins,
  p2p: store.skeleton,
  fee: store.settings.fee,
  address: store.settings.address,
  loading: store.settings.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      signSignature,
      getFeeP2P
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal);
