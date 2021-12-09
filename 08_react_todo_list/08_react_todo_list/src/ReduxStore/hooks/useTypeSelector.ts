import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypeSelector;
