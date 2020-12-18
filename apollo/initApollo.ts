import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from '../config/config'
import ErrorHandler from './errorHandler';
import { initCache } from './caching';

let globalApolloClient = null

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export default function initApolloClient(initialState?: any) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return _createApolloClient(initialState)
    }

    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = _createApolloClient(initialState)
    }

    return globalApolloClient
}

function _makeClientSideLink(API_URL: string) {
    const httpLink = new HttpLink({
        uri: `${API_URL}`,
        credentials: "same-origin"
    });

    return httpLink;
}

/**
* Creates and configures the ApolloClient
* @param  {Object} [initialState={}]
*/
function _createApolloClient(initialState = {}) {
    const ssrMode = typeof window === 'undefined'

    let cache = initCache(initialState);

    const MAIN_URL = API_URL;
    if (!MAIN_URL) {
        throw new Error("API_URL envvar is not set");
    }

    // Check out https://github.com/vercel/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode,
        link: ApolloLink.from([ErrorHandler(), _makeClientSideLink(API_URL)]),
        cache
    });
}



// function createIsomorphLink() {
//   if (typeof window === 'undefined') {
//     const { SchemaLink } = require('apollo-link-schema')
//     const { schema } = require('./schema')
//     return new SchemaLink({ schema })
//   } else {
//     const { HttpLink } = require('apollo-link-http')
//     return new HttpLink({
//       uri: API_URL,
//       credentials: 'same-origin',
//     })
//   }
// }