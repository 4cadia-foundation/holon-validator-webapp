import React, { Component } from 'react'
import { Button, Form, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import holon from '../../images/holon.png';
import validation from '../../images/validation.svg';

import Loader from '../../components/Loader/Loader';

import './WelcomeBack.css'

class WelcomeBack extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            password: "",
            openedWallet: false,
            isLoading: false,
            msg: "Loading",
        };
    }

    handleClick(event) {
        event.preventDefault();
        //console.log('handleClick/state/1', this.state);
        this.setState({
            isLoading: true,
            msg: "Openning wallet",
        });
        //console.log('handleClick/state/2', this.state);
        this.props.openWallet(this.state.password);
    }

    validateForm() {
        return this.state.password.length >= 8;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.wallet.error.length > 2 && prevState.isLoading && prevState.password.length > 1) {
            //console.log('WelcomeBack/getDerivedStateFromProps/nextProps', nextProps.wallet.error, nextProps.wallet.error.length, (nextProps.wallet.error.length > 2));
            const msg = 'Erro: ' + nextProps.wallet.error;
            console.error('WelcomeBack/getDerivedStateFromProps: ', msg);
            return { isLoading: false, openedWallet: false, password: "" };
        }
        if (nextProps.wallet.openedWallet) {
            return { openedWallet: nextProps.wallet.openedWallet };
        }
        return null;
    }

    render() {
        if (this.state.openedWallet) {
            return (
                <Redirect to="/choosecreateidentityorhome" />
            );
        }
        return (
            <div className="principal">
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
                         <h3 className="title">Welcome Back</h3>
                        </Row>
                    </Row>
                    <Row className="text-center">
                        <p className="paragraph">The decentralized web waits for you!</p>
                    </Row>
                    <Row>
                        <Col className="col-sm-12">
                            <Form className="col-sm-6 col-sm-offset-3">
                                <label className="paragraph label-welcomeback">Password</label>
                                <FormControl
                                    className="paragraph"
                                    id="password"
                                    type="password"
                                    value={this.state.password}
                                    placeholder="The password must have 8 characters"
                                    onChange={this.handleChange}
                                />
                            </Form>
                        </Col>
                    </Row>
                    <Row className="containerButton col-sm-12">
                        <Col className="text-center col-sm-4 col-sm-offset-4">
                            <Button disabled={!this.validateForm()} className="paragraph btn btn-large" bsSize="large" block bsStyle="warning" type="submit" onClick={this.handleClick}>
                                Login
                            </Button>
                        </Col>
                        <p className="paragraph p-welcomeback" align="center">Forgot your password? <Link to="/importwallet">Import</Link>  using your phrase.</p>
                    </Row>
                    <Loader visible={this.state.isLoading} message={this.state.msg} />
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    wallet: state.wallet,
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
