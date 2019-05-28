import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import MovieCard from 'components/MovieCard';
import DropDown from 'components/DropDown';

const options = [
  { placeName: 'Monterrey Centro', id: 'monterrey-centro' },
  { placeName: 'Monterrey Norte', id: 'monterrey-norte' },
  { placeName: 'Monterrey Oriente', id: 'monterrey-oriente' },
  { placeName: 'Monterrey Sur', id: 'monterrey-sur' },
];

export default class MainScreen extends Component {
  static propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  constructor (props) {
    super(props);
    this.renderMovieCard = this.renderMovieCard.bind(this);
    this.onSelectPlace = this.onSelectPlace.bind(this);
  }

  onSelectPlace (placeId) {
    const { fetchMovies } = this.props;

    if (placeId) fetchMovies(placeId);
  }

  renderMovieCard () {
    const { movies, navigation } = this.props;

    if (!movies.length) return <Text>Sin Resultados</Text>;

    return movies.map(movie => (
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetails', { key: movie.key })}
        key={movie.key}
      >
        <MovieCard
          image={movie.image}
          title={movie.title}
          score={movie.score}
        />
      </TouchableOpacity>
    ));
  }

  render () {
    const movies = this.renderMovieCard();

    return (
      <View>
        <Header centerComponent={{ text: 'Selecciona tu pelicula', style: { color: '#fff' } }} />
        <DropDown options={options} onChange={this.onSelectPlace} />
        <ScrollView>
          <View>
            {movies}
          </View>
        </ScrollView>
      </View>
    );
  }
}
