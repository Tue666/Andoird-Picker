import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme.context';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
