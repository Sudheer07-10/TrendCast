# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetStockByTicker*](#getstockbyticker)
  - [*GetWatchlist*](#getwatchlist)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*AddToWatchlist*](#addtowatchlist)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetStockByTicker
You can execute the `GetStockByTicker` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStockByTicker(vars: GetStockByTickerVariables): QueryPromise<GetStockByTickerData, GetStockByTickerVariables>;

interface GetStockByTickerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStockByTickerVariables): QueryRef<GetStockByTickerData, GetStockByTickerVariables>;
}
export const getStockByTickerRef: GetStockByTickerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStockByTicker(dc: DataConnect, vars: GetStockByTickerVariables): QueryPromise<GetStockByTickerData, GetStockByTickerVariables>;

interface GetStockByTickerRef {
  ...
  (dc: DataConnect, vars: GetStockByTickerVariables): QueryRef<GetStockByTickerData, GetStockByTickerVariables>;
}
export const getStockByTickerRef: GetStockByTickerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStockByTickerRef:
```typescript
const name = getStockByTickerRef.operationName;
console.log(name);
```

### Variables
The `GetStockByTicker` query requires an argument of type `GetStockByTickerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStockByTickerVariables {
  tickerSymbol: string;
}
```
### Return Type
Recall that executing the `GetStockByTicker` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStockByTickerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStockByTickerData {
  stocks: ({
    id: UUIDString;
    companyName: string;
    tickerSymbol: string;
    industry?: string | null;
    sector?: string | null;
  } & Stock_Key)[];
}
```
### Using `GetStockByTicker`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStockByTicker, GetStockByTickerVariables } from '@dataconnect/generated';

// The `GetStockByTicker` query requires an argument of type `GetStockByTickerVariables`:
const getStockByTickerVars: GetStockByTickerVariables = {
  tickerSymbol: ..., 
};

// Call the `getStockByTicker()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStockByTicker(getStockByTickerVars);
// Variables can be defined inline as well.
const { data } = await getStockByTicker({ tickerSymbol: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStockByTicker(dataConnect, getStockByTickerVars);

console.log(data.stocks);

// Or, you can use the `Promise` API.
getStockByTicker(getStockByTickerVars).then((response) => {
  const data = response.data;
  console.log(data.stocks);
});
```

### Using `GetStockByTicker`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStockByTickerRef, GetStockByTickerVariables } from '@dataconnect/generated';

// The `GetStockByTicker` query requires an argument of type `GetStockByTickerVariables`:
const getStockByTickerVars: GetStockByTickerVariables = {
  tickerSymbol: ..., 
};

// Call the `getStockByTickerRef()` function to get a reference to the query.
const ref = getStockByTickerRef(getStockByTickerVars);
// Variables can be defined inline as well.
const ref = getStockByTickerRef({ tickerSymbol: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStockByTickerRef(dataConnect, getStockByTickerVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.stocks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.stocks);
});
```

## GetWatchlist
You can execute the `GetWatchlist` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getWatchlist(): QueryPromise<GetWatchlistData, undefined>;

interface GetWatchlistRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetWatchlistData, undefined>;
}
export const getWatchlistRef: GetWatchlistRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWatchlist(dc: DataConnect): QueryPromise<GetWatchlistData, undefined>;

interface GetWatchlistRef {
  ...
  (dc: DataConnect): QueryRef<GetWatchlistData, undefined>;
}
export const getWatchlistRef: GetWatchlistRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWatchlistRef:
```typescript
const name = getWatchlistRef.operationName;
console.log(name);
```

### Variables
The `GetWatchlist` query has no variables.
### Return Type
Recall that executing the `GetWatchlist` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWatchlistData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetWatchlist`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWatchlist } from '@dataconnect/generated';


// Call the `getWatchlist()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWatchlist();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWatchlist(dataConnect);

console.log(data.watchlistItems);

// Or, you can use the `Promise` API.
getWatchlist().then((response) => {
  const data = response.data;
  console.log(data.watchlistItems);
});
```

### Using `GetWatchlist`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWatchlistRef } from '@dataconnect/generated';


// Call the `getWatchlistRef()` function to get a reference to the query.
const ref = getWatchlistRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWatchlistRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.watchlistItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.watchlistItems);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  username: string;
  email: string;
  passwordHash: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  passwordHash: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ username: ..., email: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  passwordHash: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ username: ..., email: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## AddToWatchlist
You can execute the `AddToWatchlist` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addToWatchlist(vars: AddToWatchlistVariables): MutationPromise<AddToWatchlistData, AddToWatchlistVariables>;

interface AddToWatchlistRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddToWatchlistVariables): MutationRef<AddToWatchlistData, AddToWatchlistVariables>;
}
export const addToWatchlistRef: AddToWatchlistRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addToWatchlist(dc: DataConnect, vars: AddToWatchlistVariables): MutationPromise<AddToWatchlistData, AddToWatchlistVariables>;

interface AddToWatchlistRef {
  ...
  (dc: DataConnect, vars: AddToWatchlistVariables): MutationRef<AddToWatchlistData, AddToWatchlistVariables>;
}
export const addToWatchlistRef: AddToWatchlistRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addToWatchlistRef:
```typescript
const name = addToWatchlistRef.operationName;
console.log(name);
```

### Variables
The `AddToWatchlist` mutation requires an argument of type `AddToWatchlistVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddToWatchlistVariables {
  stockId: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `AddToWatchlist` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddToWatchlistData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddToWatchlistData {
  watchlistItem_insert: WatchlistItem_Key;
}
```
### Using `AddToWatchlist`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addToWatchlist, AddToWatchlistVariables } from '@dataconnect/generated';

// The `AddToWatchlist` mutation requires an argument of type `AddToWatchlistVariables`:
const addToWatchlistVars: AddToWatchlistVariables = {
  stockId: ..., 
  notes: ..., // optional
};

// Call the `addToWatchlist()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addToWatchlist(addToWatchlistVars);
// Variables can be defined inline as well.
const { data } = await addToWatchlist({ stockId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addToWatchlist(dataConnect, addToWatchlistVars);

console.log(data.watchlistItem_insert);

// Or, you can use the `Promise` API.
addToWatchlist(addToWatchlistVars).then((response) => {
  const data = response.data;
  console.log(data.watchlistItem_insert);
});
```

### Using `AddToWatchlist`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addToWatchlistRef, AddToWatchlistVariables } from '@dataconnect/generated';

// The `AddToWatchlist` mutation requires an argument of type `AddToWatchlistVariables`:
const addToWatchlistVars: AddToWatchlistVariables = {
  stockId: ..., 
  notes: ..., // optional
};

// Call the `addToWatchlistRef()` function to get a reference to the mutation.
const ref = addToWatchlistRef(addToWatchlistVars);
// Variables can be defined inline as well.
const ref = addToWatchlistRef({ stockId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addToWatchlistRef(dataConnect, addToWatchlistVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.watchlistItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.watchlistItem_insert);
});
```

