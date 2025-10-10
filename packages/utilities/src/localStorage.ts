
import { decryptData, encryptData } from './decrypt'

export const getLocalStorageItem = <T,>(key: string, secretKey: string): T | null => {
    const cipher = localStorage.getItem(key)
    const decrypted = decryptData<string | null>(cipher, secretKey)
    if (decrypted === null) return null
    try {
        return JSON.parse(decrypted) as T
    } catch {
        // If not JSON, return as is
        return decrypted as unknown as T
    }
}

export const setLocalStorageItem = <T,>(key: string, value: T, secretKey: string) => {
    let toStore: string
    if (typeof value === 'object' && value !== null) {
        toStore = JSON.stringify(value)
    } else {
        toStore = String(value)
    }
    const cipher = encryptData(toStore, secretKey)
    localStorage.setItem(key, cipher)
}

export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key)
}