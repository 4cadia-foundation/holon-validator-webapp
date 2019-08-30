import React,  {Component} from 'react';
import { Grid, Row, Col, Button, Glyphicon, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as ValidatorActions from "../../redux/actions/validator";

import DataCategory from "../../components/DataCategory/DataCategory";
import Loader from "../../components/Loader/Loader";

import logoHolon from '../../images/holon38.png'; 

import './DepositStake.css';

class DepositStake extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            isRunning: true,
            msg: 'Loading the balance of your wallet',
            methodExecuted: false,
            priceStrategy: 0,
            price: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setpriceStrategy = this.setpriceStrategy.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getBalance();
    }

   /**
   * @method getDerivedStateFromProps
   * @description getDerivedStateFromProps this is method of live cycle react for detect modifications in props
   **/
  static getDerivedStateFromProps(props, state){
    //console.log('DepositStake/getDerivedStateFromProps/props', props)
    if (props.validator.error.length > 2) {
        const msg = 'Erro: ' + props.validator.error;
        console.error('DepositStake/getDerivedStateFromProps: ', msg);
        return { isRunning: true, methodExecuted: false, msg: msg };
    }
    if (props.validator.balance !== state.balance && !props.validator.isRunning) {
      return { balance: props.validator.balance, isRunning: props.validator.isRunning };
    }
    if (!props.validator.isRunning) {
        return { isRunning: props.validator.isRunning };
    }
    return null;
  }

  /**
   * @method handleSubmit
   * @description submit for restore account with mnemonic and password
   **/
  handleSubmit (event) {
    event.preventDefault();
    console.log('depositStake/handleSubmit', this.state.priceStrategy, this.state.price);
    if ((this.state.priceStrategy == 0 && this.state.price == 0) || 
    (this.state.priceStrategy > 0 && this.state.price > 0)) {
        this.setState({ isRunning: true, msg: 'Processing your transaction', methodExecuted: true });
        this.props.addValidator(this.state.priceStrategy, this.state.price);
    }
  }

  handleChange(event) {
    this.setState({ price: event.target.value })
  }

  setpriceStrategy (_priceStrategy) {
    this.setState({ priceStrategy: _priceStrategy });
  }

  setPrice (_price) {
    this.setState({ price: _price })
  }

    render() {
        if (!this.state.isRunning && this.state.methodExecuted) {
            return (
                <Redirect to="/home" />
            )
        }
        if ( this.state.balance  < 0.1){
            return(
                <div className="div-principal">
                    <Grid className="col-sm-3 menu-bar background">
                        <Col className="col-sm-2">
                            <div className="header-holon">
                            <img className="logo-holon-size" src={logoHolon} alt="logoHolon" />
                            <h3 className="title title-header">Holon</h3>
                            </div>
                        </Col>
                    </Grid>
                    <Grid className="grid-second-deposit">
                        <Row>
                            <Col> 
                                <hr className="line"></hr>
                                <h3 className="text-center">Deposit Stake</h3>
                                <div className="valueWei">
                                    <p className="text-center">You don't have enough funds!</p>                            
                                    <p className="text-center">To be a Holon Validator you must leave 1 ETH in stake.</p>
                                    <p className="text-center">Your actual balance is { this.state.balance }</p>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <Loader visible={this.state.isRunning} message={this.state.msg} />
                </div>
            )
        } else {
        return(
            <div>
                <Grid>
                    <Row>
                        <Col> 
                            <h3 className="text-center title margin-top-50">Deposit Stake</h3>
                            <div className="valueWei">
                                <p className="text-center paragraph">To be a Holon Validator you must leave 1 ETH in stake.</p>
                                <p className="text-center paragraph">Your actual balance is { this.state.balance }</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="margin-top-50">
                        <DataCategory emitsetpriceStrategy={this.setpriceStrategy}/>
                        <FormControl
                        type="text"
                        value={this.state.price}
                        placeholder="Value in wei"
                        onChange={this.handleChange}
                        className="paragraph margin-top-10"
                        />
                    </div>
                    <div className="margin-top-50 btn-save-depositStake">
                        <Button className="paragraph" bsStyle="warning" onClick={this.handleSubmit}><Glyphicon glyph="ok"/> Save</Button>                            
                    </div>
                </Grid>
                <Loader visible={this.state.isRunning} message={this.state.msg} />
            </div>
        )
        }
    }
}

const mapStateToProps = reduxState => ({
    validator: reduxState.validator
});
  
const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DepositStake);