import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '../store/api-actions';
import { IState } from '../reducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
