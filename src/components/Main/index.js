import React, { Component } from 'react';
import Banner from './Banner'
import UniversityList from './UniversityList'
import MySchoolsList from './MySchoolsList'
import TextField from "@material-ui/core/TextField";
import UniversityInfoPop from './UniversityInfoPop'
import Preferences from './Preferences/Preferences'
import AdminPortal from './Preferences/AdminPortal'
import { addToList, removeFromList, fetchUniversities, getReccomendations } from "../../actions/main";

import './styles.css'

class Main extends Component {
    state = {
        view: 'main', // main | pref | admin | learn
        universities: [],
        mySchools: [],
        searchInds: [],
        popVisible: false,
        adminVisible: false,
        prefVisible: false,
        uniPop: {id: -1, name: "Default University", location: "Default, State", country: "United States", description: "Default description.", programs: [{id: 0, name: "Computer Science", average: 100}, {id: 1, name: "Commerce", average: 0}]},
    }

    constructor(props) {
        super(props);

        this.props.history.push("/main");

        fetchUniversities().then((universities) => {
            this.setState({universities: getReccomendations(universities)});
            const mySchools = props.user.schools.map((id) => this.state.universities.filter((uni) => uni.id === id)[0]);
            this.setState({mySchools})
            const searchInds = this.state.universities.map((uni, i) => i);
            this.setState({searchInds})
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="main">
                <div className="main-background">
                    <Banner
                        title={this.props.user.admin ? "Blossom Admin" : "Find Your University"}
                        subtitle={this.props.user.name}
                        subsubtitle={this.props.user.admin ? "Admin Panel" : "Preferences"}
                        signOut={this.signOut}
                        isAdmin={this.props.user.admin}
                        toggleAdminPanel={this.toggleAdminPanel}
                        togglePreferences={this.togglePreferences}
                    />
                    {!this.props.user.admin && (
                        <UniversityList
                            universities={this.state.universities}
                            indeces={this.state.searchInds}
                            addToList={(uni) => {addToList(this, uni)}}
                            learnMore={this.learnMore}
                        />
                    )}
                    {!this.props.user.admin && (
                        <MySchoolsList
                            mySchools={this.state.mySchools}
                            removeFromList={(uni) => {removeFromList(this, uni)}}
                            learnMore={this.learnMore}
                        />
                    )}
                    {!this.props.user.admin && (
                        <div className="main-search-bar-container">
                            <TextField
                                className="main-search-bar"
                                variant="outlined"
                                onChange={({target: {value}}) => this.search(value)}
                                error={false}
                                placeholder="search"
                                type="text"
                            />
                        </div>
                    )}
                </div>
                <UniversityInfoPop
                    visible={this.state.popVisible}
                    uni={this.state.uniPop}
                    close={() => this.setState({ popVisible: false })}/>
                <AdminPortal visible={this.state.adminVisible} setUser={this.props.setUser} close={this.toggleAdminPanel}/>
                <Preferences user={this.props.user} setUser={this.props.setUser} visible={this.state.prefVisible} close={this.togglePreferences}/>
            </div>
        );
    }

    signOut = () => {
        console.log("Signing out.");
        this.props.signOut()
    }

    toggleAdminPanel = () => {
        console.log("Bringing up admin panel.");
        this.setState({ adminVisible: !this.state.adminVisible })
    }

    togglePreferences = () => {
        console.log("Bringing up preferences.");
        this.setState({ prefVisible: !this.state.prefVisible })
    }

    learnMore = (uni) => {
        // open university info page
        console.log('Bringing up "learn more" about ' + uni.name)
        this.setState({ popVisible: true, uniPop: uni });
    }

    search = (query) => {
        const indeces = this.state.universities.reduce( (inds, uni, i) => {
            if (uni.name.toLowerCase().trim().indexOf(query.toLowerCase().trim()) > -1) {
                inds.push(i)
            }

            return inds;
        }, [])

        this.setState({searchInds: indeces});
    }
}

export default Main;
