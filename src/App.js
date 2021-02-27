import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import store from './redux/store';

function App() {
	const [socket, setSocket] = useState(null);

	const setUpSocket = () => {
		const token = sessionStorage.getItem('token');
		if (!socket) {
			const newSocket = io(process.env.REACT_APP_API_URL);

			newSocket.on('disconnect', () => {
				setSocket(null);
				setTimeout(setUpSocket, 3000);
			});

			newSocket.on('connect', () => {
				console.log('Socket connected');
			});
			setSocket(newSocket);
		}
	};

	useEffect(() => {
		// setUpSocket();
	}, []);

	return (
		<Router>
			<Provider store={store}>
				<Switch>
					<Route path='/' exact component={Signup} />
					<Route path='/login' exact component={Login} />
				</Switch>
			</Provider>
		</Router>
	);
}

export default App;
