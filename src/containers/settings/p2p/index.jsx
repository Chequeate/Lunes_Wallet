import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, openModal } from "../../p2p/redux/p2pAction";
import {
  getSignatures,
  getSignature,
  signSignature,
  setSignature
} from "../../settings/redux/settingsAction";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS
import ModalPayment from "./modal/index";
import Modal from "../../../components/modal";
import Loading from "../../../components/loading";

class P2P extends React.Component {
  closeModal() {
    const { setModalStep, openModal } = this.props;
    openModal(false);
    setModalStep(1);
  }

  componentDidMount = () => {
    const { getSignatures, getSignature } = this.props;
    getSignatures();
    getSignature();
  };

  setSignature(val) {
    const { setSignature, openModal } = this.props;
    openModal(true);
    setSignature(val);
  }

  renderPlans = () => {
    const { signatures, openModal, loadingP2P, mySignature } = this.props;

    if (loadingP2P)
      return (
        <div>
          <Loading color="lunes" />
        </div>
      );

    if (signatures.plans) {
      if (mySignature) {
        return signatures.plans.map((val, key) => (
          <Grid item key={key}>
            <div
              className={
                val.id === mySignature.planId ? style.cardBlue : style.cardGrey
              }
            >
              <h1>{val.status}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>{val.coinValue}</span>
              </div>
            </div>
          </Grid>
        ));
      }
      if (mySignature === undefined) {
        return signatures.plans.map((val, key) => (
          <Grid item key={key}>
            <div
              className={style.cardP2p}
              onClick={() => this.setSignature(val)}
            >
              <h1>{val.status}</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hrCard} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>{val.coinValue}</span>
              </div>
            </div>
          </Grid>
        ));
      }
    }
  };

  render() {
    const { modalStep, setModalStep, modalOpen } = this.props;

    return (
      <div>
        <Modal
          content={<ModalPayment />}
          show={modalOpen}
          lose={
            modalStep === 1 || modalStep === 3 || modalStep === 4
              ? () => this.closeModal()
              : null
          }
          back={modalStep === 2 ? () => setModalStep(modalStep - 1) : null}
        />
        <Grid item xs={12} className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTINGS_P2P")} </h3>
              </Grid>
            </Hidden>
            <Grid item xs={2} />

            <Grid item xs={6} sm={2}>
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("SETTINGS_P2P")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9} className={style.plansDescription}>
            <h1>P2P</h1>
            <p>{i18n.t("P2P_PLANS_DESCRIPTION")}</p>
          </Grid>
        </Grid>
        <Grid container className={style.p2pContainer}>
          {this.renderPlans()}
        </Grid>
      </div>
    );
  }
}

P2P.propTypes = {
  modalStep: PropTypes.number.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  getSignatures: PropTypes.func,
  getSignature: PropTypes.func,
  signSignature: PropTypes.func,
  signatures: PropTypes.object,
  loadingP2P: PropTypes.bool.isRequired,
  mySignature: PropTypes.object,
  setSignature: PropTypes.func
};

const mapStateToProps = store => ({
  modalStep: store.p2p.modalStep,
  modalOpen: store.p2p.modalOpen,
  signatures: store.settings.signatures,
  loadingP2P: store.settings.loadingP2P,
  signature: store.settings.signature,
  mySignature: store.settings.mySignature
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      openModal,
      getSignatures,
      getSignature,
      signSignature,
      setSignature
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
