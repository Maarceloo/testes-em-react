import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const functions = render(<Router history={ history }>{component}</Router>);
  return {
    history,
    ...functions,
  };
};
export default renderWithRouter;
