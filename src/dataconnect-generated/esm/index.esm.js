import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'redesignwireframerequest',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getStockByTickerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStockByTicker', inputVars);
}
getStockByTickerRef.operationName = 'GetStockByTicker';

export function getStockByTicker(dcOrVars, vars) {
  return executeQuery(getStockByTickerRef(dcOrVars, vars));
}

export const addToWatchlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddToWatchlist', inputVars);
}
addToWatchlistRef.operationName = 'AddToWatchlist';

export function addToWatchlist(dcOrVars, vars) {
  return executeMutation(addToWatchlistRef(dcOrVars, vars));
}

export const getWatchlistRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWatchlist');
}
getWatchlistRef.operationName = 'GetWatchlist';

export function getWatchlist(dc) {
  return executeQuery(getWatchlistRef(dc));
}

