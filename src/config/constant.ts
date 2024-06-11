import { Dimensions } from 'react-native';

export const DAYS_IN_WEEK = 7;

export const BOX = {
	MARGIN: 20,
	PADDING: 20,
	BORDER_RADIUS: 5,
};

export const NUMBER = {
	SIZE: 40,
	MARGIN: 3,
};

export const ICON = {
	SIZE: 15,
	MARGIN: 15,
};

export const MODAL = {
	DATE_PICKER: {
		WIDTH: Dimensions.get('window').width - 50,
		HEIGHT: 280,
		PADDING: 5,
		DAYS_OF_WEEK: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		YEARS: [
			2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
			2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041,
			2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050,
		],
		YEARS_IN_ROW: 4,
	},
	TIME_PICKER: {
		WIDTH: Dimensions.get('window').width - 50,
	},
};
