import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import Loader from "../../components/Loader/Loader";

import logoHolon from '../../images/holon38.png'; 

import './ImportWallet.css';

class ImportWallet extends Component {

  constructor(props) {
      super(props);

      this.state = {
        phrase: '',
        password: '',
        confirm: '',
        accounts: [],
        isLoading: true
      };


      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getValidationPassword = this.getValidationPassword.bind(this);
      this.getValidationEqualPassword = this.getValidationEqualPassword.bind(this);
      this.getValidationPhrase = this.getValidationPhrase.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }


  /**
   * @method getDerivedStateFromProps
   * @description getDerivedStateFromProps this is method of live cycle react for detect modifications in props
   **/
  static getDerivedStateFromProps(props, state){
    if (props.accounts !== state.accounts){
      return {
        phrase: '',
        password: '',
        confirm: '',
        accounts: props.accounts,
        isLoading: false,
      };
    }
   return null;
  }

  /**
   * @method handleSubmit
   * @description submit for restore account with mnemonic and password
   **/
  handleSubmit (event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const mnemonic = this.state.phrase;
    const password = this.state.password;
    this.props.restoreVault(mnemonic, password);
  }


  /**
  * @method handleChange
  * @description handle change in form input
  * */
  handleChange(event, field){
    let obj = {};
    obj[field] = event.target.value;
    this.setState(obj);
  }

  /**
   * @method getValidationPassword
   * @description Validate the minimum password length
   * @return [String] success, warning, error
   **/
  getValidationPassword(){
    const length = this.state.password.length;
    switch (true) {
      case (length >= 8):
        return 'success';
      break;
      case (length > 5):
        return 'warning';
      break;
      case (length > 0):
          return 'error';
      break;
      default:
        return null;
    }
  }


  /**
   * @method getValidationEqualPassword
   * @description Validates if passwords are equal
   * @return [String, Null] error
   **/
  getValidationEqualPassword(){
    const {password, confirm} = this.state;
    switch (true) {
      case (password !== confirm && password.length > 0):
        return 'error';
      break;
      case (password === confirm && password.length > 0):
        return 'success';
      break;
      default:
        return null;
    }

  }

  getValidationPhrase(){
    const {phrase} = this.state;
    let words = (phrase.length > 0) ? phrase.split(' ') : '';
    switch (true) {
      case ( (words.length > 0 && words.length < 12) || words.length > 12):
        return 'error';
        break;
      case (words.length == 12):
        return 'success';
        break;
      default:
        return null;
    }
  }


  render () {
    if (this.props.wallet.address.length > 2) {
      return (
        <Redirect to="/choosecreateidentityorhome" />
      );
    }

    return (
      <div className="div-principal">
        <Grid className="col-sm-3 menu-bar background">
          <Col className="col-sm-2">
            <div className="header-holon">
              <img className="logo-holon-size" src={logoHolon} alt="logoHolon" />
              <h3 className="title title-header">Holon</h3>
            </div>
          </Col>
        </Grid>
        <Grid className="grid-second-import">
          <Row>
            <div className="text-center padding-title">
              <h3 className="title">Import your Wallet</h3>
            </div>
          </Row>
          <Row>
            <Col className="col-sm-12">
              <Form className="col-sm-6 col-sm-offset-3" onSubmit={this.handleSubmit}>
                <FormGroup validationState={this.getValidationPhrase()}>
                    <ControlLabel className="paragraph margin-top-30">Wallet Seed</ControlLabel>
                    <FormControl className="paragraph" rows="7" componentClass="textarea" placeholder="Insert your seed phrase" value={ this.state.phrase } onChange={event => this.handleChange(event, 'phrase')}/>
                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Seed phrases are 12 words long</HelpBlock>
                </FormGroup>
                <FormGroup validationState={this.getValidationPassword()}>
                    <ControlLabel className="paragraph">New Password</ControlLabel>
                    <FormControl componentClass="input" type="password" value={ this.state.password } onChange={event => this.handleChange(event, 'password')}/>
                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Minimum validation of 8 characters</HelpBlock>
                </FormGroup>
                <FormGroup validationState={this.getValidationEqualPassword()}>
                    <ControlLabel className="paragraph">Confirm Password</ControlLabel>
                    <FormControl componentClass="input" type="password" value={ this.state.confirm } onChange={event => this.handleChange(event, 'confirm')} />
                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Password must be the same as field confirm</HelpBlock>
                </FormGroup>
                <Button className="paragraph margin-top-50" bsSize="large" type="submit" onClick={this.handleSubmit} block bsStyle="warning">Import</Button>
              </Form>
            </Col>
          </Row>
        </Grid>
        <Loader message="Loading your wallet" visible={this.state.isLoading} />
      </div>
      );
    }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet);