import { exec } from "child_process"

export const execV1 = async (command) => {
		const execPromise = new Promise((resolve, reject) => {

				exec(command, (error, stdout, stderr) => {
						if (error) {
								reject(error)
								return
						}
						if (stderr) {
								reject(stderr)
								return
						}
						resolve(stdout)
				})
		})
		let data;
		await execPromise
				.then(resp => data = resp)
				.catch(err => data = err)
		return data
}

export const execV2 = async (command) => {
		const execPromise = new Promise((resolve, reject) => {

				exec(command, (error, stdout, stderr) => {
						if (error) {
								reject(error)
								return
						}
						if (stderr) {
								resolve(stderr)
								return
						}
						resolve(stdout)
				})
		})
		let data;
		await execPromise
				.then(resp => data = resp)
				.catch(err => data = err)
		return data
}

