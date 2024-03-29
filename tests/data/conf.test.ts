import { getSysConf, getUsrConf, setUsrConf } from 'data/conf.ts';
import { assertEquals } from 'std/assert/assert_equals.ts';
import { afterAll, beforeAll, beforeEach, describe, it } from 'std/testing/bdd.ts';
import { SYS_CONFIG_FILE_PATH, USR_CONFIG_FILE_PATH } from 'utils/paths.ts';

import { MinecraftServerLauncherConf } from 'types/conf.ts';

//setUsrConf
//getSysConf
const usrTestConf: MinecraftServerLauncherConf = {
 serverInstallationDir: 'usr/foo/bar',
 //  versionManifestV2Url: 'https://usr/foo.bar',
 launchArgs: {
  default: {
   javaArgs: [
    '--foo',
   ],
   serverArgs: [
    '--bar',
   ],
  },
 },
};

const sysTestConf: MinecraftServerLauncherConf = {
 serverInstallationDir: 'sys/foo/bar',
 versionManifestV2Url: 'https://sys/foo.bar',
 launchArgs: {
  default: {
   javaArgs: [
    '--moo',
   ],
   serverArgs: [
    '--baz',
   ],
  },
 },
};

let usrConf;
let sysConf;

describe('conf', () => {
 beforeAll(() => {
  usrConf = Deno.readFileSync(USR_CONFIG_FILE_PATH);
  sysConf = Deno.readFileSync(SYS_CONFIG_FILE_PATH);
 });

 beforeEach(() => {
  Deno.writeTextFileSync(USR_CONFIG_FILE_PATH, JSON.stringify(usrTestConf, null, 4));
  Deno.writeTextFileSync(SYS_CONFIG_FILE_PATH, JSON.stringify(sysTestConf, null, 4));
 });

 afterAll(() => {
  Deno.writeFileSync(USR_CONFIG_FILE_PATH, usrConf);
  Deno.writeFileSync(SYS_CONFIG_FILE_PATH, sysConf);
 });

 it('getUsrConf: should return the user configuration', () => {
  const readedConf = getUsrConf();
  assertEquals(readedConf, usrTestConf);
 });

 it('setUsrConf: should write the user configuration', () => {
  const editedConf = { ...usrConf, serverInstallationDir: 'edited' };
  setUsrConf(editedConf);
  const readedConf = JSON.parse(Deno.readTextFileSync(USR_CONFIG_FILE_PATH));
  assertEquals(readedConf, editedConf);
 });

 it('getSysConf: should return the system configuration', () => {
  const readedConf = getSysConf();
  assertEquals(readedConf, sysTestConf);
 });
});
