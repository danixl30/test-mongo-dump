import { google } from "googleapis"

export const listFiles = async (auth) => {
		const drive = google.drive({version: 'v3', auth})
		const listProm = new Promise ((resolve, reject) => {
				drive.files.list({
						pageSize: 10,
						fields: 'nextPageToken, files(id, name)',
				}, (err, res) => {
						if (err) reject(err) 
						const files = res.data.files
						resolve(files)
				})
		})
		let data;
		await listProm
				.then(files => data = files)
				.catch(err => data = err)
		return data
}

export const searchFolder = async (auth, name) => {
		const drive = google.drive({version: 'v3', auth})
		const listProm = new Promise ((resolve, reject) => {
				drive.files.list({
						q: `mimeType = 'application/vnd.google-apps.folder' and name='${name}'`,
						pageSize: 10,
						fields: 'nextPageToken, files(id, name)',
				}, (err, res) => {
						if (err) reject(err) 
						const files = res.data.files
						resolve(files)
				})
		})
		let data;
		await listProm
				.then(files => data = files)
				.catch(err => data = err)
		return data
}

export const createFolder = async (auth, name) => {
		const drive = google.drive({version: 'v3', auth})
		const folderMetadata = {
				name: name,
				mimeType: 'application/vnd.google-apps.folder'
		}
		const createProm = new Promise((resolve, reject) => {
				drive.files.create({
						resource: folderMetadata,
						fields: 'id'
				}, (err, file) => {
						if (err) console.log(err)
						if (err) reject(err)
						resolve(file)
				})
		})
		let data
		await createProm
				.then(res => data = res)
				.catch(err => data = err)
		return data
}

export const uploadZip = async (auth, name, buffer, parent) => {
		const drive = google.drive({version: 'v3', auth})
		const fileMetadata= {
				name: name,
				parents: parent,
		}
		const media= {
				mimeType: 'application/zip',
				body: buffer
		}
		const createProm = new Promise((resolve, reject) => {
				drive.files.create({
						resource: fileMetadata,
						media: media,
						fields: 'id'
				}, (err, file) => {
						if (err) console.log(err)
						if (err) reject(err)
						resolve(file)
				})
		})
		let data
		await createProm
				.then(res => data = true)
				.catch(err => data = false)
		return data
}
