import React, {Component} from 'react';
import {Panel, Row, Col, Grid, Label, Glyphicon } from 'react-bootstrap';
import * as Types from '../../constants/Types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import './HistoryValidations.css';
import Menu from "../Menu/Menu";
import Search from "../../components/Search/Search";
import Balance from "../../components/Balance/Balance";
import Deposit from "../../components/Deposit/Deposit";
import CardHistory from "../../components/CardHistory/CardHistory";

class HistoryValidations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isProcessing: true,
            msg: 'Loading validation list',
            validationResults: []
        };
    }


    render() {

        const listHistoryValidations = this.props.validations.objLogs._validationAsks
            .filter(item => item.status !== Types.PENDING)
            .map( ( item ) => {
            return {
                status: item.status,
                field: item.field,
                address: item.requester,
                name: item.requesterName,
                data: item.dataValue,
                link: item.uriDataConfirmation
            };
        });

        return(
            <div>

                <Menu />
                <Col sm={6}>
                    <Row>
                        <div className="title-header">
                            <Glyphicon className="icon-inbox" glyph="inbox"/>
                            <h3 className="title">Workspace</h3>
                        </div>
                    </Row>
                    <Row>
                        <hr  className={'line width-auto'}/>
                        <p className="paragraph">Home / History Validations</p>
                    </Row>
                    <Row>
                        <div className="search-space space-between">
                            <h3 className="title">History Validations</h3>
                            <Search />
                        </div>
                    </Row>
                    <Row>
                        {
                            listHistoryValidations.map( (item, index ) => ( <CardHistory personData={ item } key={index}/> ))
                        }
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
        )
    }
}

const mapStateToProps = state => ({
    validations: state.validations
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HistoryValidations);
