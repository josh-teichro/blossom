import React from 'react';
import './Preferences.css';
import PopWindow from '../../common/PopWindow'
import CloseIcon from '@material-ui/icons/Close';
import Field from '../../common/Field';
import Dropdown from '../../common/Dropdown';

const programs = require('../../../data.json').programs
const regions = require('../../../data.json').regions

export default class Preferences extends React.Component {
    state = {
        newUsername: this.props.user.username,
        newName: this.props.user.name,
        newPassword: this.props.user.password,
        newGrades: this.props.user.grades,
        newPrograms: this.props.user.programs,
        newRegions: this.props.user.regions
    }

    updateUser = () => {
        this.props.setUser({
            ...this.props.user,
            username: this.state.newUsername,
            name: this.state.newName,
            password: this.state.newPassword,
            grades: this.state.newGrades,
            programs: this.state.newPrograms,
            regions: this.state.newRegions
        })
    }

    // Grades
    addGrades = () => {
        const newGrade = this.state.newGrades
        newGrade.push({ id: this.state.newGrades.length })
        this.setState({ newGrades: newGrade })
    }

    removeGrade = (index) => {
        const newGrade = this.state.newGrades
        this.setState({ newGrades: newGrade.slice(0, index).concat(newGrade.slice(index+1))})
    }

    // Programs
    addProgram = () => {
        const newProgram = this.state.newPrograms
        newProgram.push(programs.filter((pgm) => !this.state.newPrograms.includes(pgm.id))[0].id)
        this.setState({ newPrograms: newProgram })
    }

    onChangeProgram = ({target: {value}}, index) => {
        const half = this.state.newPrograms.slice(0, index)
        half.push(parseInt(value))
        this.setState({ newPrograms: half.concat(this.state.newPrograms.slice(index+1)) })
    }

    removeProgram = (index) => {
        const newProgram = this.state.newPrograms
        this.setState({ newPrograms: newProgram.slice(0, index).concat(newProgram.slice(index+1))})
    }

    // Regions
    addRegion = () => {
        const newRegion = this.state.newRegions
        newRegion.push(regions.filter((rgn) => !this.state.newRegions.includes(rgn.id))[0].id)
        this.setState({ newRegions: newRegion })
    }

    onChangeRegion = ({target: {value}}, index) => {
        const half = this.state.newRegions.slice(0, index)
        half.push(parseInt(value))
        this.setState({ newRegions: half.concat(this.state.newRegions.slice(index+1)) })
    }

    removeRegion = (index) => {
        const newRegion = this.state.newRegions
        this.setState({ newRegions: newRegion.slice(0, index).concat(newRegion.slice(index+1))})
    }

    render() {
        return (
            <PopWindow visible={this.props.visible}>
                <div className='pref-window'> 
                    <img 
                        className='logo' 
                        alt='blossom' 
                        src={require('../../images/blossom-pink.png')} />
                    <div className='pref-content'>
                        <div className='pref-name'>{this.state.newName}</div>
                        <div className='user-details-form'>
                            <Field 
                                label='username' 
                                onChange={({target: {value}}) => this.setState({ newUsername: value })} 
                                placeholder='username' 
                                title='username' 
                                className='fourtyfive marg' 
                                align='center' 
                                value={this.state.newUsername}/>
                            <Field 
                                label='name' 
                                onChange={({target: {value}}) => this.setState({ newName: value })} 
                                placeholder='name' 
                                className='fourtyfive marg' 
                                align='center' 
                                value={this.state.newName}/>
                            <Field 
                                label='password' 
                                onChange={({target: {value}}) => this.setState({ newPassword: value })} 
                                placeholder='password' 
                                className='fourtyfive marg' 
                                type='password' 
                                align='center' 
                                value={this.state.newPassword}/>
                        </div>
                        <div className='grade-form'>
                            <span className='grd-text'>Grades</span>
                            {
                                this.state.newGrades.map((grade, index) => (
                                    <div className='grade-form entry' key={index}>
                                        <Field placeholder='Course Name' className='fourtyfive' align='left' value={grade.course}/>
                                        <Field placeholder='Grade (%)' className='fourtyfive' align='left' value={grade.grade}/>
                                        <CloseIcon className='close-field' onClick={() => this.removeGrade(index)} />
                                    </div>
                                ))
                            }
                            <div 
                                className='button-add grade noselect'
                                onClick={this.addGrades}>Add more...</div>
                        </div>
                        <div className='button-form'>
                            <div className='program-form'>
                                <span className='grd-text'>Programs</span>
                                {
                                    this.state.newPrograms.map((i) => programs[i]).map((program, index) => (
                                        <Dropdown 
                                            onChange={(e) => this.onChangeProgram(e, index)}
                                            onRemove={() => this.removeProgram(index)} 
                                            key={index} 
                                            formclassname='drop' 
                                            choices={programs.filter((pgm) => !this.state.newPrograms.includes(pgm.id) || pgm.id === program.id)} 
                                            defaultValue={program.id} />
                                    ))
                                }
                                {
                                    this.state.newPrograms.length < programs.length && (
                                        <div 
                                            className='button-add noselect'
                                            onClick={this.addProgram}>Add more...</div>
                                    )
                                }
                            </div>
                            <div className='region-form'>
                                <span className='grd-text'>Regions</span>
                                {
                                    this.state.newRegions.map((i) => regions[i]).map((region, index) => (
                                        <Dropdown 
                                            onRemove={() => this.removeRegion(index)}
                                            key={index}
                                            formclassname='drop'
                                            choices={regions.filter((rgn) => !this.state.newRegions.includes(rgn.id) || rgn.id === region.id)}
                                            defaultValue={region.id} />
                                    ))
                                }
                                {
                                    this.state.newRegions.length < regions.length && (
                                        <div 
                                            className='button-add noselect'
                                            onClick={this.addRegion}>Add more...</div>
                                    )
                                }
                            </div>
                        </div>
                        <div 
                            className='button threequarters marg-bot' 
                            onClick={() => {
                                this.updateUser()
                                this.props.close()
                            }}>Update Profile</div>
                    </div>
                    <CloseIcon className='close-icon' onClick={this.props.close} />
                </div>
            </PopWindow>
        )
    }
}