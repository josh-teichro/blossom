import React from 'react';
import './SignIn.css';
import CloseIcon from '@material-ui/icons/Close';
import Field from '../common/Field';
import ProgramQuery from './ProgramQuery';
import RegionQuery from './RegionQuery';
import GradeQuery from './GradeQuery';

export default class SignIn extends React.Component {
    state = {
        stage: 0, // entry:0 || signup1:1 || signup2:2 || signup3:3
        username: '',
        name: '',
        password: '',
        regions: [],
        programs: [],
        errusername: false,
        errname: false,
        errpassword: false,
    }

    signIn = () => {
        this.props.signIn(this.state.username, this.state.password).then(user => {
            this.setState({ username: '', password: '', name: '', regions: [], programs: [], stage: 0, errusername: false, errpassword: false })
        }).catch(err => {
            if (err && err.response && err.response.status == 401) {
                this.setState({ errusername: true, errpassword: true })
            } else {
                alert(err)
            }
        })
    }

    onKeyDownIn = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.signIn();
        }
    }

    signInGoogle = () => {
        console.log('sign in google');
    }

    nextSignUpStep = () => {
        console.log('next stage');
        if (this.state.stage === 0) {
            (['username', 'name', 'password']).forEach((wch) => {
                if (this.state[wch].length < 4) {
                    this.setState({[`err${wch}`]: true})
                } else {
                    this.setState({[`err${wch}`]: false})
                }
            })
            if (this.state.password.length >= 4
                && this.state.name.length >= 1
                && this.state.username.length >= 1) {
                this.setState({ stage: this.state.stage + 1 })
            }
        } else {
            this.setState({ stage: this.state.stage + 1 })
        }
    }

    signUp = (grades) => {
        // should complete profile, move to main page.
        const user = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            grades: grades,
            regions: this.state.regions,
            programs: this.state.programs,
        }
        this.props.signUp(user).then(() => {
            this.props.signIn(user.username, user.password).then(() => {
                this.props.close() // close window
                this.props.switchView() // back to sign in
            }).catch(err => {
                alert(err)
            })
        }).catch(err => {
            if (err && err.response && err.response.status == 400) {
                alert("Could not create user: Invalid data!")
            } else {
                alert(err)
            }
        })
    }

    onKeyDownUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.nextSignUpStep();
        }
    }

    signUpGoogle = () => {
        console.log('sign up google');
    }

    setPrograms = (programs) => this.setState({ programs })
    setRegions = (regions) => this.setState({ regions })

    onClose = () => {
        // reset the module if X is pressed
        this.setState({
            stage: 0,
            username: '',
            name: '',
            password: '',
            regions: [],
            programs: [],
            errusername: false,
            errname: false,
            errpassword: false,
        })
        this.props.close()
    }

    render() {
        return (
            <div id="sign-in-container">
                <img
                    className="logo"
                    alt="blossom"
                    src={require('../../images/blossom-pink.png')} />
                {
                    this.state.stage === 0 ? (
                        <div className="sign-info-box">
                            <span className="title noselect">blossom</span>
                            <Field
                                className="full"
                                value={this.state.username}
                                onChange={({target: {value}}) => this.setState({username: value})}
                                error={this.state.errusername}
                                placeholder="username"
                                type="text" />
                            {
                                this.props.type === 'up' && (
                                <Field
                                    className="full"
                                    value={this.state.name}
                                    onChange={({target: {value}}) => this.setState({name: value})}
                                    error={this.state.errname}
                                    placeholder="name"
                                    type="text" />)
                            }
                            <Field
                                className="full"
                                value={this.state.password}
                                onChange={({target: {value}}) => this.setState({password: value})}
                                error={this.state.errpassword}
                                placeholder="password"
                                type="password"
                                onKeyDown={this.state.type === 'up' ? this.onKeyDownUp : this.onKeyDownIn}/>

                            <div
                                className="button full"
                                onClick={
                                    this.props.type === 'up' ?
                                    this.nextSignUpStep : this.signIn}>
                                Sign {this.props.type === 'up' ? 'Up' : 'In'}</div>
                            <div className="button-up noselect" onClick={() => {
                                this.setState({
                                    errusername: false,
                                    errname: false,
                                    errpassword: false,
                                })
                                this.props.switchView()
                            }}>
                                {this.props.type === 'up' ?
                                'Have an account? Sign In.' : 'No account? Sign Up.'}
                            </div>
                        </div>
                    ) :
                    this.state.stage === 1 ? (<ProgramQuery setPrograms={this.setPrograms} nextSignUpStep={this.nextSignUpStep} />) :
                    this.state.stage === 2 ? (<RegionQuery setRegions={this.setRegions} nextSignUpStep={this.nextSignUpStep} />) :
                    this.state.stage === 3 && (<GradeQuery signUp={this.signUp} />)
                }
                <CloseIcon className="close-icon" onClick={this.onClose} />
            </div>
        )
    }
}
