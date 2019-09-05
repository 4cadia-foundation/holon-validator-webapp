import React, { Component } from 'react'
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import holon from '../../images/holon.png';
import validation from '../../images/validation.svg';

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
      return (
        <Redirect to="/welcomeback" />
      );
    }

    return (
      <div className="div-principal">
        <Grid className="gridFirst background">
          <p className="margin-top-80 paragraph text-center">Trustworthy Identity Data,</p>
          <p className="secondParagraph paragraph">Decentralized</p>
          <Row className="containerImageValidation">
            <img className="imageValidation" src={validation} alt="validation" />
          </Row>
        </Grid>
        <Grid className="gridSecond">
          <Row>
            <Row className="text-center logoValidator margin-top-80">
              <img className="logoHolon" src={holon} alt="logoHolon" />
            </Row>
            <Row className="text-center margin-top-30">
              <h3 className="title">Welcome to Holon for Validator</h3>
            </Row>
          </Row>
          <Row className="text-center">
            <p className="paragraph">It is necessary have a <i> Holon Identity</i> to be a <br /> <strong>Validator</strong>.</p>
          </Row>
          <Row className="containerButton col-sm-12">
            <Col className="text-center col-sm-4 col-sm-offset-4">
              <Button className="paragraph btn btn-large" bsStyle="warning" bsSize="large" id="welcomeButtonLogin" block onClick={() => this.props.history.push('/importwallet')}>
                Login
              </Button>
            </Col>
            <Link className="paragraph" align="center" id="linkColor" to="">Do not have Holon ID? Create here</Link>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);