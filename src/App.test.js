import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');

test('renders Huddo Boards Services List', () => {
  render(<App />);
  const titleElement = screen.getByText(/Huddo Boards Services List/i);
  expect(titleElement).toBeInTheDocument();
});

test('fetches and displays data', async () => {
  const products = [{ name: 'Service 1', version: '1.0' }, { name: 'Service 2', version: '2.0' }];
  axios.get.mockResolvedValue({ data: products });
  render(<App />);
  const firstItem = await screen.findByText('Service 1');
  expect(firstItem).toBeInTheDocument();
  expect(screen.getByText('Service 2')).toBeInTheDocument();
});

test('displays an error message if the fetch fails', async () => {
  axios.get.mockRejectedValue(new Error('Failed to fetch'));
  render(<App />);
  const errorMessage = await screen.findByText(/Failed to fetch data/i);
  expect(errorMessage).toBeInTheDocument();
});

test('filters products based on search', async () => {
  axios.get.mockResolvedValue({ data: [{ name: 'Service 1', version: '1.0' }, { name: 'Service 2', version: '2.0' }] });
  render(<App />);
  userEvent.type(screen.getByPlaceholderText(/Search here/i), 'Service 1');
  expect(await screen.findByText('Service 1')).toBeInTheDocument();
  expect(screen.queryByText('Service 2')).not.toBeInTheDocument();
});
