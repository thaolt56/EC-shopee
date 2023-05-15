import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

export const registerAcount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

export const loginAcount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
export const logout = () => http.post('/logout')
