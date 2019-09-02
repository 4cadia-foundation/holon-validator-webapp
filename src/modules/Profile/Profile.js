import React, { Component } from 'react'
import { Col, Glyphicon, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Menu from '../Menu/Menu';
import Balance from '../../components/Balance/Balance';
import Deposit from '../../components/Deposit/Deposit';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            personalInfo: [],
        }
    }

    componentDidMount() {
        this.setState({
            personalInfo: this.props.validator.personalInfo
        })
    }

    render() {
        return (
            <div>
                <Menu />
                <Col sm={6}>
                    <div className="title-header">
                        <Glyphicon className="icon-inbox" glyph="inbox"/>
                        <h3 className="title">Workspace</h3>
                    </div>
                    <hr className="line-home" />
                    <p>Home/Profile</p>
                    <h3>Profile</h3>
                    <Row>
                        <Col sm={12}> 
                            {
                                this.state.personalInfo.map((val, idx) =>
                                {
                                return(
                                    <div  className="text-center pad10b" key={'row_' + idx.toString()}>
                                        <div className="margin-top-30">
                                            <div className="card-profile">
                                                {val.valor}
                                            </div>
                                        </div>
                                    </div>
                                        )
                                    })
                                }
                        </Col>
                    </Row>
                </Col>
                <Col sm={3}>
                    <div className="container-balance">
                        <h3 className="text-center paragraph">Your Balance</h3>
                        <Balance />
                    </div>
                    <div className="deposit-container text-center margin-top-30">
                        <h3 className="paragraph">Deposit ETH</h3>
                        <Deposit />
                    </div>
                   <Row>
                       <p className="paragraph text-center deposit-p">Deposit and receive ETH sharing your account QR code.</p>
                   </Row>
                </Col>                
            </div>
        );
    }

}

const mapStateToProps = state => ({
    validator: state.validator
  });

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
