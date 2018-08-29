import React from "react";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLES
import style from "./style.css";


class AliasPage extends React.Component {
  render(){
    return (
      <div>
        <Hidden smUp>
          <div className={style.description}> {i18n.t("SET_ALIAS_DESCRIPTION")} </div>
        </Hidden>
        
        <div className={style.box}>
          <Hidden xsDown>
            <div className={style.description}> {i18n.t("SET_ALIAS_DESCRIPTION")}  </div>
          </Hidden>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={11} md={2}>
              <Grid container>
                <Grid item xs={4} md={12}>
                  <img src={`images/icons/coins/LUNES.png`} className={style.coinIconAlias} />
                </Grid>
                <Grid item xs={6} md={12}>
                  <div className={style.labelCoin}>{i18n.t("MENU_WALLET")} Lunes</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={7}>
              <input type="text" className={style.inputClear} value={`adasdasdasdasdasdasdasdasd`} />
              <div>
                <Grid container className={style.aliasNameRow}>
                  <Grid item xs={12} md={8}>
                    <input type="text" className={style.inputClear} value={`nome`} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <button onClick={() => alert(1)} className={style.buttonGreen}> {i18n.t("SET_ALIAS_SAVE_NAME")} </button> 
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default AliasPage;