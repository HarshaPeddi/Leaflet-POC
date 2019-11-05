import React, { Component } from 'react';
import MapLayer from '../mapComponent/MapLayer'
import SideBar from '../sideBarComponent/sideBar'
import Chart from '../barChartComponent/BarChart';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux';
import { saveDates, saveBarchartDATA, saveBackgroundColorForBarchart, saveBorderColorForBarchart } from '../../redux/actions/chartActions';
import { saveDisplayDate } from '../../redux/actions/selectedDataAction';
import { DATES, DATA, BACKGROUND_COLOR_FOR_BARCHART, BORDER_COLOR_FOR_BARCHART } from "../../Helpers/Constants";

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dates : DATES,
            data: DATA,
            backgroundColor: BACKGROUND_COLOR_FOR_BARCHART,
            borderColor: BORDER_COLOR_FOR_BARCHART,
            selectedDate: DATES[0],
            horizontalBarWidth: 51,
            chartContentContainerWidth : 57,
            outerBarChartContainerWidth : 1028,
            chartContainerRightPadding : "10%"
        }
    }

    resizeContainersAndBar = () => {
        var outerContainerWidth = 10.757 + (this.state.dates.length * 1.081) > 100 ? 100 : (10.757 + (this.state.dates.length * 1.081));  
        var barContentContainerWidth = 44 + (this.state.dates.length * 1.081) > 100 ? 100 : ( 44 + (this.state.dates.length * 1.081));
        var barWidth = 54 + (this.state.dates.length * 1.081) > 100 ? 100 : (54 + (this.state.dates.length * 1.081));

        this.setState({
            outerBarChartContainerWidth : outerContainerWidth,
            chartContentContainerWidth : barContentContainerWidth,   
            horizontalBarWidth: barWidth,         
        });
    }

    setRightPadding = () => {
        var rightPadding = 42.459458 - (this.state.dates.length * 0.486486);

        this.setState({
            chartContainerRightPadding : rightPadding < 0 ? 0 : rightPadding
        });
    }

    componentWillMount() {
        this.resizeContainersAndBar()
        this.setRightPadding()
        this.props.dispatch(saveDates(this.state.dates))
        this.props.dispatch(saveBarchartDATA(this.state.data))
        this.props.dispatch(saveBackgroundColorForBarchart(this.state.backgroundColor))
        this.props.dispatch(saveBorderColorForBarchart(this.state.borderColor))
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.selectedDate !== this.state.selectedDate && nextProps.selectedDate !== undefined){
            this.setState({
                selectedDate : nextProps.selectedDate
            });
        } 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chartData !== this.props.chartData) {
            this.setState({ 
                dates: this.props.chartData.datesArray
            }, () => {
                this.resizeContainersAndBar();
                this.setRightPadding();
                this.props.dispatch(saveDisplayDate(this.state.dates[0]));
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(saveDisplayDate(this.state.dates[0]));
    }

    render() {
        return (
            <div >
                <SideBar></SideBar>
                <div className="map-container">
                    <MapLayer> </MapLayer>
                    <div className="bar-chart-container" style={{width: this.state.outerBarChartContainerWidth + "%", right: this.state.chartContainerRightPadding + "%"}}> 
                        <div className="bar-chart-content-container hover-hand" style={{width: this.state.chartContentContainerWidth + "%"}}>
                            <div>
                                <Chart />
                            </div>
                            <div className="horizontal-bar">
                                <hr className="style1" style={{width: this.state.horizontalBarWidth + "%"}}></hr>
                            </div>
                            <div className="date-placeholder">
                                {this.state.selectedDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedDate: state.selectedDate,
        chartData: state.chartData
    };
};
Home= connect(mapStateToProps,null)(Home);