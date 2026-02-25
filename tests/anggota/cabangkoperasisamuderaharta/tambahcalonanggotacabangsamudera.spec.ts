import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function tambahcalonanggotacabangsamudera() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing tambahcalonanggotacabangsamudera', async ({ page }) => {
        // Perbesar timeout test menjadi 2 menit (120000 ms)
        test.setTimeout(120000);

        // 1. FASE LOGIN
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');

        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForLoadState('networkidle');

        // 2. FASE PINDAH CABANG
        await page.locator('#header_session_company_id').selectOption('1');

        // Beri waktu singkat untuk reload setelah ganti cabang
        await page.waitForTimeout(3000);

        // =========================================================================
        // 3. FASE NAVIGASI MENU
        // =========================================================================
        // A. Tunggu menu Anggota muncul
        const menuAnggota = page.locator('a').filter({ hasText: /^Anggota$/ }).first();
        await menuAnggota.waitFor({ state: 'visible', timeout: 15000 });
        await menuAnggota.click();

        // B. Tunggu dropdown Calon Anggota
        const submenuCalon = page.locator('a').filter({ hasText: /^Calon Anggota$/ }).first();
        await submenuCalon.waitFor({ state: 'visible', timeout: 15000 });
        await submenuCalon.click();

        // C. Tunggu tombol Tambah muncul
        const tombolTambah = page.locator('a:has-text(" Tambah")');
        await tombolTambah.waitFor({ state: 'visible', timeout: 30000 });
        await tombolTambah.click();

        // Tunggu halaman form tambah selesai dimuat
        await page.waitForLoadState('networkidle');

        // Pastikan tidak ada overlay loading (nprogress-busy) yang menghalangi interaksi
        await page.locator('html.nprogress-busy').waitFor({ state: 'detached', timeout: 10000 }).catch(() => { });

        // =========================================================================
        // 4. FASE ISI FORM
        // =========================================================================
        const kolomTanggal = page.locator('#customer_date');
        await kolomTanggal.waitFor({ state: 'visible', timeout: 10000 });
        await kolomTanggal.click();
        await page.keyboard.press('Delete');
        await page.fill('input[name="customer_date"]', '22-02-2026');
        await page.keyboard.press('Tab');

        await page.fill('input[name="nip"]', '3232321');
        await page.fill('input[name="kyc_nik"]', '5220065654011211');
        await page.fill('input[name="customer_name"]', 'akazs455');

        const dropdownTipe = page.locator('#customer_type');
        await dropdownTipe.selectOption({ label: 'Anggota Saham' }, { force: true });

        await page.locator('label').filter({ hasText: /Laki/i }).first().click({ force: true });
        await page.fill('input[name="customer_birth_place"]', 'Denpasar');

        // Kurangi waitForTimeout menjadi 3 detik
        await page.waitForTimeout(3000);
        const kolomTanggalLahir = page.locator('#customer_birth_date');
        await kolomTanggalLahir.click();
        await page.locator('.ui-datepicker-year').selectOption('2002');
        await page.locator('.ui-datepicker-month').selectOption('0');
        await page.locator('.ui-state-default').filter({ hasText: /^20$/ }).click();
        await page.keyboard.press('Tab');

        await page.locator('#professions').selectOption('5', { force: true });
        await page.locator('#religions').selectOption('3', { force: true });
        await page.locator('#maritals').selectOption('1', { force: true });
        await page.locator('#identity').selectOption('1', { force: true });

        await page.fill('input[name="customer_identity_number"]', '153163232589432');
        await page.fill('input[name="customer_phone"]', '8721199998');
        await page.fill('input[name="customer_mother_name"]', 'karisdaewma heroku');
        await page.fill('input[name="customer_heir_name"]', 'Pu ');
        await page.fill('input[name="customer_email"]', 'testiynmhf@gmail.com');
        await page.fill('textarea[name="address[1]"]', 'BR DLOD BLAMBANG');
        await page.fill('textarea[name="address[2]"]', 'Banjar tegal buah');
        await page.fill('textarea[name="address[3]"]', 'blahkiuh ciung wanara');

        // =========================================================================
        // 5. FASE SUBMIT & SCREENSHOT
        // =========================================================================
        await page.getByRole('button', { name: " Simpan" }).click();

        // Tunggu tombol konfirmasi "Yes" muncul lalu klik
        await page.locator('button.swal2-confirm:has-text("Yes")').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('button.swal2-confirm:has-text("Yes")').click();

        // Tunggu data baru dengan nama 'akazs455' muncul di tabel
        await page.locator('table tbody tr:has-text("akazs455")').waitFor({ state: 'visible', timeout: 15000 });

        // Jeda singkat untuk memastikan tabel sudah dirender sempurna
        await page.waitForTimeout(5000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(4000);
        // Screenshot
        await page.screenshot({ path: 'tambahcalonanggotacabangsamudera_screenshot.png', timeout: 100000 });
    });
}
// tambahcalonanggotacabangsamudera();