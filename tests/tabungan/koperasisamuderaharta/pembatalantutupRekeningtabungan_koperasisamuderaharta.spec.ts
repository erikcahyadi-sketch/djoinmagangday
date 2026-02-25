import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function pembatalantutupRekeningtabungan_koperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing pembatalantutupRekeningtabungan_koperasisamuderaharta', async ({ page }) => {
        // --- TAMBAHKAN BARIS INI UNTUK MEMPERBESAR NAPAS ROBOT MENJADI 2 MENIT ---
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
        const tutupRekening = page.locator('a').filter({ hasText: /^Tutup Rekening$/ }).first();
        await tutupRekening.waitFor({ state: 'visible', timeout: 15000 });
        await tutupRekening.click();
        await page.getByText('5250078').click();
        await page.waitForTimeout(3000);
        await page.screenshot({
            path: 'pembatalantutupRekeningtabungan_koperasisamuderaharta_screenshot.png'
        })
    })
}
// pembatalantutupRekeningtabungan_koperasisamuderaharta();
