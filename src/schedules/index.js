import { scheduleJob, RecurrenceRule } from "node-schedule";
import { dumpDb } from "../use.cases/dump.db.js";

const rule = new RecurrenceRule()
rule.minute = 55

const ruleDump = new RecurrenceRule()
ruleDump.minute = 6

export const job = scheduleJob(rule, function(){
  console.log('work')
})

export const jobDump = scheduleJob(ruleDump, async function(){
		const data = await dumpDb();
		if (data){
				console.log('Dump created successfully')
		} 
})


