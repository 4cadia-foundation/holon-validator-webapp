import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from "../../redux/actions/validator";

import Loader from '../../components/Loader/Loader';

class ChooseCreateIdentityOrHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isRunning: true,
      msg: "Loading your Validator's profile",
      validator: null,
    }
  }
  
  componentDidMount() {
    this.props.getValidatorData();
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps nextProps', nextProps);
    //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps prevState', prevState);
    if (nextProps.validator.error.length>2) {
        const msg = 'Erro: ' + nextProps.validator.error;
        console.error('ChooseCreateIdentityOrHome/getDerivedStateFromProps: ', msg);
        return { isRunning: false };
    }
    if (nextProps.validator.address.length < 1) {
      return { isRunning: true };
    }
    return {isRunning: nextProps.validator.isRunning, validator: nextProps.validator}
  }

  render() {
    //console.log('ChooseCreateIdentityOrHome/render', this.state);
    if (this.state.isRunning) {
      return (
        <div>
          <Loader visible={this.state.isRunning} message={this.state.msg} />
        </div>
      )
    } else if (this.state.validator.isHolonValidator) {
      return (
        <Redirect to="/home" />
      )
    } else if (this.state.validator.personalInfo.length<1) {
      return (
        <div className="margin-top-50">
          <h3 className="title">Sorry 😞</h3>
          <p className="paragraph">We have not found your <strong>Identity</strong> at Holon.</p>
          <p className="paragraph">Please install Holon Persona's plugin and create your Identity first.</p>
        </div>
      )
    } else if (this.state.validator.personalInfo.length>0 && !this.state.validator.isHolonValidator) {
      return (
        <Redirect to="/depositstake" />
      )
    } 
   }
  }

const mapStateToProps = reduxState => ({ 
  validator: reduxState.validator
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreateIdentityOrHome);