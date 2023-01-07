import { Action } from 'redux';
import { getApi } from '../api';
import { State } from '../types/state';
import { AuthData } from '../types/AuthData';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  setInitFilmsInfo,
  setPromoFilmInfo,
  fetchFilmAction,
  fetchSimilarAction,
  fetchReviewsAction,
  addReviewAction,
  getFavoriteFilmsAction,
  changeFilmFavoriteStatus
} from './api-actions';
import { redirectToRoute } from './action';
import { SendComment } from '../types/SendComment';
import { FavoriteStatsData } from '../types/FavoriteStatusData';
import { makeFakeFilm, makeFakeFilms, makeFakeCommentsInfo } from '../utils/mocks';

describe('Async actions', () => {
  const api = getApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = makeFakeFilm();
  const mockFilms = makeFakeFilms();
  const mockReviews = makeFakeCommentsInfo();

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost('/login')
      .reply(200, { token: 'secret' });


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('Auth-Token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('Auth-Token');
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(setInitFilmsInfo());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      setInitFilmsInfo.pending.type,
      setInitFilmsInfo.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(setPromoFilmInfo());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      setPromoFilmInfo.pending.type,
      setPromoFilmInfo.fulfilled.type
    ]);
  });

  it('should fetch film film when GET /films/{id}', async () => {
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarAction('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews.comments);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData: SendComment = {
      filmId: 1,
      comment: 'comment',
      rating: 8
    };

    mockAPI
      .onPost(`/comments/${postData.filmId}`, {
        comment: postData.comment,
        rating: postData.rating
      })
      .reply(200);

    const store = mockStore();

    await store.dispatch(addReviewAction(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      redirectToRoute.type,
      addReviewAction.fulfilled.type
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(getFavoriteFilmsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFavoriteFilmsAction.pending.type,
      getFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('POST /favorite/{filmId}/{status}', async () => {
    const postData: FavoriteStatsData = {
      filmId: 1,
      status: 1
    };

    mockAPI
      .onPost('/favorite/1/1')
      .reply(200);

    const store = mockStore();

    await store.dispatch(changeFilmFavoriteStatus(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      changeFilmFavoriteStatus.pending.type,
      changeFilmFavoriteStatus.fulfilled.type
    ]);
  });
});
