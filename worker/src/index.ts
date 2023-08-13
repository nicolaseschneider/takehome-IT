import express from 'express';
import sqlite3 from 'sqlite3';

const remoteAPIBase = "http://localhost:3000";

const db = new sqlite3.Database('cache.sqlite3');
// This database could have whatever schema you'd like to use to cache
// the following queries from these data sources:


setInterval(async () => {
	const response = await fetch(`${remoteAPIBase}/source/1`);
	const data = await response.json();
	console.log(data)
	
	// We need to store this data somehow so it can be queried.
}, 4800);	

setInterval(async () => {
	const response = await fetch(`${remoteAPIBase}/source/2`);
	const data = await response.json();
	console.log(data)

	// We need to store this data somehow so it can be queried.
}, 3300);

setInterval(async () => {
	const response = await fetch(`${remoteAPIBase}/source/3`);
	const data = await response.json();
	console.log(data)

	// We need to store this data somehow so it can be queried.
}, 2500);

// An improvement for the above might be making the update intervals adaptive,
// based on querying usage?

const app = express();

// Provide some sort of HTTP accessible API (REST?) for querying the above data.
const port = 3030;
app.listen(port, () => console.log(`listening on port ${port}.`));

export {};


