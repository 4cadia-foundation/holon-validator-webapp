import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as WalletActions from "../../redux/actions/wallet";

import Balance from '../../components/Balance/Balance';
import Deposit from '../../components/Deposit/Deposit';
import Menu from '../Menu/Menu';
import './BackupPhrase.css'

class BackupPhrase extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log('props................... :', this.props.privateKey);

        return (
            <div>
                <Menu />
                <Col sm={6}>
                    <div className="title-icon title">
                        <Glyphicon className="icon-inbox" glyph="inbox"/>
                        <h3>Workspace</h3>
                    </div>
                    <hr className="line" />
                    <p>Home/Secret Backup Phrase</p>
                    <h3>Secret Backup Phrase</h3>                        
                    <div className="paragraph-explication text-center">
                        <p className="paragraph">Your <strong>secret backup phrase</strong> makes it easy restore your account.
                            <strong> Never</strong> disclose your backup phrase.
                            Anyone with this phrase can takes your Ether forever.
                        </p>
                    </div>
                    <Row className="margin-top-30 container-phrase-key">
                        <Col>
                            <label className="paragraph paragraph-size">Secret Phrase</label>
                            <div className="backup-phrase mnemonic-returned">
                                {this.props.mnemonic}
                            </div>
                        </Col>
                        <Col>
                            <label className="paragraph paragraph-size">Private Key</label>
                            <div className="privateKey-returned">
                                {this.props.privateKey.substring(2)}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col sm={3}>
                    <div className="container-balance">
                        <h3 className="text-center">Your Balance</h3>
                        <Balance />
                    </div>
                    <div className="deposit-container text-center margin-top-30">
                        <h3>Deposit ETH</h3>
                        <Deposit />
                    </div>
                    <Row>
                       <p className="paragraph text-center deposit-p">Deposit and receive ETH sharing your account QR code.</p>
                   </Row>
                </Col> 
            </div>
        )
    }
}

const mapStateToProps = state => ({
   privateKey: state.wallet.ethersWallet.privateKey,
   mnemonic: state.wallet.mnemonic,
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackupPhrase);