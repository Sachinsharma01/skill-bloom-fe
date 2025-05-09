import { makeAPICall } from './api'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const validateUserName = (username: string) => {
  if (username.length < 3) {
    return 'Username must be at least 3 characters long'
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters long'
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return 'Username must contain only letters and numbers'
  }

  if (username.includes(' ')) {
    return 'Username cannot contain spaces'
  }

  return makeAPICall('username', { username })
}

export const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined
}

export const isMobileDevice = () => {
  return window.innerWidth < 768
}

export const isTabletDevice = () => {
  return window.innerWidth >= 768 && window.innerWidth <= 1024
}

export const secondsToHoursOrMinutes = (seconds: number) => {
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} min`
  }
  return `${Math.floor(seconds / 3600)} hr`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateOrderId = () => {
  return Math.floor(Math.random() * 10000)
}