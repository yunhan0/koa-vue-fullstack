// Cross origin resource sharing
const cors = require('@koa/cors')
// Application security for koa.
const lusca = require('koa-lusca')
/*
 * Simple session middleware for koa
 * const session = require('koa-session')
 * Convert legacy koa syntax
 */
const convert = require('koa-convert')

module.exports = function(app) {
  app.use(cors())
  // app.use(session(app))
  app.use(convert(
    lusca({
      /*
       * The X-Frame-Options HTTP response header can be used to indicate
       * whether or not a browser should be allowed to render a page in
       * a <frame> or <iframe>.
       * Sites can use this to avoid Clickjacking attacks,
       * by ensuring that their content is not embedded into other sites.
       * Set the X-Frame-Options header for all responses containing HTML
       * content.
       * The possible values are “DENY”, “SAMEORIGIN”, or “ALLOW-FROM <url>”.
       * Generally, unless you have a good reason to allow your web application
       * to be viewed via an iframe, it’s best to set X-Frame-Options: DENY.
       */
      xframe: 'DENY',
      hsts: { maxAge: 31536000, includeSubDomains: true },
      // Cross site scripting, turn < to &lt
      xssProtection: true,
      /*
       * Cross site resource forgery
       * csrf: true
       */
    })))
}
