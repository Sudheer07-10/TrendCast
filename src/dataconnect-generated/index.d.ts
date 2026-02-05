import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddToWatchlistData {
  watchlistItem_insert: WatchlistItem_Key;
}

export interface AddToWatchlistVariables {
  stockId: UUIDString;
  notes?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  passwordHash: string;
}

export interface GetStockByTickerData {
  stocks: ({
    id: UUIDString;
    companyName: string;
    tickerSymbol: string;
    industry?: string | null;
    sector?: string | null;
  } & Stock_Key)[];
}

export interface GetStockByTickerVariables {
  tickerSymbol: string;
}

export interface GetWatchlistData {
  watchlistItems: ({
    stock: {
      id: UUIDString;
      tickerSymbol: string;
      companyName: string;
    } & Stock_Key;
      notes?: string | null;
      addedAt: TimestampString;
  })[];
}

export interface NewsArticle_Key {
  id: UUIDString;
  __typename?: 'NewsArticle_Key';
}

export interface Prediction_Key {
  id: UUIDString;
  __typename?: 'Prediction_Key';
}

export interface Stock_Key {
  id: UUIDString;
  __typename?: 'Stock_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WatchlistItem_Key {
  userId: UUIDString;
  stockId: UUIDString;
  __typename?: 'WatchlistItem_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetStockByTickerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStockByTickerVariables): QueryRef<GetStockByTickerData, GetStockByTickerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStockByTickerVariables): QueryRef<GetStockByTickerData, GetStockByTickerVariables>;
  operationName: string;
}
export const getStockByTickerRef: GetStockByTickerRef;

export function getStockByTicker(vars: GetStockByTickerVariables): QueryPromise<GetStockByTickerData, GetStockByTickerVariables>;
export function getStockByTicker(dc: DataConnect, vars: GetStockByTickerVariables): QueryPromise<GetStockByTickerData, GetStockByTickerVariables>;

interface AddToWatchlistRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddToWatchlistVariables): MutationRef<AddToWatchlistData, AddToWatchlistVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddToWatchlistVariables): MutationRef<AddToWatchlistData, AddToWatchlistVariables>;
  operationName: string;
}
export const addToWatchlistRef: AddToWatchlistRef;

export function addToWatchlist(vars: AddToWatchlistVariables): MutationPromise<AddToWatchlistData, AddToWatchlistVariables>;
export function addToWatchlist(dc: DataConnect, vars: AddToWatchlistVariables): MutationPromise<AddToWatchlistData, AddToWatchlistVariables>;

interface GetWatchlistRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetWatchlistData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetWatchlistData, undefined>;
  operationName: string;
}
export const getWatchlistRef: GetWatchlistRef;

export function getWatchlist(): QueryPromise<GetWatchlistData, undefined>;
export function getWatchlist(dc: DataConnect): QueryPromise<GetWatchlistData, undefined>;

