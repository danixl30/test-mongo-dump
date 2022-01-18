import { execV1 } from "../utils/exec/index.js"
import { dumpDb } from "../use.cases/dump.db.js";
import { listDriveFiles } from "../use.cases/list.drive.files.js";
import { searchDriveFolders } from "../use.cases/search.folder.drive.js";
export const makell = async (req, res) => {
		const data = await execV1('dir')
		res.json(data);
}

export const makeDump = async (req, res) => {
		const data = await dumpDb()
		res.json(data)
}

export const listDriveFilesServ = async (req, res) => {
		const data = await listDriveFiles()
		res.json(data)
}

export const searchDriveFolder = async (req, res) => {
		const data = await searchDriveFolders(req.body.name)
		res.json(data)
}
