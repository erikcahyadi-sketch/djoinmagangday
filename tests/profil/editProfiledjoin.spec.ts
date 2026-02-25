import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';



function editProfile() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing login failed muncul console log conditiona if else ', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        const checkUrl = await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.screenshot({
            path : 'testingIsiform.png'
        })
    })

}
//editProfile();