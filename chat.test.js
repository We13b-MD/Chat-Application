// Room.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Room from './Room';

test('it should render messages', () => {
  const messages = [
    {
      $id: '1',
      username: 'User1',
      $createdAt: new Date().getTime(),
      body: 'Message 1',
    },
    {
      $id: '2',
      username: 'User2',
      $createdAt: new Date().getTime(),
      body: 'Message 2',
    },
  ];

  render(<Room />);
  
  // Mock the state update for messages
  const setMessages = jest.fn();
  jest.spyOn(React, 'useState').mockImplementation(() => [messages, setMessages]);

  // Assert that messages are rendered
  for (const message of messages) {
    const usernameElement = screen.getByText(message.username);
    const bodyElement = screen.getByText(message.body);
    expect(usernameElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  }
})


