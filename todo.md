-   rename models to schemas and add models folder => which is used to communicate to the db
-   use zod for validation
-   fix the auth -> react 18 broke it -> maybe shift to next or just plain jwt
-   write scraper for STORAGE and base64
-   update fmhy.ml/links with the github scraped one
-   move validation with zod to the controller level
-   improve the tsconfig, make sure to put `"script":true`
-   move all zod schemas to separate file and import from there
-   move sending response to route level

---

-   implement something like

```
import { Router } from 'express'
import { create } from './controller'
import jwt from 'jsonwebtoken'

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

-   implement fuzzy search?????

```
const fuzzysearch = require("fuzzysearch");

// ...
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const results = await YourModel.find({}); // find all documents
    const filteredResults = results.filter(result => {
      return fuzzysearch(query, result.title) || result.link.some(link => fuzzysearch(query, link));
    });

    res.send(filteredResults);
  } catch (error) {
    res.status(500).send(error);
  }
});

```
