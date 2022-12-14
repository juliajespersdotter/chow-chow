import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import AuthContextProvider from './contexts/AuthContext'
import App from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2, // 2 minutes
			cacheTime: 1000 * 60 * 60 * 4, // 4 hours
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
					<AuthContextProvider>
						<App />
					</AuthContextProvider>
				</Wrapper>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
