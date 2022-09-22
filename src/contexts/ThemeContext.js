import React from 'react'

const ThemeContext = React.createContext({
	theme: 'dark',
	setTheme: () => {},
})

export default ThemeContext
