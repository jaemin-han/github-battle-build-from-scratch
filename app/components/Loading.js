var React = require("react");
var PropTypes = require("prop-types");

var styles = {
    content: {
        textAlign: "center",
        fontSize: "35px"
    }
};

class Loading extends React.Component {
    // why props....here?
    // i dont understand... what?
    constructor(props) {
        super(props);

        this.state = {
            text: props.text
          };

    }
    componentDidMount() {
        var stopper = this.props.text + '...';
        this.interval = window.setInterval(function () {
          if (this.state.text === stopper) {
            this.setState(function () {
              return {
                text: this.props.text
              }
            })
          } else {
            this.setState(function (prevState) {
              return {
                text: prevState.text + '.'
              }
            });
          }
        }.bind(this), this.props.speed)
      }
    componentWillUnmount() {
        console.log('Clear The Interval');
        window.clearInterval(this.interval)
    }
    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    speed: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

// If text is not specified, whenever someone uses the Loading component, then go ahead and load "Loading below"
Loading.defaultProps = {
    text: "Loading",
    speed: 300
}

module.exports =  Loading;