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
      this.state = {
      }

      this.handleNetworkChange = this.handleNetworkChange.bind(this);
    }
    
    handleNetworkChange(event) {
        console.log('menu/handleNetworkChange/event.target.value', event.target.value);
        this.props.changeNetwork(event.target.value);
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
                        <p className="paragraph">Nome mocado do validator</p>
                        <p className="paragraph">0x20E48C74d1322Cd...</p>
                    </Row>
                </div>

                <div className="links">
                    <div>
                        <Link to="/historyvalidations">
                            <MdHistory className="icons"/> 
                            <a className="paragraph space-icon-p">History Validations</a>
                        </Link>
                    </div>
                        <hr className="line-menu"></hr>
                    <div>
                        <Link to="/profile">
                            <MdPerson className="icons"/> 
                            <a href="" className="paragraph space-icon-p">Profile</a>
                        </Link>
                        <hr className="line-menu"></hr>
                    </div>
                    <div>
                        <a href={"https://" + network + "etherscan.io/address/" + this.props.validator.address} target="_blank">
                            <TiArrowForward className="icons"/>
                            <span className="paragraph space-icon-p">Etherscan</span>
                        </a>
                        <hr className="line-menu"></hr>
                    </div>
                    <div>
                        <Link to="/backupphrase">
                            <MdLock className="icons"/>
                            <a href="" className="paragraph space-icon-p">Backup secret phrase</a>
                        </Link>
                        <hr className="line-menu"></hr>
                    </div>
                </div>
                <Button className="paragraph" bsSize="small" onClick={() => this.props.history.push('/welcomeback')}>Logout</Button>
            </Col>
        </div>
)}}

const mapStateToProps = state => ({ 
    validator: state.validator
});
  
const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);