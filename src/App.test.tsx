import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { HomeScreen } from 'src/screens/home/home.screen';

test('renders learn react link', async () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomeScreen />
      </BrowserRouter>
    </Provider>,
  );
  expect(screen.getByTitle('test-case-goes-here')).toHaveClass('show-filters');
});
