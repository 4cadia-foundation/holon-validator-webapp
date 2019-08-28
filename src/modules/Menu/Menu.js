import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Settings from '../../config/settings';
import logo from '../../images/logo.png';
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
        <Grid>
            <Row>
                <Col>
                    <div className="d-flex flex-row justify-content-between margin-top-10">
                            <img className="logo-menu" src={logo} alt="Logo" />
                            <h4 id="title-menu" className="title">Holon</h4>
                    </div>
                    <hr className="line-menu"/>
                    <div className="links">
                    <div className="flex-column">
                            <Link to="/historyvalidations">
                                <Glyphicon id="glyph-color" glyph="dashboard"/> 
                                <a className="space-icon-p paragraph">History Validations</a>
                            </Link>
                        </div>
                    </div>
                    <hr className="line-menu" />
                    <div className="links2">
                        <div className="flex-column">
                            <Link to="/profile">
                                <Glyphicon id="glyph-color" glyph="user"/> 
                                <a href="" className="space-icon-p paragraph">Profile</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <a href={"https://" + network + "etherscan.io/address/" + this.props.validator.address} target="_blank">
                                <Glyphicon id="glyph-color" glyph="share"/>
                                <span className="space-icon-p paragraph">Etherscan</span>
                            </a>
                        </div>
                        <div className="flex-column">
                            <Link to="/backupphrase">
                                <Glyphicon id="glyph-color" glyph="lock"/>
                                <a href="" className="space-icon-p paragraph">Backup secret phrase</a>
                            </Link>
                        </div>
                    </div>
                    <hr className="line-menu"></hr>
                    <Button className="paragraph margin-top-50" bsSize="small" onClick={() => this.props.history.push('/welcomeback')}>Logout</Button>
                </Col>
            </Row>
    </Grid>
)}}

const mapStateToProps = state => ({ 
    validator: state.validator
});
  
const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);