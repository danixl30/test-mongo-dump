import fs from "fs"
import readline from "readline"
import { google } from "googleapis"
import {setPath} from "../../utils/path/path.utils.js"

const tokenPath = setPath('../../../google.credentials/token.json')
const credentials = setPath('../../../google.credentials/credentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

export const setAuthentication = async () => {
		try {
				const data = fs.readFileSync(credentials)
				if (data){
						const obj = await JSON.parse(data)
						return await authorize(obj)
				}
				return null
		}catch (e) {
				console.log(e)
				return null;
		}
}

const authorize = async (credentials) => {
		const {client_secret, client_id, redirect_uris} = credentials.installed
		let oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0])
		try {
				const token = fs.readFileSync(tokenPath)
				oAuth2Client.setCredentials(JSON.parse(token));
		}catch (e) {
				console.log('Creating google token...')
				oAuth2Client = await getAccessToken(oAuth2Client)
		}
		return oAuth2Client
}

const getAccessToken = async (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
		const authProm = new Promise((resolve, reject) => {
				rl.question('Enter the code from that page here: ', (code) => {
						rl.close()
						oAuth2Client.getToken(code, (err, token) => {
								if (err) reject(err)
								oAuth2Client.setCredentials(token)
								// Store the token to disk for later program executions
								fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
										if (err) reject(err)
								})
								resolve(oAuth2Client)
						})
				})
		})
		let data;
		await authProm
				.then(oAuth2Client => data = oAuth2Client)
				.catch(err => data = null)
		return data;
}
