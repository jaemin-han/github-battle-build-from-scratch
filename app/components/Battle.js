var React = require('react');
var PropTypes = require('prop-types');

//stateless functional component
function PlayerPreview(props) {
    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}
                />
                <h2 className="username">@{props.username}</h2>
            </div>
            <button
                className="reset"
                onClick={props.onReset.bind(null, props.id)}>
                    Reset
            </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
    constructor() {
        super();

        this.state = {
            username: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // whenever the input field is change, the function below will run
    // this function will update the state
    handleChange(event) {
        var value = event.target.value;

        this.setState(function() {
            return {
                username: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input
                    id="username"
                    placeholder="github username"
                    type="text"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.username}>
                        Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor() {
        super();

        this.state = {
            playerOneName: "",
            PlayerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null
        }

        // 'this' keyword inside 'handleSubmit' function is always going to be referenced in the instance
        // this line allows us to do that.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(function () {
            var newState = {};
            //if id is player one -- update...etc
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = "";
            newState[id + 'Image'] = null;
            return newState;
        })
    }

    render() {
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
                <div className="row">
                    {/* ternary operator - IF THEN */}
                    {!playerOneName &&
                        <PlayerInput
                            id="playerOne"
                            label="Player One" 
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneImage}
                            onReset={this.handleReset}
                            id="playerOne"
                        />
                    }

                    {!playerTwoName &&
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two" 
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoImage}
                            onReset={this.handleReset}
                            id="playerTwo"
                        />
                    }

                </div>
            </div>
        )
    }
}

module.exports = Battle;

// 1.Battle.js will initially render two player inputs
//     a. player one and player two - default falsy (empty strings)
// 2. When player input renders, it will render the playerinput "FORM" that has a label, inputfield and button
// 3. When user types in the input field, 'onChange' function will run... this will
//     a. update the 'state' and update the 'value'
// 4. Wehn user clicks submit button, this.handleSubmit will run which will 'preventdefault'
//     and then will call "This.props.onSubmit" passing it an id and username
// 5. Then it will run 'handleSubmit', passing id and username, which will update the state
// 6. Which will then re-render the playerinput section on the bottom
// 7. Once updates, player one and two will MSAppAsyncOperation.