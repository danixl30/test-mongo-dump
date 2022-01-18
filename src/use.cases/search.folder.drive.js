import { setAuthentication } from "../google/auth/google.api.auth.js"
import { searchFolder } from "../google/drive/google.drive.js"

export const searchDriveFolders = async (name) => {
		const auth = await setAuthentication()
		if (auth){
				const data = await searchFolder(auth, name)
				return data
		}
		return null 

}
