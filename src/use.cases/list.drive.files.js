import { setAuthentication } from "../google/auth/google.api.auth.js"
import { listFiles } from "../google/drive/google.drive.js"

export const listDriveFiles = async () => {
		const auth = await setAuthentication()
		if (auth){
				const data = await listFiles(auth)
				return data
		}
		return null
}
