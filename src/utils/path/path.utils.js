import { join } from "path"

export const setPath = (route) => {
		const wordRep = 'file:' + (process.platform == 'win32' ? '\\': '')
		return join(import.meta.url, route).replace(wordRep, '');
}
