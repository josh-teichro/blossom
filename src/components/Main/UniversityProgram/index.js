import React, { Component } from 'react';

import './styles.css'

class UniversityProgram extends Component {

    render() {
        return (
            <div className="university-program">
                <h2 className="university-program-title"> {this.props.program.program} </h2>
                <p className="university-program-average"> {this.props.program.gradeRequirement}% admission average </p>
            </div>
        );
    }

}

export default UniversityProgram;
