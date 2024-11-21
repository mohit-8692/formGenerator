import { test, expect } from '@playwright/test';

test.describe('Dynamic Form Generator', () => {
  test('renders the JSON editor and form preview', async ({ page }) => {
    await page.goto('http://localhost:3000'); // Replace with your local or deployed URL

    const editor = await page.locator('textarea');
    const formTitle = await page.locator('h1');

    await expect(editor).toBeVisible();
    await expect(formTitle).toBeVisible();
  });

  test('updates form preview in real-time', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const editor = page.locator('textarea');
    const newSchema = `
      {
        "formTitle": "Updated Form",
        "formDescription": "This is a dynamically updated form",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Name",
            "required": true,
            "placeholder": "Enter your name"
          }
        ]
      }
    `;

    await editor.fill(newSchema);
    const formTitle = await page.locator('h1');
    await expect(formTitle).toHaveText('Updated Form');
  });

  test('submits valid form data', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const editor = page.locator('textarea');
    const newSchema = `
      {
        "formTitle": "Test Form",
        "formDescription": "This is a test form",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Name",
            "required": true,
            "placeholder": "Enter your name"
          }
        ]
      }
    `;

    await editor.fill(newSchema);

    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('John Doe');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    const successMessage = page.locator('text=Form submitted successfully!');
    await expect(successMessage).toBeVisible();
  });

  test('shows validation errors for required fields', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const editor = page.locator('textarea');
    const newSchema = `
      {
        "formTitle": "Test Form",
        "formDescription": "This is a test form",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Name",
            "required": true,
            "placeholder": "Enter your name"
          }
        ]
      }
    `;

    await editor.fill(newSchema);

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    const errorMessage = page.locator('text=This field is required.');
    await expect(errorMessage).toBeVisible();
  });
});
