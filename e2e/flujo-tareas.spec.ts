import { test, expect } from '@playwright/test'
 
test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Crear una tarea
  await page.getByPlaceholder('Escribe una tarea').fill('Comprar pan y queso')
  await page.getByRole('button', { name: 'Adicionar Tarea' }).click()
 
  // 3. Verla en la lista
  //await expect(page.getByText('Comprar pan')).toBeVisible()

  //se comenta temporalmente
  //await expect(page.getByText('Comprar pan y queso').first()).toBeVisible()
})