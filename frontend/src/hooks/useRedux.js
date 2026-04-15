/**
 * Typed Redux Hooks
 * Type-safe hooks for useSelector and useDispatch
 */

import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
