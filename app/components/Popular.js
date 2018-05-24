var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {/* <p>Selected Language: {this.state.selectedLanguage}</p> */}
            {languages.map((lang) => {
                return (
                    <li 
                        style={lang === props.selectedLanguage ? {color: 'tomato'}: null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login} />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>@{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    // invoked by react whenever a component mounts to the screen (shown)
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        //AJAX
        api.fetchPopularRepos(lang)
            .then(function(repos) {
                // console.log(repos)
                this.setState(function() {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
        }
    render() {
        
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} 
                />
                {/* {JSON.stringify(this.state.repos, 2, null)} */}
                {!this.state.repos
                    ? <Loading />
                    : <RepoGrid repos={this.state.repos} /> }
                
            </div>
        )
    }
}

module.exports = Popular;