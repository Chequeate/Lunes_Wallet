import React from "react";
import PropTypes from "prop-types";

// MATERIAL 
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

import style from "../style.css";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleSelect = () => {
    this.setState({ open: !this.state.open });
  }

  selectItem = () => {
    // const {action} = this.props;
    this.handleSelect();
    // chamar funcao action
  }

  renderArrow() {
    if (this.state.open)
      return <ArrowDropUp className={style.arrowSelect} />

    return <ArrowDropDown className={style.arrowSelect} />
  }

  render() {
    return (
      <div className={style.formBlock}>
        <button className={style.btNode} onClick={() => this.handleSelect()}>
          Node Name
          {this.renderArrow()}
        </button>
        <div className={style.baseSelect} style={this.state.open ? { display: "block" } : { display: "none" }}>
          {/* popular com um props  */}
          <div onClick={this.selectItem}>Node Name</div>
          <div onClick={this.selectItem}>Node Name</div>
          <div onClick={this.selectItem}>Node Name</div>
          <div onClick={this.selectItem}>Node Name</div>
          <div onClick={this.selectItem}>Node Name</div>
        </div>
      </div>
    )
  }
}

CustomSelect.propTypes = {
  action: PropTypes.func.isRequired
}

export default CustomSelect;