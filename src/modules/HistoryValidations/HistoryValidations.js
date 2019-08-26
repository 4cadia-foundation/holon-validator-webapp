import React, {Component} from 'react';
import {Panel, Row, Col, Grid, Label, Glyphicon } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Loader from '../../components/Loader/Loader';
import PendingValidationsBox from '../../components/PendingValidationsBox/PendingValidationsBox';
import PendingValidations from '../../components/PendingValidations/PendingValidations';

import './HistoryValidations.css';

class HistoryValidations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isProcessing: true,
            msg: 'Loading validation list',
            validationResults: [],
        };
    }

    componentDidMount() {
        console.log('HistoryValidations/componentDidMount/objLogs', this.props.validator.objLogs)
        this.setState({
            isProcessing: false,
            validationResults: this.props.validator.objLogs.validationResults,
        });
        
    }

    render() {
        console.log('HistoryValidations/render/state', this.state.validationResults)
        return(
            <div>
                <Grid>
                    <Row>
                        <Col>
                            <div className="btn-history-close">
                                <CloseIconPage destination="/menu"/>                    
                            </div>
                            <div className="margin-top-30">
                                <h3 id="title-history" className="text-center title">History Validations</h3>
                            </div>                        
                        </Col>
                    </Row>
                    <PendingValidations onlyPending={false}/>

                </Grid>
                <Loader visible={this.state.isProcessing} message={this.state.msg} />
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    validator: state.validator
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HistoryValidations);