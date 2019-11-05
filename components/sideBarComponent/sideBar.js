import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import FordLogo from '../../Images/FordOval_Blue_RGB_v1.svg';
import EditIcon from '../../Images/EditIcon.svg';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {latLongGeo} from '../../components/mapComponent/convertcsv'
import {findMinAndMax, getDates,extractSelectedFeatures,updateColorArrayOnSelectionOfAnomoly} from '../../Helpers/UtillFunctions'
import DateAndTimePicker from '../sideBarComponent/dateTimePicker';
import { connect } from 'react-redux';
import { saveDates } from '../../redux/actions/chartActions';
import { saveColors } from '../../redux/actions/rangeActions';


const Range = Slider.Range;

export default class SideBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            latLongGeo:latLongGeo,
            mageRange: {
                min: '',
                max: 0
            },
            counRange: {
                min: '',
                max: 0
            },
            magValue: ['', 0],
            couValue: ['', 0],
            dateTimePickerFlag: false,
            range: null,
            type: 'POTHOLE',
            datesArray:[],
            magnitudeRangeArray:['0-43', '43-85', '85-127', '127-170', '170-212', '212-255'],
        }
        this.onChangeMagnitudeSlider = this.onChangeMagnitudeSlider.bind(this);
        this.onChangeCountSlider = this.onChangeCountSlider.bind(this);
        this.getMinMaxCount = this.getMinMaxCount.bind(this);
    }

    componentDidMount() {
        this.getMinMaxCount('POTHOLE', this.state.latLongGeo.features);
    }

    getMinMaxCount(type, features) {
        const [magMin, magMax] = findMinAndMax(features, 'magnitude', type, this.state.range);
        const [couMin, couMax] = findMinAndMax(features, 'events_count', type, this.state.range);
    
        this.setState({
            mageRange: {
                min: magMin,
                max: magMax
            },
            counRange: {
                min: couMin,
                max: couMax
            },
            magValue: [magMin, magMax],
            couValue: [couMin, couMax],
            type,
        });

    }

    onChangeMagnitudeSlider(value) {
        this.setState({magValue: value}, () => {
            const element = document.querySelector('.magnitude-scroll .rc-slider-handle-1');
            element.setAttribute('data-before', this.state.magValue[0]);
            const element2 = document.querySelector('.magnitude-scroll .rc-slider-handle-2');
            element2.setAttribute('data-before', this.state.magValue[1]);
        });
    }

    onChangeCountSlider(value) {
        this.setState({couValue: value}, () => {
            const element = document.querySelector('.count-scroll .rc-slider-handle-1');
            element.setAttribute('data-before', this.state.couValue[0]);
            const element2 = document.querySelector('.count-scroll .rc-slider-handle-2');
            element2.setAttribute('data-before', this.state.couValue[1]);
        });
    }

    radioButtonController= (radioButtonName)=>{
        if(this.state.radioButtonClicked===radioButtonName){
            this.setState({
                radioButtonClicked:'',
                radioButtonFlag:false,
                type:radioButtonName.toUpperCase()
            });
        }else{
            if (this.state.selecEventCloseOpen) {
                this.setState({
                    radioButtonClicked:radioButtonName + " ",
                    radioButtonFlag:!this.state.radioButtonFlag,
                    type:radioButtonName.toUpperCase()
                });
            } else {
                this.setState({
                    radioButtonClicked:radioButtonName,
                    radioButtonFlag:!this.state.radioButtonFlag,
                    type:radioButtonName.toUpperCase()
                });
            }
        }
    
        this.props.dispatch(saveColors(updateColorArrayOnSelectionOfAnomoly(radioButtonName.toUpperCase())));
        this.getMinMaxCount(radioButtonName.toUpperCase(),extractSelectedFeatures(this.state.datesArray,radioButtonName.toUpperCase()));
        
    }

    openCloseCalendarWindow =(range, applied)=>{
        var datesArray = []
            if (applied) {
                datesArray = saveDates(getDates(range.startDate.clone(), range.endDate.clone()))
                this.getMinMaxCount(this.state.type,extractSelectedFeatures(datesArray.datesArray,this.state.type));
                this.props.dispatch(datesArray);
            }
         this.setState({
            dateTimePickerFlag:!this.state.dateTimePickerFlag,
            datesArray : datesArray,
            range: applied ? range : this.state.range
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.datesArray !== this.state.datesArray && nextProps.datesArray !== undefined){
            this.setState({
                datesArray : nextProps.datesArray
            });
        }
        if (nextProps.magnitudeRangeArray !== this.state.magnitudeRangeArray && nextProps.magnitudeRangeArray !== undefined){
            this.setState({
                magnitudeRangeArray : nextProps.magnitudeRangeArray
            });
        }  
    }

    render() {
        const { mageRange: { min, max }, counRange, range = {} } = this.state;
        const { startDate = {}, endDate } = range || {};
        const { _locale = {} } = startDate || {};

        return(
        <div className="side-bar-container">
            <div className="imageBlock">
                <div className="imagePlaceHolder">
                    <img className="ford-logo" alt="Ford Logo" src ={FordLogo}></img>
                </div>
            </div>

            <div className="TextBlock">
                <p className="textArea">Citywide pothole and bumps road map</p>
            </div>

            <div className="radioSelectorBlock">
                <div className="anamolyTextContainer">
                    <div>Anomaly :</div>
                </div>
                <div className="radioSelectorcontainer">
                    <div  className="anamoly-sources">
                        <div onClick={()=>{this.radioButtonController('Pothole')}} className="radio-button hover-hand">
                            <div className={['float-left',(this.state.radioButtonClicked==='Pothole')?'radio-selector-on':'radio-selector-off'].join(" ")}></div>
                            <div className={['float-left',(this.state.radioButtonClicked==='Pothole')?'source-name-selected':'source-name-deselected'].join(" ")}>Pothole</div>
                        </div>
                    </div>
                    <div onClick={()=>{this.radioButtonController('Bump')}} className="anamoly-sources">
                        <div className="radio-button hover-hand">
                            <div className={['float-left',(this.state.radioButtonClicked==='Bump')?'radio-selector-on':'radio-selector-off'].join(" ")}></div>
                            <div className={['float-left',(this.state.radioButtonClicked==='Bump')?'source-name-selected':'source-name-deselected'].join(" ")}>Bump</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="line"/>
            <div className="Date-picker-container">
                <div className="anamolyTextContainer">
                    <div>Date:</div>
                </div>

                <Row className="date-time-text-container  hover-hand" onClick={this.openCloseCalendarWindow}>
                    {range && startDate._d && <>
                        <Col className="month-text float-left">{_locale._monthsShort[startDate._d.getMonth()]}</Col>
                        <Col className="day-text float-left">{startDate._d.getDate()}</Col>
                        <Col className="day-text float-left"> - </Col>

                        <Col className="month-text float-left">{_locale._monthsShort[endDate._d.getMonth()]}</Col>
                        <Col className="day-text float-left">{endDate._d.getDate()}</Col>
                        <Col className="day-text float-left"> , </Col>
                        <Col className="time-text float-left">{endDate._d.getFullYear()}</Col>
                    </>}
                    {(!range || !startDate._d ) && <Col className="select-text">Select Date</Col>}

                    <div className="edit-icon float-left" >
                        <img className="edit-icon-url" alt="Edit Icon" src={EditIcon}></img>                         
                    </div>
                </Row>
            </div>
            <hr className="line"/>
            <div className="magnitude-component">
                <div className="MagnitudeTextContainer">
                    <div>Magnitude:</div>
                    <div className="scrollbar magnitude-scroll">
                        <Range allowCross={false} className="hover-hand" min={min} max={max} value={this.state.magValue} onChange={this.onChangeMagnitudeSlider} marks={{[min]: min, [max]: max}}/>
                    </div>
                    <div  className={this.state.radioButtonClicked === 'Bump' ? 'bump-image-container' : 'hidden'}/>
                    <div  className={this.state.radioButtonClicked === 'Pothole' ? 'Pothole-image-container' : 'hidden'}/>
                    <div  className={this.state.radioButtonClicked === 'Bump' ? 'bump-text-container' : 'hidden'}>
                        {this.state.magnitudeRangeArray.map((range, index) =>{
                            return(<div key={index}>{range}</div>)
                        })}
                    </div>
                    <div  className={this.state.radioButtonClicked === 'Pothole' ? 'Pothole-text-container' : 'hidden'}>
                        {this.state.magnitudeRangeArray.map((range, index) =>{
                            return(<div key={index}>{range}</div>)
                        })}
                    </div>
                </div>
            </div>
            <hr className="line"/>
            <div className="magnitude-component">
                <div className="anamolyTextContainer">
                    <div>Count:</div>
                    <div className="scrollbar count-scroll">
                        <Range allowCross={false} className="hover-hand" min={counRange.min} max={counRange.max} value={this.state.couValue} onChange={this.onChangeCountSlider} marks={{[counRange.min]: counRange.min, [counRange.max]: counRange.max}}/>
                    </div>       
                </div>
            </div>
            <div className="anamoly-selecton-display-box">
                <span className="anamoly-selecton-display-text">{this.state.radioButtonClicked}</span>
            </div>
            {this.state.dateTimePickerFlag && <DateAndTimePicker openCloseCalendarWindow={this.openCloseCalendarWindow}></DateAndTimePicker>}
        </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        datesArray:state.chartData.datesArray,
        magnitudeRangeArray:state.anomlyChangeArray.stringRangeArray

    };
};
SideBar= connect(mapStateToProps,null)(SideBar);