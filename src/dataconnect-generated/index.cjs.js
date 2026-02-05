const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'redesignwireframerequest',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getStockByTickerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStockByTicker', inputVars);
}
getStockByTickerRef.operationName = 'GetStockByTicker';
exports.getStockByTickerRef = getStockByTickerRef;

exports.getStockByTicker = function getStockByTicker(dcOrVars, vars) {
  return executeQuery(getStockByTickerRef(dcOrVars, vars));
};

const addToWatchlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddToWatchlist', inputVars);
}
addToWatchlistRef.operationName = 'AddToWatchlist';
exports.addToWatchlistRef = addToWatchlistRef;

exports.addToWatchlist = function addToWatchlist(dcOrVars, vars) {
  return executeMutation(addToWatchlistRef(dcOrVars, vars));
};

const getWatchlistRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWatchlist');
}
getWatchlistRef.operationName = 'GetWatchlist';
exports.getWatchlistRef = getWatchlistRef;

exports.getWatchlist = function getWatchlist(dc) {
  return executeQuery(getWatchlistRef(dc));
};
