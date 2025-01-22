import definition from 'virtual:user-background-entrypoint';
import { initPlugins } from 'virtual:wxt-plugins';
import { logger } from '../sandbox/utils/logger';
/* @vite-ignore */
import 'http://localhost:3000/@id/wxt/background-client';

let result;

try {
  initPlugins();
  result = definition.main();
  // @ts-expect-error: res shouldn't be a promise, but we're checking it anyways
  if (result instanceof Promise) {
    console.warn(
      "The background's main() function return a promise, but it must be synchronous",
    );
  }
} catch (err) {
  logger.error('The background crashed on startup!');
  throw err;
}

// Return the main function's result to the background when executed via the
// scripting API. Default export causes the IIFE to return a value.
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript#return_value
// Tested on both Chrome and Firefox
export default result;
