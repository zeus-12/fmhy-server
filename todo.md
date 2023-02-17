-   fix the auth

-   improve the tsconfig, make sure to put `"script":true`

-   move current models to schemas, and create models for communicating with the db(data access layer)

-   implement rate-limit and caching
-   write scraper for STORAGE and base64
-   update fmhy.ml/links with the github scraped one

---

-   FOR ROLE BASED, implement something like

```
import { Router } from 'express'
import { create } from './controller'

const router = new Router()

router.post(
  '/things',
  only(['admin','customer']),
  create
)

const only = roles = (req, res, next) => {
  try {
    req.decoded = jwt.verify(token, 'my-secret')
    if(roles.includes(req.decoded.role)
      next()
    else
      throw new Error('Sem permissões') //can use a custom error factory to manage better the responses
  } catch(err) {
    next(error)
  }
}
```

for role-based
------- roles => admin, any, user(requires logged in) --------
