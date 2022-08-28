# Redux

<details>
    <summary>Redux</summary>

<details>
  <summary>If State Management Tool (such as <code>Redux</code>) is not used. (Click) </summary>

### A Single State
<p align="center">
    <img src="./images/SingleState-StateManagement.jpg" alt=" A Single State" width="460">
</p>

 * ### Props Drilling
    <p align="center">
        <img src="./images/PropsDrilling.png" alt="Props Drilling" width="460">
    </p>

### Components Managing Their Own State
<p align="center">
    <img src="./images/ComponentsManagingTheirOwnState.png" alt="Props Drilling" width="460">
</p>

</details>

## The Redux Store
<p align="center">
    <img src="./images/redux-store.jpg" alt="The Redux Store" width="420"/>
</p>

Redux is a global state (`Store`) with ***strict rules*** (these rules enforced by something called `Actions` and processed by `Reducers` and update the `Store`)

Example Redux Store:
```json
{
    currentUser: {
        isLoggedIn,
        username,
        name,
        age,
        bio
    }
    users: { ... },
    products: [ ... ],
    articles: [ ... ]
    ...
}
```

## Redux Actions
Redux Actions - are json objects consisting of two things, `type` (naming the action), and `payload` (additional data)

Example of Redux Actions: 
1. type: `USER_DATA_LOADED` with payload: the actual user data fetched from server
2. type: `ITEM_ADDED_TO_CART` with payload: the id of the item that users added to their shopping cart

## Redux Reducers
Redux's way of specifying what should happen to our `Redux Store` (central state), when a given **action** occurs.

<p align="center">
    <img src="./images/ReduxReducer.png" alt="Redux Reducers" width="420"/>
</p>

## Unidirectional Data Flow

<p>
    <img src="./images/UnidirectionalFlow.jpg" alt="Unidirectional Data Flow" />
</p>

> <h3>Components can only interact with the state by triggering Redux actions</h3>

</details>

---

# Redux Thunk

<details>
    <summary>Redux Thunk</summary>

> Even with Redux in place the components still have to contain the logic for doing all the asynchronous operations, such as fetching or updating server data. These sorts of operations are called <b><code>side effects</code></b>

### Redux Thunk Work Flow
<p align="center">
    <img src="./images/reduxThunkWorkFlow.png" alt="Redux Thunk Work Flow" />
</p>

<p align="center">
    <img src="./images/reduxthunkflow.png" alt="Redux Thunk Flow" />
</p>

```js
        // instead of passing action to dispatch for example:
            dispatch({ type, action });

        // with redux thunk you can pass a asynchronous function
            dispatch(async () => {
                ...
                dispatch(loadUserSuccess(user));    // dispatches action
                dispatch(loadVideos());             // dispatches action
                dispatch(async () => { ... });      // dispatches thunk
            });
```

<p align="center">
    <img src="./images/seperation_of_concern_sop.png" alt="Seperation of Concern" />
</p>

</details>
