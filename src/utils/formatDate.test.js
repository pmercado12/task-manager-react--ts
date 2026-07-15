import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'
 
describe('formatDate', () => {
  it('acepta una fecha valida', () => {
    // Arrange
    const fecha = '2026-07-10 21:30:05'
    // Act
    const resultado = formatDate(fecha)
    // Assert
    expect(resultado).toBe('10/07/2026 21:30:05')
  })
 
  it('rechaza una cadena vacia', () => {
    // Arrange
    const fecha = ''
    // Act
    const resultado = formatDate(fecha)
    // Assert
    expect(resultado).toBe('Fecha no disponible')
  })
})