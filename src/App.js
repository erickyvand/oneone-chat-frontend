import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Chat from './components/messages/Chat';
import store from './redux/store';
import NavBar from './components/NavBar';

function App() {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);

	const setUpSocket = () => {
		const token = sessionStorage.getItem('token');

		if (token && !socket) {
			const newSocket = io(process.env.REACT_APP_API_URL, {
				query: { id: sessionStorage.getItem('id') },
			});

			newSocket.on('disconnect', () => {
				setSocket(null);
				setTimeout(setUpSocket, 3000);
			});

			newSocket.on('connect', () => {
				console.log('Socket connected');

				newSocket.emit('user_connected', {
					id: sessionStorage.getItem('id'),
					fullName: sessionStorage.getItem('fullname'),
				});

				newSocket.on('display_messages', data => {
					setMessages(data);
				});
			});
			setSocket(newSocket);
		}
	};

	useEffect(() => {
		setUpSocket();
	}, []);

	return (
		<Router>
			<Provider store={store}>
				{sessionStorage.getItem('token') ? <NavBar /> : ''}
				<Switch>
					<Route path='/' exact component={Signup} />
					<Route
						path='/login'
						exact
						render={() => <Login setUpSocket={setUpSocket} />}
					/>
					<Route
						path='/chat'
						exact
						render={() => <Chat socket={socket} messages={messages} />}
					/>
				</Switch>
			</Provider>
		</Router>
	);
}

export default App;
