const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // whenever the input field is change, the function below will run
    // this function will update the state
  handleChange(event) {
    const value = event.target.value;
    this.setState(() => ({ username: value }))
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    // Get all state and prop perperties
    const { username } = this.state
    const { label } = this.props


    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };
    // 'this' keyword inside 'handleSubmit' function is always going to be referenced in the instance
    // this line allows us to do that.
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(id, username) {
    // arrow function and return an object
    this.setState(() => ({
      [id + 'Name']: username,
      // String Concatenation 
      [id + 'Image']:`https://github.com/${username}.png?size=200`
    }))
  }
  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: ''
    }))
  }
  render() {
    const { match } = this.props
    // Destructuring
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
                <button
                  className='reset'
                  onClick={() => this.handleReset('playerOne')}>
                    Reset
                </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
                <button
                  className='reset'
                  onClick={() => this.handleReset('playerTwo')}>
                    Reset
                </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
              Battle
          </Link>}
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