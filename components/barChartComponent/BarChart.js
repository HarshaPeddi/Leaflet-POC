import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { saveDisplayDate } from '../../redux/actions/selectedDataAction';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartHeight: 30,
            chartWidth: '100%',
            chartBarThickness: 2,
            chartContainerWidth : 57,
            chartData: {
                labels: this.props.chartData.datesArray,
                datasets: [
                    {
                        data: this.props.chartData.dataArray,
                        backgroundColor: this.props.chartData.backgroundColorDataArray,
                        borderColor: this.props.chartData.borderColorDataArray,
                        borderSkipped: false,
                        borderWidth: {
                            top: 1,
                            right: 1,
                            bottom: 1,
                            left: 1
                        }
                    }
                ]
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chartData !== this.props.chartData) {
            const updateSet = {
                data: [...Array(this.props.chartData.datesArray.length)].fill(2.5),
                backgroundColor: [...Array(this.props.chartData.datesArray.length)].fill('#4A4A4A'),
                borderColor: [...Array(this.props.chartData.datesArray.length)].fill('#676464'),
            }
            this.setState({ chartData: { ...this.state.chartData, labels: this.props.chartData.datesArray, datasets: [ { ...this.state.chartData.datasets[0], ...updateSet } ] } }, () => {
                this.resizeChartAndContainer();
                this.highLightBar();
            });
        }
    }

    highLightBar() {
        var backgroundColorArray = this.state.chartData.datasets[0].backgroundColor
        var borderColorArray = this.state.chartData.datasets[0].borderColor
        backgroundColorArray[0] = '#50E3C2';
        borderColorArray[0] = '#4A6B7E';
        this.setState({
            backgroundColor: backgroundColorArray,
            borderColor: borderColorArray,
        });
    }

    resizeChartAndContainer = () => {
        var height = 40
        var width = (this.state.chartData.labels.length * 17)
        var canvasWidth = 54 + (this.state.chartData.labels.length * 1.081)
        var barThickness = 8

        this.setState({
            chartHeight: height,
            chartWidth: width,
            chartBarThickness: barThickness,
            chartContainerWidth : canvasWidth
        });
    }

    componentWillMount() {
        this.resizeChartAndContainer()
    }

    componentDidMount() {
        this.highLightBar();
    }

    updateColorAndDateDisplay = (item) => {
        if (item[0]) {
            var itemIndex = item[0]._index
            this.props.dispatch(saveDisplayDate(item[0]._model.label))

            var backgroundColorArray = this.state.chartData.datasets[0].backgroundColor
            var borderColorArray = this.state.chartData.datasets[0].borderColor

            backgroundColorArray.map((colorValue, index) => {
                if (index === itemIndex) {
                    backgroundColorArray[index] = '#50E3C2'
                    borderColorArray[index] = '#4A6B7E'
                    
                } else {
                    backgroundColorArray[index] = '#4A4A4A'
                    borderColorArray[index] = '#676464'
                }
            })

            this.setState({
                backgroundColor: backgroundColorArray,
                borderColor: borderColorArray,
            });
        }
    }

    render() {
        return (
            <div className="chart" style={{width: "100%"}}>
                <Bar
                    data={this.state.chartData}
                    width={this.state.chartWidth}
                    height={this.state.chartHeight}
                    backgroundColor={this.state.backgroundColor}
                    borderColor={this.state.borderColor}
                    options={{
                        responsive: true,
                        tooltips: {
                            enabled: true
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                display: false,
                                barThickness: this.state.chartBarThickness
                            }],
                            yAxes: [{
                                ticks: {
                                },
                                display: false
                            }],
                        },
                        maintainAspectRatio: false,
                        onClick: (e, item) => { this.updateColorAndDateDisplay(item) }
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        chartData: state.chartData
    };
};
Chart= connect(mapStateToProps,null)(Chart);