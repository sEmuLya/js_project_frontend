import React from "react";
import { connect } from "react-redux";
import { matchDelete, matchUpdateState } from './actions';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.onStatusClick = this.onStatusClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onStatusClick(e) {
        e.preventDefault();
        fetch(`matches/${this.props.match._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                is_favorite: !this.props.match.is_favorite
            })
        })
            .then(res => {
                if (res.ok) {
                    this.props.dispatch(matchUpdateState(this.props.match._id));
                } else {
                    console.log('Failed to update match:', res.status, res.statusText);
                }
            });
    }

    onDeleteClick(e) {
        e.preventDefault();
        fetch(`matches/${this.props.match._id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status === 204) {
                    this.props.dispatch(matchDelete(this.props.match._id));
                } else {
                    console.log('Failed to delete match:', res.status, res.statusText);
                }
            });
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.match.is_favorite ? <div className="todo-indicator bg-success"></div> : <div className="todo-indicator bg-focus"></div>}
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                            <div className="widget-heading">{this.props.match.sportType}</div>
                            <div className="widget-heading">{this.props.match.location}</div>
                            <div className="widget-heading">{this.props.match.nameTeam1} vs {this.props.match.nameTeam2}
                            </div>
                            <div className="widget-subheading">
                                <div>{this.props.match.description}</div>
                            </div>
                            <div className="widget-subheading">
                                <div>{this.props.match.matchDateTime}</div>
                            </div>
                            <div className="widget-subheading">
                                <div>Score: {this.props.match.scoreTeam1}  :  {this.props.match.scoreTeam2} </div>
                            </div>
                        </div>
                        <div className="widget-content-right">
                            <button className="border-0 btn-transition btn btn-outline-success" onClick={this.onStatusClick}>
                                <i className="fa fa-check"></i>
                            </button>
                            <button className="border-0 btn-transition btn btn-outline-danger" onClick={this.onDeleteClick}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default connect()(Match);