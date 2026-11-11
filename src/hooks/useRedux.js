import { useDispatch, useSelector } from 'react-redux';

// Single import point so it is easy to swap or extend later.
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
