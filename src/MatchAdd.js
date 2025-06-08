import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { matchAdd } from './actions';

class MatchAddInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sportType: '',
            description: '',
            matchDateTime: '',
            location: '',
            nameTeam1: '',
            nameTeam2: '',
            scoreTeam1: '',
            scoreTeam2: ''
        };
        this.onSportTypeChange = this.onSportTypeChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onMatchDateTimeChange = this.onMatchDateTimeChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onNameTeam1Change = this.onNameTeam1Change.bind(this);
        this.onNameTeam2Change = this.onNameTeam2Change.bind(this);
        this.onScoreTeam1Change = this.onScoreTeam1Change.bind(this);
        this.onScoreTeam2Change = this.onScoreTeam2Change.bind(this);
        this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
    }

    onSportTypeChange(e) {
        this.setState({ sportType: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    onMatchDateTimeChange(e) {
        this.setState({ matchDateTime: e.target.value });
    }

    onLocationChange(e) {
        this.setState({ location: e.target.value });
    }

    onNameTeam1Change(e) {
        this.setState({ nameTeam1: e.target.value });
    }

    onNameTeam2Change(e) {
        this.setState({ nameTeam2: e.target.value });
    }

    onScoreTeam1Change(e) {
        this.setState({ scoreTeam1: e.target.value });
    }

    onScoreTeam2Change(e) {
        this.setState({ scoreTeam2: e.target.value });
    }

    onAddFormSubmit(e) {
        e.preventDefault();
        fetch('matches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sportType: this.state.sportType,
                description: this.state.description,
                matchDateTime: this.state.matchDateTime,
                location: this.state.location,
                nameTeam1: this.state.nameTeam1,
                nameTeam2: this.state.nameTeam2,
                scoreTeam1: this.state.scoreTeam1,
                scoreTeam2: this.state.scoreTeam2
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.dispatch(matchAdd(
                    data._id,
                    data.sportType,
                    data.matchDateTime,
                    data.location,
                    data.description,
                    false,
                    data.nameTeam1,
                    data.nameTeam2,
                    data.scoreTeam1,
                    data.scoreTeam2
                ));
                this.props.history('/');
            });
    }

    render() {
        return (
            <div className="card-hover-shadow-2x mb-3 card">
                <div className="card-header-tab card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i className="fa fa-tasks"> Add Task</i>
                    </div>
                </div>
                <form onSubmit={this.onAddFormSubmit}>
                    <div className="widget-content">
                        <input className="form-control d-block mb-2" type="text" value={this.state.sportType} onChange={this.onSportTypeChange} placeholder="Sport Type" />
                        <input className="form-control d-block mb-2" type="text" value={this.state.description} onChange={this.onDescriptionChange} placeholder="Description" />
                        <input className="form-control d-block mb-2" type="date" value={this.state.matchDateTime} onChange={this.onMatchDateTimeChange} placeholder="Match Date Time" />
                        <input className="form-control d-block mb-2" type="text" value={this.state.location} onChange={this.onLocationChange} placeholder="Location" />
                        <input className="form-control d-block mb-2" type="text" value={this.state.nameTeam1} onChange={this.onNameTeam1Change} placeholder="Team 1 Name" />
                        <input className="form-control d-block mb-2" type="text" value={this.state.nameTeam2} onChange={this.onNameTeam2Change} placeholder="Team 2 Name" />
                        <input className="form-control d-block mb-2" type="number" value={this.state.scoreTeam1} onChange={this.onScoreTeam1Change} placeholder="Score Team 1" />
                        <input className="form-control d-block mb-2" type="number" value={this.state.scoreTeam2} onChange={this.onScoreTeam2Change} placeholder="Score Team 2" />
                        <input className="btn btn-primary" type="submit" value="Add" />
                    </div>
                </form>
                <div className="d-block text-right card-footer">
                    <NavLink to='/' className="btn btn-primary">Back to list</NavLink>
                </div>
            </div >
        );
    }
}

const MatchAdd = (props) => {
    return (
        <MatchAddInner {...props} history={useNavigate()} />)
}

export default connect()(MatchAdd);