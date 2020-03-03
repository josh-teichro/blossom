import React, { Component } from 'react';

import './styles.css'

class UniversityProgram extends Component {

    render() {
        return (
            <div className="university-program">
                <h2 className="university-program-title"> {this.props.program.name} </h2>
                <p className="university-program-average"> {this.props.program.average}% admission average </p>
            </div>
        );
    }

}

export default UniversityProgram;
