declare module "*.vue" {
  import Vue = require('vue')
  export default typeof Vue
}

declare module "emojione" {
  export function shortnameToUnicode(shortname:string):string;
}

declare module "vuefire" {
  import * as _Vue from 'vue';
  import {
    database
  } from 'firebase';

  type FirebaseSnapshot = database.DataSnapshot;
  type FirebaseReference = database.Reference;
  type FirebaseQuery = database.Query;

  // Returns the key of a Firebase snapshot across SDK versions.
  export function _getKey (snapshot:FirebaseSnapshot): string|null;

  // Returns the original reference of a Firebase reference or query across SDK versions.
  export function _getRef (refOrQuery:FirebaseReference|FirebaseQuery): FirebaseReference;

  // Check if a value is an object.
  export function isObject(val: any): boolean;

  // Convert firebase snapshot into a bindable data record.
  export function createRecord(snapshot: FirebaseSnapshot): Object;

  // Find the index for an object with given key.
  export function indexForKey(array: Array<any>, key: string): number;

  // Bind a firebase data source to a key on a vm.
  export function bind(vm: _Vue, key: string, source: Object): void;

  // Define a reactive property in a given vm if it's not defined yet
  export function defineReactive(vm: _Vue, key: string, val: any): void;

  // Bind a firebase data source to a key on a vm as an Array.
  export function bindAsArray(vm: _Vue, key: string, source: Object, cancelCallback:Function|null|undefined): void;

  // Bind a firebase data source to a key on a vm as an Object.
  export function bindAsObject(vm: _Vue, key: string, source: Object, cancelCallback:Function|null|undefined): void;

  // Unbind a firebase-bound key from a vm.
  export function unbind(vm: _Vue, key:string): void;

  // Ensure the related bookkeeping variables on an instance.
  export function ensureRefs(vm: _Vue): void;

  // Install function passed to Vue.use() in manual installation.
  export function install(Vue: typeof _Vue): void;
}

