import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function inputpassword() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;
    const invalidPasswod = process.env.INVALID_PASSWORD!;

    test('testing inputpassword', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', invalidPasswod);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.getByText('label[class="fa fa-times-circle-o"]');
        await page.screenshot({
            path : 'inputpasswordsalah_screenshot.png'
        })
    })
}
//inputpassword();
