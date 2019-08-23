import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, DropdownButton, Glyphicon, Grid, MenuItem, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Balance from '../../components/Balance/Balance';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Settings from '../../config/settings';
import '../../styles/_utils.css';
import './Menu.css';

class Menu extends Component {
  
    constructor (props) {
      super(props)
      this.state = {
        closeMenu: false
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleNetworkChange = this.handleNetworkChange.bind(this);
    }
    
    handleClick() {
      this.setState({
        closeMenu: true
      })
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

        if (this.state.closeMenu) {
            return (
              <Redirect to='/home' />
            )
        }

        return(
        <Grid>
            <Row>
                <Col>
                    <div className="btn-menu-close">
                        <CloseIconPage destination="/home"/>                    
                    </div>
                    <div className="d-flex flex-row justify-content-between margin-top-10">
                        <h3 id="title-menu" className="title">Validator</h3>
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
                                <a href="" className="space-icon-p paragraph">Secret Backup Phrase</a>
                            </Link>
                        </div>
                        <div  className="flex-column">
                            <Glyphicon id="glyph-color" glyph="cog"/>
                                <DropdownButton
                                    bsSize="xsmall"
                                    title="Select network"
                                    id="dropdown"
                                    className="space-icon-p paragraph">
                                    <MenuItem eventKey="1">Main ethereum network</MenuItem>
                                    <MenuItem eventKey="2">Rinkeby network</MenuItem>
                                    <MenuItem eventKey="3">Localhost</MenuItem>
                                </DropdownButton>
                        </div>
                    </div>
                    <hr className="line-menu"></hr>
                    <div className="margin-top-50">
                        <Balance />
                    </div>
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