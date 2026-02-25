import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function daftarpegawaitest() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing daftarpegawaitest', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForTimeout(5000);
        const menuPegawai = page.getByRole('link', { name: 'Pegawai' }).first();
        await menuPegawai.waitFor({state : 'visible'});
        await menuPegawai.click();
        const daftarPegawai = page.getByRole('link', {
            name :'Daftar Pegawai'
        });
        await daftarPegawai.waitFor({state : 'visible'});
        await daftarPegawai.click();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/pegawai/daftar');
        await page.waitForTimeout(5000);
        const namaPegawaiBaru = 'Paul Taylor';
    // Cari baris (tr) yang HANYA mengandung teks kegiatan tersebut
         const barisTarget = page.locator('table tbody tr', { hasText: namaPegawaiBaru }).nth(0);
        await expect(barisTarget).toBeVisible();
        await page.screenshot({
            path : '/screenshoot'
        })
    })
}
daftarpegawaitest();
