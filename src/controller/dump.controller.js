import { Router } from "express";
import {listDriveFilesServ, makeDump, makell, searchDriveFolder} from "../service/dump.service.js"

const router = Router()

router.get('/ll', makell)

router.get('/dump', makeDump)

router.get('/drive-list', listDriveFilesServ)

router.post('/search-folder', searchDriveFolder)

export default router

