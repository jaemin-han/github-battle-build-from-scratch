var React = require('react');
var PropTypes = require('prop-types');

class SelectLanguage extends React.Component {
    render() {
        var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <ul className="languages">
                {/* <p>Selected Language: {this.state.selectedLanguage}</p> */}
                {languages.map((lang) => {
                    return (
                        <li 
                            style={lang === this.props.selectedLanguage ? {color: 'tomato'}: null}
                            onClick={this.props.onSelect.bind(null, lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
        )
    }
} 

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedLanguage: 'All'
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang
            }
        });
    }
    render() {
        
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} 
                />
            </div>
        )
    }
}

module.exports = Popular;