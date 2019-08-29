import React, { Component } from 'react'
import { Col, Glyphicon } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ValidatorActions from '../../redux/actions/validator';

import Menu from '../Menu/Menu';
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
                    <div className="title-header title">
                        <Glyphicon className="icon-inbox" glyph="inbox"/>
                        <h3 className="title">Workspace</h3>
                    </div>
                    <hr className="line-home" />
                    <p className="paragraph">Home/Profile</p>
                    <h3 className="title">Profile</h3>
                </Col>
                <Col sm={3}>
                </Col>
                {
                    this.state.personalInfo.map((val, idx) =>
                        {
                        return(
                            <div  className="text-center pad10b" key={'row_' + idx.toString()}>
                                <Col sm={6}>
                                    <div className="margin-top-30">
                                        <div className="card-profile">
                                            {val.valor}
                                        </div>
                                    </div>
                                </Col>
                            </div>
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
