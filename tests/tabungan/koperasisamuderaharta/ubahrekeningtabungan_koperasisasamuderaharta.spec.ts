import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function ubahrekeningtabungan_koperasisasamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing ubahrekeningtabungan_koperasisasamuderaharta', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForTimeout(5000);
        // ---------- Pindah Cabang ----------
        await page.locator('#header_session_company_id').selectOption('1');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(8000);
        // ---------- Navigasi ke menu Perhitungan Bunga Tabungan ----------
        const menuTabungan = page.locator('a').filter({ hasText: /^Tabungan$/ }).first();
        await menuTabungan.waitFor({ state: 'visible', timeout: 15000 });
        await menuTabungan.click();

        const submenuPerhitungan = page.locator('a').filter({ hasText: /^Rekening Tabungan$/ }).first();
        await submenuPerhitungan.waitFor({ state: 'visible', timeout: 10000 });
        await submenuPerhitungan.click();
        await page.waitForTimeout(2000);
        await page.screenshot({
            path: 'ubahrekeningtabungan_koperasisasamuderaharta_screenshot.png'
        })
    })
}
ubahrekeningtabungan_koperasisasamuderaharta();
