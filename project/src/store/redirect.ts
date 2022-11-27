import { browserHistory } from '../browser-history';
import { Middleware } from 'redux';
import { updateStore } from '../reducer';

type Reducer = ReturnType<typeof updateStore>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'REDIRECT_TO_ROUTE') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
