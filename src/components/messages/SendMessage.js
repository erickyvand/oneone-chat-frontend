/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SendMessage = ({ receiverId, socket }) => {
	const sentMessage = useSelector(state => state.message);

	const [message, setMessage] = useState('');
	const handleSubmit = () => {
		socket.emit('send_message', { receiverId, message });
		setMessage('');
	};

	return (
		<div className='cell'>
			<textarea
				className='send-msg-input'
				onChange={e => setMessage(e.target.value)}
				value={message}
				placeholder='Type a message...'
			/>
			<button
				className={
					receiverId === undefined || !message || sentMessage.loading
						? 'disabled-btn-msg'
						: 'btn-msg'
				}
				disabled={receiverId === undefined || !message || sentMessage.loading}
				onClick={handleSubmit}
			>
				{sentMessage.loading ? 'Processing...' : 'Send'}
			</button>
		</div>
	);
};

export default SendMessage;
