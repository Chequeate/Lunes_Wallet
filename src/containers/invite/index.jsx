import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import { successRequest } from "../errors/redux/errorAction";


// MATERIAL UI
import { Grid, withStyles, Input } from "@material-ui/core";

// UTILS
import i18n from "../../utils/i18n";

//COMPONENTS 
import ItemInvite from "./components/itemInvite";
import Modal from "../../components/modal";
import InviteSend from "./modal";

//STYLE 
import style from "./style.css";
import colors from "../../components/bases/colors";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  copyAddress = (address) => {
    let { successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = address;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };

  sendCoinAddressEmail = (address) => {
    return (window.location.href =
      "mailto:" + "?body=" + address);
  };

  inviteAdress = () => {
    const address = "invite address test";
    return address;
  }




  handleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      ...this.state,
      modalOpen: !modalOpen
    });
  }

  render() {
    const { classes } = this.props;
    const { modalOpen } = this.state;
    return (
      <div>
        <div className={style.header}>
          <h1>Convites</h1>
          <p>Convide seus amigos e familiares para se cadastrar na Lunes</p>
        </div>

        <Modal 
          title="Convites enviados" 
          content={<InviteSend />} 
          show={modalOpen} 
          close={this.handleModal} 
        />

        <Grid container className={style.card}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <img src="/images/icons/email/email@1x.png" className={style.icon} />
            </Grid>
            <Grid item>
              <Input placeholder="Lunes@gmail.com" classes={{
                root: classes.root,
                underline: classes.cssUnderline,
                input: classes.cssInput
              }} />
            </Grid>
            
            <div className={style.linkTitle}>
              <p>{i18n.t("INVITE_LINK_SHARE")}</p>
            </div>
            <div className={style.adressShared}>
              <p>{address}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={style.copyIcon}>
                <a  onClick = {() => this.copyAddress('12as3d45ads546asd456asd456asd546asd') }>
                  <img src="/images/icons/modal-receive/ic_copy@1x.png" />
                  <p>{i18n.t("INVITE_COPY_BUTTON")}</p>
                </a>
            </div>
            <div 
              onClick={() => this.sendCoinAddressEmail(address)}
              className={style.shareIcon}
            >     
              <img src="/images/icons/invite/share@1x.png" />
              <p>{i18n.t("INVITE_SHARE_BUTTON")}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <button className={style.btnInviteSent}>Enviar</button>
            <div className={style.btnInvite}>
            <button onClick={this.handleModal} className={style.btnInviteSent}>Convites enviados</button>
            </div>
          </Grid>
        </Grid>

        <Grid container className={style.card}>
          <Grid item xs={12}>
            <span className={style.label}>Convites confirmados</span>
          </Grid>
          <Grid item xs={12}>
            {[1, 2, 3, 4, 5].map(val=>{
              return (<ItemInvite />)
            })
            }
          </Grid>
        </Grid>
        
    </div>
    )
  }
}

Invite.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(inputStyle)(Invite);
