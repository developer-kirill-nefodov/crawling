import {Router} from "express";

import {getPageProgressMiddleware} from "../middlewares/get-page-progress.middleware";
import {postPagesSearchMiddleware} from "../middlewares/post-pages-search.middleware";
import {postPageController} from "../controller/post-page.controller";
import {getPageProgressService} from "../service/get-page-progress.service";

export const searchRouter = () => {
  const router = Router();

  router.get(
    '/search/:secret',
    getPageProgressMiddleware,
    getPageProgressService
  );

  router.post(
    '/search',
    postPagesSearchMiddleware,
    postPageController
  );

  return router;
}
