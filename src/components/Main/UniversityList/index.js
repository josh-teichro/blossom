import React, { Component } from 'react';

import University from '../University'

import './styles.css'

class UniversityList extends Component {

    render() {
        const {universities, indeces} = this.props;

        return (
        <div className="university-list">
            {indeces.map(i =>
            <University
                key={universities[i].id}
                university={universities[i]}
                addToList={this.props.addToList}
                learnMore={() => this.props.learnMore(universities[i])}
            />)}
        </div>
        );
    }

}

export default UniversityList;
