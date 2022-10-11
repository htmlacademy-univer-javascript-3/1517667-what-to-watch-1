import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundError() {
  return (
    <React.Fragment>
      <h1>404 Not Found</h1>
      <Link to="/">Return to main page</Link>
    </React.Fragment>
  );
}
