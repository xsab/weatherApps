import React from 'react';
import Weather from '/components/Weather';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
	state = {
		isLoading: true
	};

  componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.fetchWeather(position.coords.latitude, position.coords.longitude);
			},
			error => {
				this.setState({
					error: 'Error Getting Weather Conditions'
				});
			}
		);
	}

	fetchWeather(lat = 25, lon = 25) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(json => {
				this.setState({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					isLoading: false
				});
			});
	}

	render() {
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
				state = {
             isLoading: false,
             temperature: 0,
             weatherCondition: null,
	        	 error: null? 
            <Text>Fetching The Weather</Text> : <Weather />}
        ) : (
					<View>
						<Text>Minimalist Weather App</Text>
					</View>
				)
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
