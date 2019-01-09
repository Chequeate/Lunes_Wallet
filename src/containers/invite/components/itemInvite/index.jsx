import React from "react";
import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { successRequest } from "../../../errors/redux/errorAction";

// MATERIAL UI
import { Grid } from "@material-ui/core";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class ItemInvite extends React.Component {
  constructor(props) {
    super(props);
  }

  copyAddress = address => {
    let { successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = address;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };

  renderIcon = status => {
    if (status === "SENT") {
      return (
        <div>
          <img
            onClick=""
            className={style.imgResend}
            src="/images/icons/invite/pending-invite.png"
          />
          

          <span className={style.invitePendingResend}>{i18n.t("BTN_INVITE_RESEND")}</span>
        </div>
      );
    }

    return (
      <div>
        <img
          className={style.imgDone}
          src="/images/icons/confirm/confirm-invite@2x.png"
        />
      </div>
    );
  };
  render() {
    const {status} = this.props;

    return (
      <div>
        <Grid container>
          <Grid item xs={5} sm={5}>
            <div>
              <span className={style.spanTitle}>
                {i18n.t("INVITE_TITLE_EMAIL")}
              </span>{" "}
              <br />
              <p className={style.spanSub}>{this.props.email}</p>
            </div>
          </Grid>
          <Grid item xs={5} sm={6}>
            <span className={style.spanTitle}>
              {i18n.t("INVITE_TITLE_STATUS")}
            </span>{" "}
            <br />
      
            <p className={style.spanSub}>{i18n.t(`INVITE_STATUS_${status}`)}</p>

          </Grid>
          <Grid item xs={2} sm={1}>
            {this.renderIcon(status)}
          </Grid>
          <Grid item xs={6} sm={6} id={"hr"}>
            <hr />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ItemInvite.propTypes = {
  successRequest: PropTypes.func,
  email: PropTypes.string,
  status: PropTypes.string,
};
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ successRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemInvite);
