import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import cx from 'classnames';

const searchOptions = {
	componentRestrictions: {
		country: 'nz'
	},
	types: ['address']
};

class AddressFinder extends Component {
	constructor() {
		super();

		this.state = {
			selected: null,
			error: null,
			address: '',
			lat: false,
			lon: false
		};
	}

	static propTypes = {
		updateSelectedAddress: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		error: PropTypes.array,
		title: PropTypes.string
	};

	componentDidMount() {
		this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
	}

	render() {
		const { selected, address, error } = this.state;
		const { placeholder, nomargin, title } = this.props;
		const fieldTitle = title || 'address';

		return (
			<div className="addressfinder">
				<div className="addressfinder__form">
					<PlacesAutocomplete
						debounce={100}
						value={selected || address}
						searchOptions={searchOptions}
						onChange={this.handleChange}
						onSelect={this.handleSelect}>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
							<div className="addressfinder__fieldholder relative">
								<input
									{...getInputProps({
										id: fieldTitle,
										name: fieldTitle,
										className: cx('addressfinder__field', { 'addressfinder__field--nomargin': nomargin }),
										placeholder: placeholder || '',
										autoComplete: 'off'
									})}
								/>
								{error && <p className="addressfinder__error" dangerouslySetInnerHTML={{ __html: error }} />}
								<ul className="addressfinder__results">
									{loading && <li className="addressfinder__result">Loading...</li>}
									{this.renderSuggestions(suggestions, getSuggestionItemProps)}
								</ul>
							</div>
						)}
					</PlacesAutocomplete>
				</div>
				{this.renderErrorMessage()}
			</div>
		);
	}

	renderSuggestions(suggestions, getSuggestionItemProps) {
		return suggestions.map(suggestion => {
			const className = suggestion.active ? 'addressfinder__result addressfinder__result--active' : 'addressfinder__result';

			return (
				<li {...getSuggestionItemProps(suggestion, {
					className
				})}>
					<span>{suggestion.description}</span>
				</li>
			);
		});
	}

	renderErrorMessage() {
		const { title, errors } = this.props;

		if (!errors) {
			return false;
		}

		// Check if the field is erroring
		const currentErrors = errors.filter(error => error.field === title);

		return !!currentErrors.length && <p className="error">{currentErrors[0].message}</p>;
	}

	handleChange = (address) => {
		this.setState({
			address: address,
			selected: null
		});
	};

	handleSelect = (selected, placeId) => {
		if (!selected) {
			return false;
		}

		this.props.onChange(selected);

		this.placesService.getDetails({ placeId }, (result) => {
			this.setState({
				lat: result.geometry.location.lat(),
				lon: result.geometry.location.lng(),
				selected: selected
			});

			this.props.updateSelectedAddress(this.state)
		})
	};
}

export default AddressFinder
