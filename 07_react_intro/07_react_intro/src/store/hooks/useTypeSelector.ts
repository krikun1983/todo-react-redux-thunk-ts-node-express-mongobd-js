import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../types/root-state';

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypeSelector;
