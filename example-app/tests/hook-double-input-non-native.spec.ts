import { expect, test } from '@playwright/test';
import {
  disableNativeValidation,
  goto,
  selectMode,
  selectRevalidateMode,
  submitMsg,
} from './helpers';

const url = '/hook-double';
const missError = 'Did you miss something ?';
const validatorError = 'Second value must be greater than first value';

test.describe('Hook Double Input Non Native', () => {
  test('mode=submit', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });

  test('mode=change', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await selectMode(page, 'change');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });

  test('mode=blur', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await selectMode(page, 'blur');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });

  test('mode=all', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await selectMode(page, 'all');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });

  test('revalidateMode=change', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await selectRevalidateMode(page, 'change');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });

  test('revalidateMode=blur', async ({ page }) => {
    const { consoleMsg } = await goto(page, url);
    await disableNativeValidation(page);
    await selectRevalidateMode(page, 'blur');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    // focus and blur
    await page.getByTestId('double-1').focus();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // submit
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 1
    await page.getByTestId('double-1').fill('5');
    await expect(page.getByTestId('double-1-error')).toHaveText(missError);
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    // fix native error 2
    await page.getByTestId('double-2').fill('3');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).toHaveText(missError);
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    // fix validator error
    await page.getByTestId('double-2').fill('7');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).toHaveText(
      validatorError,
    );
    await page.getByTestId('double-2').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeEnabled();
    await page.getByTestId('rfv-submit').click();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    expect(await consoleMsg).toEqual(submitMsg);
    // manual reset
    await page.getByTestId('double-1').fill('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await page.getByTestId('double-1').blur();
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
    await page.getByTestId('double-1').fill('7');
    await page.getByTestId('double-1').blur();
    // reset button
    await page.getByTestId('rfv-reset').click();
    await expect(page.getByTestId('double-1')).toHaveValue('');
    await expect(page.getByTestId('double-2')).toHaveValue('');
    await expect(page.getByTestId('double-1-error')).not.toBeVisible();
    await expect(page.getByTestId('double-2-error')).not.toBeVisible();
    await expect(page.getByTestId('double-validator-error')).not.toBeVisible();
    await expect(page.getByTestId('rfv-submit-disabled')).toBeDisabled();
  });
});