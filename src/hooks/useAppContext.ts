import {useContext} from 'react';
import {Context} from '../context/AppContext';

export const useAppContext = () => useContext(Context);
