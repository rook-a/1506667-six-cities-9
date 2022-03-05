import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
