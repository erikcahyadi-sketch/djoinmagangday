import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function penggabunganDatakoperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing penggabunganDatakoperasisamuderaharta', async ({ page }) => {
        // Perbesar timeout test menjadi 60 detik
        test.setTimeout(60000);

        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum', { timeout: 10000 });
        await expect(page).toHaveTitle('KOPERASI  SAMUDRA HARTA  | Dashboard');

        // 2. FASE PINDAH CABANG
        await page.locator('#header_session_company_id').selectOption('1');
        await page.waitForLoadState('networkidle');

        // =========================================================================
        // 3. FASE NAVIGASI MENU
        // =========================================================================
        const menuAnggota = page.locator('a').filter({ hasText: /^Anggota$/ }).first();
        await menuAnggota.waitFor({ state: 'visible', timeout: 15000 });
        await menuAnggota.click();

        const PengabunganData = page.locator('a').filter({ hasText: /^Penggabungan Data$/ }).first();
        await PengabunganData.waitFor({ state: 'visible', timeout: 10000 });
        await PengabunganData.click({ force: true });

        const tombolTambah = page.locator('a:has-text(" Tambah")');
        await tombolTambah.waitFor({ state: 'visible', timeout: 30000 });
        await tombolTambah.click();

        await page.fill('input[name="customer_code_destination"]', 'A005182');
        await page.fill('input[name="customer_code_origin[]"]', 'A005194');
        await page.fill('textarea[name="merge_desc"]', 'testingkansaja');
        await page.getByRole('button', { name: " Simpan" }).click();

        // Tunggu tombol konfirmasi "Yes" muncul dan klik
        const tombolYes = page.locator('button.swal2-confirm:has-text("Yes")');
        await tombolYes.waitFor({ state: 'visible', timeout: 10000 });
        await tombolYes.click();

        await page.locator('button.swal2-confirm:has-text("OK")').waitFor({ state: 'visible' });
        await page.locator('button.swal2-confirm:has-text("OK")').click();

        // Jeda singkat opsional untuk memastikan render
        await page.waitForTimeout(3000);

        await page.screenshot({ path: 'penggabunganDatakoperasisamuderaharta_screenshot.png' });
    });
}
// penggabunganDatakoperasisamuderaharta();