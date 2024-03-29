import { getServerInstallationDirs, isServerInstalled } from 'data/installation.ts';
import { assertEquals } from 'std/assert/assert_equals.ts';
import { join } from 'std/path/mod.ts';
import { afterAll, beforeEach, describe, it } from 'std/testing/bdd.ts';
import { appConfig } from 'utils/config.ts';
import { clearServerInstallationDir } from '../test_utils/utils.ts';

describe('getServerInstallationDirs', () => {
 beforeEach(() => {
  clearServerInstallationDir();
 });

 afterAll(() => {
  clearServerInstallationDir();
 });

 it('should return an empty array if no server installation directories exist', () => {
  const dirs = getServerInstallationDirs();
  assertEquals(dirs.length, 0);
 });

 it('should return an array of server installation directories', () => {
  // Create two test directories
  Deno.mkdirSync(join(appConfig.serverInstallationDir, '1.20.0'), { recursive: true });
  Deno.mkdirSync(join(appConfig.serverInstallationDir, '1.20.1'), { recursive: true });

  const dirs = getServerInstallationDirs();
  assertEquals(dirs.length, 2);
  assertEquals(dirs.includes('1.20.0'), true);
  assertEquals(dirs.includes('1.20.1'), true);
 });
});

describe('isServerInstalled', () => {
 beforeEach(() => {
  clearServerInstallationDir();
 });

 afterAll(() => {
  clearServerInstallationDir();
 });

 it('should return false if the server is not installed', () => {
  const installed = isServerInstalled('1.20.0');
  assertEquals(installed, false);
 });

 it('should return true if the server is installed', () => {
  // Create a test directory for the installed server
  Deno.mkdirSync(join(appConfig.serverInstallationDir, '1.20.0'), { recursive: true });

  const installed = isServerInstalled('1.20.0');
  assertEquals(installed, true);
 });
});
