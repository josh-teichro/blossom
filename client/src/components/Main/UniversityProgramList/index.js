import React, { Component } from 'react';
import UniversityProgram from '../UniversityProgram'

import './styles.css'

class UniversityProgramList extends Component {

  render() {
    return (
      <div className="university-program-list">
        {this.props.programs.slice(0,2).map(prog =>
          <UniversityProgram key={prog._id} program={prog}/>)}
      </div>
    );
  }

}

export default UniversityProgramList;
