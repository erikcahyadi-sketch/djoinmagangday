import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function tambahrekeningtabungankoperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing tambahrekeningtabungankoperasisamuderaharta', async ({ page }) => {
        test.setTimeout(60000); // Perbesar timeout test

        // ---------- Login ----------
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', process.env.USERNAME_COOPMAX!);
        await page.fill('input[name="password"]', process.env.PASSWORD_COOPMAX!);
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');

        // ---------- Pindah Cabang ----------
        await page.locator('#header_session_company_id').selectOption('1');
        await page.waitForLoadState('networkidle');

        // ---------- Navigasi ke menu Rekening Tabungan ----------
        const menuTabungan = page.locator('a').filter({ hasText: /^Tabungan$/ }).first();
        await menuTabungan.waitFor({ state: 'visible', timeout: 15000 });
        await menuTabungan.click();

        const submenuPerhitungan = page.locator('a').filter({ hasText: /^Rekening Tabungan$/ }).first();
        await submenuPerhitungan.waitFor({ state: 'visible', timeout: 10000 });
        await submenuPerhitungan.click();

        // Tunggu hingga jaringan idle setelah navigasi
        await page.waitForLoadState('networkidle');

        // ---------- Klik tombol Tambah ----------
        const tombolTambah = page.locator('a:has-text(" Tambah")');
        await tombolTambah.waitFor({ state: 'visible', timeout: 30000 });
        await tombolTambah.click();
        await page.waitForLoadState('networkidle'); // Tunggu loading setelah klik
        // Isi kode customer
        await page.fill('input[name="customer_code"]', 'A005493');
        await page.keyboard.press('Enter');

        // Tunggu hingga field saving_serial_number muncul (setelah data customer dimuat)
        // Gunakan timeout lebih panjang karena mungkin ada proses loading
        await page.locator('input[name="saving_serial_number"]').waitFor({ state: 'visible', timeout: 30000 });
        await page.fill('input[name="saving_serial_number"]', '42428493492732891');

        // Tunggu dropdown Kolektor muncul
        await page.locator('#collectors').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('#collectors').selectOption('1');

        // Tunggu dropdown Produk Tabungan muncul
        await page.locator('#saving_type').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('#saving_type').selectOption('1');

        // Tunggu field Bunga muncul
        await page.locator('input[name="saving_interest"]').waitFor({ state: 'visible', timeout: 5000 });
        await page.fill('input[name="saving_interest"]', '50');

        // Tunggu field Saldo muncul
        await page.locator('input[name="saving_balance"]').waitFor({ state: 'visible', timeout: 5000 });
        await page.fill('input[name="saving_balance"]', '50');

        // (Opsional) Jika ada field Periode Waktu, tambahkan:
        // await page.locator('input[name="saving_time_period"]').waitFor({ state: 'visible', timeout: 5000 });
        // await page.fill('input[name="saving_time_period"]', '200');

        // Setelah semua field terisi, klik Simpan
        await page.getByRole('button', { name: ' Simpan' }).click()
        await page.waitForTimeout(9000);
        //Tunggu tombol konfirmasi "Yes" muncul lalu klik
        // await page.locator('button.swal2-confirm:has-text("Yes")').waitFor({ state: 'visible', timeout: 10000 });
        // await page.locator('button.swal2-confirm:has-text("Yes")').click();
        // await page.locator('button.swal2-confirm:has-text("OK")').waitFor({ state: 'visible', timeout: 10000 });
        // await page.locator('button.swal2-confirm:has-text("OK")').click();
        // Ambil screenshot
        await page.screenshot({
            path: 'tambahrekeningtabungankoperasisamuderaharta_screenshot.png'
        });
    });
}
// tambahrekeningtabungankoperasisamuderaharta();