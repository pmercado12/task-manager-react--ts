import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskInput from './TaskInput'
 
describe('TaskInput', () => {
  it('llama a onAdicionarTarea con el texto escrito por el usuario', async () => {
    // Arrange
    const onAdicionarTarea = vi.fn()
    render(<TaskInput onAdicionarTarea={onAdicionarTarea} />)
    const usuario = userEvent.setup()
 
    // Act
    const input = screen.getByPlaceholderText('Escribe una tarea')
    await usuario.type(input, 'Comprar pan')
    await usuario.click(screen.getByText('Adicionar Tarea'))
 
    // Assert
    expect(onAdicionarTarea).toHaveBeenCalledWith(
        expect.objectContaining({
            text: 'Comprar pan',
            state: 'pending',
        })
    )
    expect(input).toHaveValue('');
  })
 
  it('no llama a onAdicionarTarea si el campo está vacío', async () => {
    const onAdicionarTarea = vi.fn()
    render(<TaskInput onAdicionarTarea={onAdicionarTarea} />)
    const usuario = userEvent.setup()
 
    await usuario.click(screen.getByText('Adicionar Tarea'))
 
    expect(onAdicionarTarea).not.toHaveBeenCalled()
  })
})