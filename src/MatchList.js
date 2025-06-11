import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Match from './Match';
import { matchAddAll } from './actions';

class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameFilter: '',
      sportTypeFilter: '',
      favoriteFilter: false,
      teams: [],
      sports: []
    };
  }

  async componentDidMount() {
    try {
      const teamResponse = await fetch('/teams');
      const teams = await teamResponse.json();
      this.setState({ teams });

      const sportResponse = await fetch('/sports');
      const sports = await sportResponse.json();
      this.setState({ sports });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleTeamNameChange = (event) => {
    this.setState({ teamNameFilter: event.target.value });
  }

  handleSportTypeChange = (event) => {
    this.setState({ sportTypeFilter: event.target.value });
  }

  handleFavoriteToggle = () => {
    this.setState(prevState => ({
      favoriteFilter: !prevState.favoriteFilter
    }));
  }

  handleFilter = async () => {
    const { teamNameFilter, sportTypeFilter, favoriteFilter } = this.state;
    let url = '/matches';

    if (favoriteFilter) {
      url = '/favorites';
    } else if (teamNameFilter) {
      url = `/team/${teamNameFilter}`;
    } else if (sportTypeFilter) {
      url = `/sport/${sportTypeFilter}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    this.props.dispatch(matchAddAll(data));
  }

  handleReset = async () => {
    this.setState({
      teamNameFilter: '',
      sportTypeFilter: '',
      favoriteFilter: false
    });
    const response = await fetch('/matches');
    const data = await response.json();
    this.props.dispatch(matchAddAll(data));
  }

  render() {
    return (
      <div className="card-hover-shadow-2x mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
            <i className="fa fa-tasks"> Matches</i>
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="teamNameFilter">Team Name:</label>
            <select
              className="form-control"
              id="teamNameFilter"
              value={this.state.teamNameFilter}
              onChange={this.handleTeamNameChange}
            >
              <option value="">Select a team</option>
              {this.state.teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sportTypeFilter">Sport Type:</label>
            <select
              className="form-control"
              id="sportTypeFilter"
              value={this.state.sportTypeFilter}
              onChange={this.handleSportTypeChange}
            >
              <option value="">Select a sport</option>
              {this.state.sports.map((sport) => (
                <option key={sport.id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="favoriteFilter"
              checked={this.state.favoriteFilter}
              onChange={this.handleFavoriteToggle}
            />
            <label className="form-check-label" htmlFor="favoriteFilter">Favorites Only</label>
          </div>
          <button className="btn btn-primary mr-2" onClick={this.handleFilter}>Filter</button>
          <button className="btn btn-secondary" onClick={this.handleReset}>Reset</button>
        </div>

        <div className="scroll-area-sm">
          <perfect-scrollbar className="ps-show-limits">
            <div style={{ position: "static" }} className="ps ps--active y">
              <div className="ps-content">
                <ul className="list-group list-group-flush">
                  {this.props.matches.map((match) => (
                    <Match match={match} key={match._id} />
                  ))}
                </ul>
              </div>
            </div>
          </perfect-scrollbar>
        </div>

        <div className="d-block text-right card-footer">
          <NavLink to='/add' className="btn btn-primary mr-2">Add new match</NavLink>
        </div>
      </div>
    );
  }
}

function mapStateProps(state) {
  return {
    matches: [...state.matches]
  };
}

export default connect(mapStateProps)(MatchList);