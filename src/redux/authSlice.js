import { createSlice } from '@reduxjs/toolkit'

// Récupérer l'utilisateur sauvegardé dans localStorage (persistance de session)
const savedUser = JSON.parse(localStorage.getItem('tiremt_user'))

const initialState = {
  user: savedUser || null,
  isAuthenticated: !!savedUser,
  error: null,
}

// [Auth Slice] : Gère l'état d'authentification (user, isAuthenticated, error)
// Les actions : login, register, logout, clearError
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login : Sauvegarde l'utilisateur et met isAuthenticated à true
    login(state, action) {
      const { email, password } = action.payload
      // Récupérer les utilisateurs enregistrés depuis localStorage
      const users = JSON.parse(localStorage.getItem('tiremt_users') || '[]')
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      )

      if (foundUser) {
        const { password: _pw, ...userWithoutPassword } = foundUser
        state.user = userWithoutPassword
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem(
          'tiremt_user',
          JSON.stringify(userWithoutPassword),
        )
      } else {
        state.error = 'Email ou mot de passe incorrect.'
      }
    },

    // Register : Crée un nouveau compte et connecte l'utilisateur
    register(state, action) {
      const { nom, email, password } = action.payload
      const users = JSON.parse(localStorage.getItem('tiremt_users') || '[]')

      // Vérifier si l'email existe déjà
      const existingUser = users.find((u) => u.email === email)
      if (existingUser) {
        state.error = 'Un compte avec cet email existe déjà.'
        return
      }

      const newUser = {
        id: Date.now().toString(),
        nom,
        email,
        createdAt: new Date().toISOString(),
      }

      // Sauvegarder avec le mot de passe dans la liste des users
      users.push({ ...newUser, password })
      localStorage.setItem('tiremt_users', JSON.stringify(users))

      // Connecter immédiatement (sans mot de passe dans le state)
      state.user = newUser
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('tiremt_user', JSON.stringify(newUser))
    },

    // Logout : Réinitialise l'état d'auth et supprime la session
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('tiremt_user')
    },

    // Clear Error : Efface les messages d'erreur
    clearError(state) {
      state.error = null
    },
  },
})

export const { login, register, logout, clearError } = authSlice.actions

// Selectors
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
