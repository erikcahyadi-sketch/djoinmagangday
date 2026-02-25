import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function transaksitabungansetoran_koperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing transaksitabungansetoran_koperasisamuderaharta', async ({ page }) => {
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

        await page.waitForTimeout(5000);

        // ---------- Navigasi ke menu Perhitungan Bunga Tabungan ----------
        const menuTabungan = page.locator('a').filter({ hasText: /^Tabungan$/ }).first();
        await menuTabungan.waitFor({ state: 'visible', timeout: 15000 });
        await menuTabungan.click();
        await page.waitForTimeout(3000);
        const submenuPerhitungan = page.locator('a').filter({ hasText: /^Transaksi Tabungan$/ }).first();
        await submenuPerhitungan.waitFor({ state: 'visible', timeout: 10000 });
        await submenuPerhitungan.click();
        await page.waitForTimeout(5000);
        // ---------- Klik tombol Tambah ----------
        const tombolSetoran = page.locator('a').filter({ hasText: /^ Setoran$/ }).first();
        await tombolSetoran.waitFor({ state: 'visible', timeout: 30000 });
        await tombolSetoran.click()
        await page.locator('#select2-transaction_type_id-container').click();
        await page.locator('li.select2-results__option:has-text("Setoran Tabungan")').waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('li.select2-results__option:has-text("Setoran Tabungan")').click();
        await page.waitForTimeout(2000);

        await page.locator('[id^="select2-collector_id-"]').click();
        await page.locator('li.select2-results__option:has-text("Elijah Harris")').waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('li.select2-results__option:has-text("Elijah Harris")').click();
        await page.waitForTimeout(3000);
        await page.fill('input[name="saving_code[]"]', '2260250');
        await page.keyboard.press('Enter');
        await page.fill('input[name="transaction_remark[]"]', 'Pengiriman pesanggon THRKU!!!');
        await page.waitForTimeout(5000);
        // ---------- Submit Form ----------
        await page.getByRole('button', { name: ' Simpan' }).click();
        await page.locator('button.swal2-confirm:has-text("YES")').waitFor({ state: 'visible' });
        await page.locator('button.swal2-confirm:has-text("YES")').click();
        await page.waitForTimeout(3000);
        // 1. Tangkap tombolnya menggunakan class bawaan SweetAlert dan Regex teks "OK"
        const tombolOk = page.locator('button.swal2-confirm').filter({ hasText: /^OK$/i }).first();

        // 2. Tunggu sebentar sampai animasinya selesai dan tombol benar-benar terlihat
        await tombolOk.waitFor({ state: 'visible', timeout: 10000 });

        // 3. Eksekusi klik!
        await tombolOk.click();
        await page.waitForTimeout(5000);
        await page.screenshot({
            path: 'transaksitabungansetoran_koperasisamuderaharta_screenshot.png'
        })
    })
}
// transaksitabungansetoran_koperasisamuderaharta();
