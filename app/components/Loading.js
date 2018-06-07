import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: "center",
        fontSize: "35px"
    }
};

class Loading extends React.Component {
    static propTypes = {
        speed: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    };
    
    // If text is not specified, whenever someone uses the Loading component, then go ahead and load "Loading below"
    static defaultProps = {
        text: "Loading",
        speed: 300
    }

    // why props....here?
    // i dont understand... what?

    state = {
        text: this.props.text
    }
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         text: props.text
    //       };

    // }
    componentDidMount() {
        // Destructure
        const { text, speed } = this.props
        const stopper = text + '...';
        this.interval = window.setInterval(() => {
            // Conditional (ternary) Operator
            (this.state.text === stopper)
                ? this.setState(() => ({ text: text }))
                : this.setState((prevState) => ({text: prevState.text + '.'}))
        }, speed)
        // Take out .bind(this) because we no loger are creating a new context
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



export default Loading;