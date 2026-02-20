import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function rekeningTabungan() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });    const usernameCoopmax =  process.env.USERNAME_COOPMAX!;
    const passwordCoopmax = process.env.PASSWORD_COOPMAX!;
    test('testing Daftar Monitoring Bunga', async ({page}) => {
        await page.waitForTimeout(3000);
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', usernameCoopmax);
        await page.fill('input[name="password"]', passwordCoopmax);
        await page.getByRole('button',{
            name : "Masuk"
        }).click();
        await expect(page).not.toHaveURL('https://test-5.solusisakti.xyz/admin/auth/login');
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
       await page.waitForTimeout(2000);
       await page.getByRole('link',{
        name : 'Tabungan'
       }).first().click();
       await page.locator('a:has-text("Daftar Monitoring Bunga Tabungan")').click();
       await page.screenshot({path : 'buktirekeningtabungan.png', fullPage : true})
    })  
       
}
// rekeningTabungan();