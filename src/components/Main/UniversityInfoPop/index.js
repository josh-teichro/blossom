import React, { Component } from 'react';
import PopWindow from '../../common/PopWindow';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './index.css'

export default class UniPopUp extends Component {
    render() {
        const { uni, visible } = this.props;
        return (
            <PopWindow visible={visible} onClose={this.props.close}>
                <div id="pop-container">
                    <img
                        className="logo"
                        alt="blossom"
                        src={require('../../images/blossom-pink.png')} />
                    <div className="popup-div">
                        <p className="popup-hdr">{uni.name}</p>
                        <p className="popup-location">{uni.location}</p>
                        <p className="popup-desc">{uni.description}</p>
                        <div className="button-uni-grp">
                            <div className="button-uni-col">
                                <a target="_blank" rel="noopener noreferrer" href={uni.applyWebsite} className="button-uni apply wide">Apply</a>
                                <a target="_blank" rel="noopener noreferrer" href={uni.website} className="button-uni wide">Website</a>
                                <a target="_blank" rel="noopener noreferrer" href={uni.twitter} className="button-uni wide">Twitter</a>
                            </div>
                            <div className="button-uni-col">
                                <a target="_blank" rel="noopener noreferrer" href={uni.locationUri} className="button-uni">
                                    <FontAwesomeIcon color="#3A4664" icon={uni.country === 'Canada' ? faCanadianMapleLeaf : faStar}/>&nbsp; {uni.location}
                                </a>
                                {uni.programs.map(({ program, website, gradeRequirement }) => (
                                    <div key={program} className="program-block">
                                        <a target="_blank" rel="noopener noreferrer" href={website} className="button-uni program">
                                            <FontAwesomeIcon color="#3A4664" icon={this.getIcon(program)}/>&nbsp; {program}
                                        </a>
                                        <div className="average-block">{gradeRequirement}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <img className="popup-img" alt="uni" src={require('../../images/uoft.png')} />
                    </div>
                    <CloseIcon className="close-icon" onClick={this.props.close} />
                </div>
            </PopWindow>
        )
    }

    getIcon = program => {
        if (program === "Computer Science") {
            return faLaptopCode;
        } else if (program === "Commmerce") {
            return faChartLine;
        } else {
            return faChartLine;
        }
    }
}
