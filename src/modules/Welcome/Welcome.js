import React, { Component } from 'react'
import { Button, Grid, Row } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import logo from '../../images/logo.png';
import Wallet from '../../scripts/core/WalletStorage';
import Settings from '../../config/settings';

import './Welcome.css';

const wallet = new Wallet();

class Welcome extends Component {

  constructor(props) {
    super(props);
    if (Settings.clearStorage) {
      wallet.clearStorage();
    }
  }

  componentDidMount() {
    this.props.hasWallet();
  }

  render() {

    if (this.props.wallet.hasWallet) {
      //console.log('WalletPassword/render/wallet', this.props.wallet);
      return (
        <Redirect to="/welcomeback" />
      );
    }

    return (
      <Grid className="gridPrincipal">
        <header>
          <Row className="text-center logoValidator margin-top-30">
            <img className="logo" src={logo} alt="Logo" />
          </Row>
          <Row className="text-center margin-top-10">
            <h3 className="title">Welcome to Holon for Validator.</h3>
          </Row>
        </header>
        <section className="margin-top-30">
          <Row className="text-center">
            <p className="paragraph">It is necessary have a <i> Holon Identity</i> to be a <br /> <strong>Validator</strong>.</p>
          </Row>
        </section>
        <footer>
          <Row className="text-center">
            <Button className="paragraph" bsStyle="warning" bsSize="large" id="welcomeButton" block onClick={() => this.props.history.push('/importwallet')}>LOGIN</Button>
            <Link className="paragraph" to="">Do not have Holon ID? Create here</Link>
          </Row>
        </footer>
      </Grid>
    );
  }

}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);