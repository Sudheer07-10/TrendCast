import { CreateUserData, CreateUserVariables, GetStockByTickerData, GetStockByTickerVariables, AddToWatchlistData, AddToWatchlistVariables, GetWatchlistData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetStockByTicker(vars: GetStockByTickerVariables, options?: useDataConnectQueryOptions<GetStockByTickerData>): UseDataConnectQueryResult<GetStockByTickerData, GetStockByTickerVariables>;
export function useGetStockByTicker(dc: DataConnect, vars: GetStockByTickerVariables, options?: useDataConnectQueryOptions<GetStockByTickerData>): UseDataConnectQueryResult<GetStockByTickerData, GetStockByTickerVariables>;

export function useAddToWatchlist(options?: useDataConnectMutationOptions<AddToWatchlistData, FirebaseError, AddToWatchlistVariables>): UseDataConnectMutationResult<AddToWatchlistData, AddToWatchlistVariables>;
export function useAddToWatchlist(dc: DataConnect, options?: useDataConnectMutationOptions<AddToWatchlistData, FirebaseError, AddToWatchlistVariables>): UseDataConnectMutationResult<AddToWatchlistData, AddToWatchlistVariables>;

export function useGetWatchlist(options?: useDataConnectQueryOptions<GetWatchlistData>): UseDataConnectQueryResult<GetWatchlistData, undefined>;
export function useGetWatchlist(dc: DataConnect, options?: useDataConnectQueryOptions<GetWatchlistData>): UseDataConnectQueryResult<GetWatchlistData, undefined>;
