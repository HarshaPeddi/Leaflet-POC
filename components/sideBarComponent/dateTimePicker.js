import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';

export default class DateAndTimePicker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.props.data
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    handleRangeChange(range) {
        this.setState({
            range
        });
    }

    applyClick = () => {
        this.props.openCloseCalendarWindow(this.state.range, true);
    }

    cancelClick = () => {
        this.props.openCloseCalendarWindow();
    }


    render() {
        return (
            <div >
                <div className="date-time-modal">
                    <div className="date-time-modal-content">
                        <Row className="date-picker-container">
                            <DateRange
                                className="date-picker-temp"
                                onChange={this.handleRangeChange}
                                moveRangeOnFirstSelection={false}
                                maxDate={new Date()}
                                calendars={1}
                            />

                        </Row>
                        <Row onClick={this.cancelClick} className="cancel-button hover-hand float-left">Cancel</Row>
                        <Row onClick={this.applyClick} className="accept-button hover-hand">Apply</Row>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSources:state.selectedSources
    };
};
DateAndTimePicker= connect(mapStateToProps,null)(DateAndTimePicker);