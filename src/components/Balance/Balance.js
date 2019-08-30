import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import * as ValidatorActions from "../../redux/actions/validator";

import './Balance.css';
import '../../styles/_utils.css';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {balance: 0};        
    }

    componentDidMount() {
        this.props.getBalance();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
        //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
        if (nextProps.validator.error.length>2) {
            const msg = 'Erro: ' + nextProps.validator.error;
            console.error('Balance/getDerivedStateFromProps: ', msg);
            alert(msg);
            return { balance: 0 };
        }
        return { balance : nextProps.validator.balance };        
    }

    render() {
        return(
            
            <div className="balance-div margin-top-30">
                <p className="font-size-30 text-center paragraph margin-top-10">
                    {this.state.balance} ETH
                </p>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    validator: state.validator
});
  
const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Balance);