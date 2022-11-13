import { createAction } from '@reduxjs/toolkit';

export const changeGenreAction = createAction('CHANGE_GENRE', (value: string) => ({ payload: value }));
export const turnToNextPage = createAction('NEXT_PAGE');
