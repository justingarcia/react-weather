var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var OpenWeatherMap = require('OpenWeatherMap');

var Weather = React.createClass({

    getInitialState: function() {
        return {
            isLoading: false,
        };
    },

    handleSearch: function(location) {
        var that = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined,
        });

        OpenWeatherMap.getTemp(location).then(function(temp) {
            that.setState({
                location: location,
                temp: temp,
                isLoading: false,
            });
        }, function(err) {
            that.setState({
                isLoading: false,
                errorMessage: err,
            });
        });
    },

    render: function() {
        var {location, temp, isLoading, errorMessage} = this.state;

        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (location && temp) {
                return <WeatherMessage location={ location } temp={ temp }/>;
            }
        }

        function renderError() {
            if(typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={ errorMessage }/>
                );
            }
        }

        return(
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={ this.handleSearch }/>
                { renderMessage() }
                { renderError() }
            </div>
        );
    },

});

module.exports = Weather;