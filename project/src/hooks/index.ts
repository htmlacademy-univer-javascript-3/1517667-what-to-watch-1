import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '../store/api-actions';
import { State } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
