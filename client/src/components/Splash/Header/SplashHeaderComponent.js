import React from 'react'
import './SplashHeaderComponent.css';
import PopWindow from '../../common/PopWindow';
import SignIn from '../../SignIn/SignIn'

export default class SplashHeaderComponent extends React.Component {
    state = { signInVisible: false, currentView: 'in' }
    
    raiseSignIn = () => {
        this.setState({ signInVisible: true })
    }

    closeSignIn = () => {
        this.setState({ signInVisible: false })
    }

    switchView = () => {
        this.setState({ currentView: this.state.currentView === 'in' ? 'up' : 'in' })
    }

    render() {
        return (
            <div id='headerSection'>
                <img src={require('../../../images/blossom.png')} alt='Blossom Logo' id='logoImage'/>
                <span className='sloganText'>
                    Can't find the right University?
                </span>
                <span className='sloganText'>
                    We can help.
                </span>
                <span id='titleText'>
                    blossom
                </span>
                <button id='signInButton' className='noselect' onClick={this.raiseSignIn}>Sign In or Sign Up</button>
                <PopWindow visible={this.state.signInVisible} onClose={this.closeSignIn}>
                    <SignIn 
                        close={this.closeSignIn} 
                        switchView={this.switchView} 
                        type={this.state.currentView}
                        signUp={this.props.signUp} 
                        signIn={this.props.signIn} />
                </PopWindow>
            </div>
        )
    }
}
