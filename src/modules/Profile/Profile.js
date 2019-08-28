import React, { Component } from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import logo from '../../images/holon38.png';
import './Profile.css';
import '../../styles/_utils.css';

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
                <Grid>
                    <Row>
                        <Col sm={2}>
                        </Col>
                        <Col sm={6}>
                                <div className="title-icon title">
                                    <Glyphicon glyph="inbox"/>
                                    <h1>Dashboard</h1>
                                </div>
                                <hr className="line-home" />
                                <h5>Home/Profile</h5>
                                <h3>Profile</h3>
                        </Col>
                        <Col sm={3}>
                        </Col>
                    </Row>
                </Grid>
                {
                    this.state.personalInfo.map((val, idx) =>
                        {
                        return(
                            <Grid>
                                <Row  className="text-center pad10b" key={'row_' + idx.toString()}>
                                    <Col sm={2} />
                                    <Col sm={6}>
                                        <div className="margin-top-30">
                                                <div className="card-profile">
                                                    {idx.toString()}
                                                    {idx.toString()}
                                                    {val.valor}
                                                </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                            )
                        })
                    }
            </div>
        );
    }

}

const mapStateToProps = state => ({
    validator: state.validator
  });

  const mapDispatchToProps = dispatch => bindActionCreators(ValidatorActions, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
