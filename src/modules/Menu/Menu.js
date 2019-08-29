import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row} from 'react-bootstrap';
import { MdLock , MdPerson , MdHistory } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";
import { GoSignOut} from "react-icons/go";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Settings from '../../config/settings';
import logo from '../../images/holon38.png';
import avatar from '../../images/boy.svg';
import '../../styles/_utils.css';
import './Menu.css';

class Menu extends Component {
  
    constructor (props) {
      super(props)
      this.state = { validator: this.props.validator }
      this.getName = this.getName.bind(this); 
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
                        <p className="paragraph">{ this.props.validator.address }</p>
                        <p className="paragraph">{ this.getName('name') }</p>
                    </Row>
                </div>

                <div className="links">
                    <div>
                        <Link to="/historyvalidations" className="items-menu">
                            <MdHistory className="icons"/> 
                            <a className="paragraph space-icon-p">History Validations</a>
                        </Link>
                        <hr className="line-menu"></hr>
                    </div>
                    <div>
                        <Link to="/profile" className="items-menu">
                            <MdPerson className="icons"/> 
                            <a href="" className="paragraph space-icon-p">Profile</a>
                        </Link>
                        <hr className="line-menu"></hr>
                    </div>
                    <div className="items-menu">
                        <TiArrowForward className="icons"/>
                        <a href={"https://" + network + "etherscan.io/address/" + this.props.validator.address} target="_blank" className="paragraph space-icon-p">Etherscan</a>
                        <hr className="line-menu"></hr>
                    </div>
                    <div>
                        <Link to="/backupphrase" className="items-menu">
                            <MdLock className="icons"/>
                            <a href="" className="paragraph space-icon-p">Backup secret phrase</a>
                        </Link>
                        <hr className="line-menu"></hr>
                    </div>
                </div>
                <div className="text-right logout-item">
                    <Link to="/welcomeback" className="items-menu">
                        <GoSignOut className="icons"/>
                        <a href="" className="paragraph space-icon-p">Logout</a>
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