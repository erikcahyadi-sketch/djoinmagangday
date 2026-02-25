import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
function tambahbungatabungan() {
test('berhasil menambah data bunga tabungan', async ({ page }) => {
    test.setTimeout(60000);

    // ---------- Login ----------
    await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
    await page.fill('input[name="username"]', process.env.USERNAME_COOPMAX!);
    await page.fill('input[name="password"]', process.env.PASSWORD_COOPMAX!);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');

    // ---------- Pindah Cabang ----------
    await page.locator('#header_session_company_id').selectOption('1');
    await page.waitForLoadState('networkidle');

    // ---------- Navigasi ke menu Perhitungan Bunga Tabungan ----------
    const menuTabungan = page.locator('a').filter({ hasText: /^Tabungan$/ }).first();
    await menuTabungan.waitFor({ state: 'visible', timeout: 15000 });
    await menuTabungan.click();

    const submenuPerhitungan = page.locator('a').filter({ hasText: /^Perhitungan Bunga Tabungan$/ }).first();
    await submenuPerhitungan.waitFor({ state: 'visible', timeout: 10000 });
    await submenuPerhitungan.click();

    // ---------- Klik tombol Tambah ----------
    const tombolTambah = page.locator('a:has-text(" Tambah")');
    await tombolTambah.waitFor({ state: 'visible', timeout: 30000 });
    await tombolTambah.click();

    // ---------- Isi Form ----------
    await page.fill('input[name="saving_interest_name"]', 'bunga hari raya buazcom raja');
    await page.fill('textarea[name="saving_interest_desc"]', 'bunga hari raya buazcom sebanyak 1 juta kali');
    await page.locator('#saving_key').selectOption('1', { force: true });

    // ---------- Submit Form ----------
    await page.getByRole('button', { name: ' Simpan' }).click();

    // Tunggu hingga elemen <pre> muncul (menampilkan respons JSON sukses)
    await page.locator('pre').waitFor({ state: 'visible', timeout: 10000 });

    // Verifikasi isi JSON
    const preText = await page.locator('pre').textContent();
    expect(preText).toContain('"status":true');
    expect(preText).toContain('"message":"Berhasil menambahkan data"');
    await page.waitForTimeout(9000);
    // ---------- Screenshot ----------
    await page.screenshot({ path: 'tambah-bungatabungan_screenshot.png' });
});
}

// tambahbungatabungan();