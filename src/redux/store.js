import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import menuReducer from './menuSlice'
import orderReducer from './orderSlice'
import authReducer from './authSlice'

// [E. Redux Toolkit : configureStore & Middleware] :
// Hna configureStore kat-jm3 ga3 les reducers (cart, menu, order, auth) f un seul store unique global.
// Kat-remplaci createStore() d Redux classique li wlat dépréciée.

// Middleware Logger (équivalent à redux-logger) :
// Hada middleware ki-t-interposa bin l'action li t-declenchat w le reducer.
// F l'environnement de développement (DEV), ki-affichi f la console b l-alwan:
// - L'action li t-declenchat m3a le payload
// - L'état dyal l-store 9bl ma t-t-appliqua l'action (Previous State)
// - L'état dyal l-store b3d ma t-appliquat l'action (Next State)
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (import.meta.env.DEV) {
    console.groupCollapsed(`%c[Redux Action] ${action.type}`, 'color: #ea580c; font-weight: bold;')
    console.log('%cPayload:', 'color: #3b82f6;', action.payload)
    console.log('%cPrevious State:', 'color: #94a3b8;', storeAPI.getState())
    const result = next(action)
    console.log('%cNext State:', 'color: #10b981; font-weight: bold;', storeAPI.getState())
    console.groupEnd()
    return result
  }
  return next(action)
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    order: orderReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
})

export default store
