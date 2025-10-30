import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Weather Now App', () => {
  test('renders app heading and subtitle', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /weather now/i })).toBeInTheDocument();
    expect(screen.getByText(/your quick and easy weather checker/i)).toBeInTheDocument();
  });

  test('renders search form with input and button', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /get weather/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.type(input, 'New York');
    expect(input).toHaveValue('New York');
  });
});
