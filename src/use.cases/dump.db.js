import { execV2 } from "../utils/exec/index.js"
import { searchFolder, createFolder, uploadZip } from "../google/drive/google.drive.js"
import { setAuthentication } from "../google/auth/google.api.auth.js"
import { setPath } from "../utils/path/path.utils.js"
import { createZip } from "../utils/zip/zip.util.js"
import fs from "fs"

export const dumpDb = async () => {
		const folderName = Date.now()
		const pathConfig = setPath('../../../db.credentials/db.yaml')
		const pathOut = setPath('../../../../dumps/' + folderName)
		const mongoDump = `mongodump --config ${pathConfig} --out ${pathOut}`
		const resp = await execV2(mongoDump)
		const res = await createZip(folderName, pathOut, pathOut)
		if (!res)	return res
		const auth = await setAuthentication() 
		const folder = await searchFolder(auth, 'Backups')
		let id = null
		if (folder.length  === 0) {
				const fold = await createFolder(auth, 'Backups')
				if (!fold) return false
				id = fold.data.id
		}else{
				id = folder[0].id
		} 
		try {
				const buffer = fs.createReadStream(setPath('../../../../dumps/' + folderName + '/' + folderName + '.zip'))
				const data = await uploadZip(auth, folderName+'.zip', buffer, [id])
				return data
		}catch (e) {
				console.log(e)
				return false
		}
} 
