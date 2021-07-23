import React, {Component, Fragment} from 'react';
import AdvancedRubric from './AdvancedRubric';
import './AdvancedRubricToggler.css';

class AdvancedRubricToggler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRubric: false,
        }
    }

    handleToggler = () => {
        const showRubric = this.state.showRubric;
        this.setState({showRubric: !showRubric});
    }

    render() {
        return (
            <Fragment>
                <button
                    id="advanced-rubric-toggler-button"
                    onClick={this.handleToggler}
                >
                    {this.state.showRubric ? "Hide" : "Show"} how to use the Advanced Search
                </button>
                {this.state.showRubric ? <AdvancedRubric/> : null}
            </Fragment>
        )
    }
}

export default AdvancedRubricToggler;