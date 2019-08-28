import React, { Component } from 'react'
import { Button, Form, FormControl, Grid, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

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
        //console.log('render/state', this.state);
        return (
            <Grid className="margin-top-50">
                <Row className="text-center">
                    {/* <img className="logo" src={logo} alt="Logo" /> */}
                </Row>
                <Form>
                    <div>
                        <h3 align="center" className="title" >Welcome Back</h3>
                        <p align="center" className="paragraph"> The decentralized web waits for you </p>
                    </div>
                    <label className="paragraph label-welcomeback">Password</label>
                    <FormControl
                        className="paragraph"
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="The password must have 8 characters"
                        onChange={this.handleChange}
                    />
                    <Button disabled={!this.validateForm()} className="paragraph btn btn-block" bsSize="large" block bsStyle="warning" type="submit" onClick={this.handleClick}>
                        Log in
                </Button>
                    <p className="paragraph p-welcomeback" align="center">Forgot your password? <Link to="/importwallet">Import</Link>  using your phrase</p>
                </Form>
                <Loader visible={this.state.isLoading} message={this.state.msg} />
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    wallet: state.wallet,
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
