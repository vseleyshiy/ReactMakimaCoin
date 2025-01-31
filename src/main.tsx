import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './components/App'
import { Boost } from './components/Boost/Boost'
import { Earn } from './components/Earn/Earn'
import { Auth } from './components/Forms/Auth/Auth'
import { Reg } from './components/Forms/Reg/Reg'
import { Buttons } from './components/Home/Buttons/Buttons'
import { RMC_PAGES } from './config/pages-url.config'
import './index.css'
import { UserProvider } from './UserContext'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(rootElement).render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route path={RMC_PAGES.HOME} element={<App />} />
						<Route path={RMC_PAGES.BOOST} element={<Boost />} />
						<Route path={RMC_PAGES.EARN} element={<Earn />} />
					</Route>
					<Route path={RMC_PAGES.AUTH} element={<Auth />} />
					<Route path={RMC_PAGES.REG} element={<Reg />} />
				</Routes>
				<Buttons />
			</BrowserRouter>
		</UserProvider>
		<Toaster />
	</QueryClientProvider>
)
