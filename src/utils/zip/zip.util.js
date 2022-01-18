import Admzip from "adm-zip"

export const createZip = async (name, contentPath, outPath) => {
		try {
				const zip = new Admzip()
				zip.addLocalFolder(contentPath)
				zip.writeZip(outPath + '/' + name + '.zip')
				return true
		}catch (e) {
				console.log(e)
				return false
		}
}
