import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function Negatiflogin() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });    const usernameCoopmax =  process.env.USERNAME_COOPMAX!;
    const passwordCoopmax = process.env.PASSWORD_COOPMAX!;
    test('invalid login Test', async ({page}) => {
        await page.waitForTimeout(3000);
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', usernameCoopmax);
        await page.fill('input[name="password"]', 'dskdkswiwqejwo');
        await page.getByRole('button',{
            name : "Masuk"
        }).click();
       await page.getByText('Username dan password tidak sesuai');
    })  
       
}
//Negatiflogin();