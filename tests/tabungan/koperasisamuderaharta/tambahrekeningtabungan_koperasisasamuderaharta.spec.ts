import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function tambahrekeningtabungan_koperasisasamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing tambahrekeningtabungan_koperasisasamuderaharta', async ({ page }) => {
        test.setTimeout(70000);
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

        // ---------- Klik tombol Tambah ----------
        const tombolTambah = page.locator('a:has-text(" Tambah")');
        await tombolTambah.waitFor({ state: 'visible', timeout: 30000 });
        await tombolTambah.click();

        await page.fill('input[name="customer_code"]', 'NT002766');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.fill('input[name="saving_serial_number"]', '3232311232');
        // Ganti '1' dengan value/ID dari kolektor yang Bapak tuju
        await page.locator('#collectors').selectOption('1', { force: true });
        await page.waitForTimeout(2000);
        // 1. Klik kotak visualnya agar dropdown terbuka ke bawah
        await page.locator('#select2-saving_type-container').click();

        // 2. Beri jeda 1 detik agar animasi dropdown terbuka sempurna
        await page.waitForTimeout(1000);

        // 3. Langsung ketik nama tabungannya di kotak pencarian bawaan Select2
        // Ganti 'Tabungan Reguler' dengan teks persis yang ingin Bapak pilih
        await page.locator('input.select2-search__field').fill('Tabungan Harian');

        // 4. Jeda 0.5 detik agar web selesai memfilter nama tersebut ke urutan teratas
        await page.waitForTimeout(2000);

        // 5. Kunci pilihan dengan menekan Enter!
        await page.keyboard.press('Enter');
        await page.fill('input[name="saving_interest"]', '19');
        await page.fill('input[name="saving_balance"]', '2212');
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: ' Simpan' }).click();
        // Tunggu tombol konfirmasi "Yes" muncul lalu klik
        await page.locator('button.swal2-confirm:has-text("Yes")').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('button.swal2-confirm:has-text("Yes")').click();
        await page.waitForTimeout(2000);
        await page.locator('button.swal2-confirm:has-text("OK")').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('button.swal2-confirm:has-text("OK")').click();
        await page.waitForTimeout(4000);
        await page.screenshot({
            path: 'tambahrekeningtabungan_koperasisasamuderaharta_screenshot.png'
        })
    })
}
// tambahrekeningtabungan_koperasisasamuderaharta();
