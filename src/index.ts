// src/index.ts
import setupDb from './db'
import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import Controller from "./controller"

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [Controller]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))