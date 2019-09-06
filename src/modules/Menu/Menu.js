import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row} from 'react-bootstrap';
import { MdLock , MdPerson , MdHistory } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";
import { GoSignOut} from "react-icons/go";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Settings from '../../config/settings';
import logo from '../../images/black-icon.png';
import avatar from '../../images/boy.svg';
import './Menu.css';

class Menu extends Component {

    constructor (props) {
      super(props)
      this.state = { validator: this.props.validator }
      this.getName = this.getName.bind(this);
      this.hideAddress = this.hideAddress.bind(this);
      this.handleNetworkChange = this.handleNetworkChange.bind(this);
    }

    handleNetworkChange(event) {
        console.log('menu/handleNetworkChange/event.target.value', event.target.value);
        this.props.changeNetwork(event.target.value);
    }

    getName(field) {
        const {validator} = this.state;
        if (validator.personalInfo.length < 1) {
          return '';
        }
        let filtro = validator.personalInfo.filter(item => {
          return item.field == field;
        });
        if (!filtro[0]) {
          return '';
        }
        return filtro[0].valor;
    }

    hideAddress (adrs) {
        if (adrs.length > 20) {
            return (adrs.substring(0, 20) + "...")
        }
        else {
            return adrs;
        }
    }

    render() {

        let network = '';
        if (Settings.network === 4) {
            network = "rinkeby.";
        }

        return(
        <div>
            <Col sm={3} className="grid-menu">
                <div className="header-holon">
                    <img className="logo-menu" src={logo} alt="Logo" />
                    <h3 className="title-menu title">Holon</h3>
                </div>
                <hr className="line-menu" />
                <div className="text-center">
                    <Row>
                        <img className="avatar" src={avatar} alt="Avatar" />
                    </Row>
                    <Row className="text-logged-area">
                        <p className="paragraph">{ this.getName('name') }</p>
                        <p className="paragraph">{ this.hideAddress(this.props.validator.address) }</p>
                    </Row>
                </div>

                <div className="links">
                    <div>
                        <Link to="/historyvalidations" className="items-menu">
                            <MdHistory className="icons"/>
                            <span className="paragraph space-icon-p">History Validations</span>
                        </Link>
                    </div>
                        <hr className="line-menu"></hr>
                    <div>
                        <Link to="/profile" className="items-menu">
                            <MdPerson className="icons"/>
                            <span href="" className="paragraph space-icon-p">Profile</span>
                        </Link>
                    </div>
                        <hr className="line-menu"></hr>
                    <div className="items-menu">
                        <TiArrowForward className="icons"/>
                        <a href={"https://" + network + "etherscan.io/address/" + this.props.validator.address} target="_blank" className="paragraph space-icon-p">Etherscan</a>
                    </div>
                        <hr className="line-menu"></hr>
                    <div>
                        <Link to="/backupphrase" className="items-menu">
                            <MdLock className="icons"/>
                            <span href="" className="paragraph space-icon-p">Backup secret phrase</span>
                        </Link>
                    </div>
                        <hr className="line-menu"></hr>
                </div>
                <div className="text-right logout-item">
                    <Link to="/welcomeback" className="items-menu">
                        <GoSignOut className="icon-logout"/>
                        <span href="" className="paragraph logout-p">Logout</span>
                    </Link>
                </div>
            </Col>
        </div>
)}}

const mapStateToProps = state => ({
    validator: state.validator
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
