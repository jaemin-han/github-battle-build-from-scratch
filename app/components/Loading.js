var React = require("react");
var PropTypes = require("prop-types");

var styles = {
    content: {
        textAlign: "center",
        fontSize: "35px"
    }
};

class Loading extends React.Component {
    constructor() {
        super();

        this.state = {
            text: props.text
        };

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
    text: PropTypes.string.isRequired
}

// If text is not specified, whenever someone uses the Loading component, then go ahead and load "Loading below"
Loading.defaultProps = {
    text: "Loading"
}

module.exports =  Loading;