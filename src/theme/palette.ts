const PRIMARY = {
	main: '#42A5F5',
	contrastText: '#040409',
};

const COMMON = {
	primary: { ...PRIMARY },
};

const palette = {
	light: {
		background: '#111010',
		paper: '#2F2F2F',
		text: '#DDDDDD',
		outline: '#CACBCB',
		...COMMON,
	},
};

export default palette;
