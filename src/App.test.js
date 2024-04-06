import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const renderApp = () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
};

test('renders Bank of Eden title', () => {
  renderApp();
  const titleElement = screen.getByText(/Bank of Eden/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Chores component', () => {
  renderApp();
  const choresElement = screen.getByTestId('chores-component');
  expect(choresElement).toBeInTheDocument();
});

test('renders UpcomingBills component', () => {
  renderApp();
  const upcomingBillsElement = screen.getByTestId('upcoming-bills-component');
  expect(upcomingBillsElement).toBeInTheDocument();
});

test('renders Transactions component', () => {
  renderApp();
  const transactionsElement = screen.getByTestId('transactions-component');
  expect(transactionsElement).toBeInTheDocument();
});

test('renders Wallet component', () => {
  renderApp();
  const walletElement = screen.getByTestId('wallet-component');
  expect(walletElement).toBeInTheDocument();
});
