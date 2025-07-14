// Middleware is solely used for logging.
import { logger } from './lib/logger'
const log = logger.child({ module: 'middleware' })

export default function middleware(request) {
  const { method, url } = request
  log.info({ method, url })
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
