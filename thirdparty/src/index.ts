import express from 'express';
import { LoremIpsum } from "lorem-ipsum";

function randInt(max: number) {
	return Math.floor(Math.random() * max);
}

const lorem = new LoremIpsum();

class DataSource1 {
	value: string = "";

	update() {
		this.value = lorem.generateParagraphs(randInt(16));
	}

	constructor() {
		this.update();
	}

	toJSON() {
		return this.value;
	}
}


class DataSource2 {
	values: string[] = [];

	update() {
		const count = randInt(10);
		const values = new Array(count);
		for (let i = 0; i < count; i++) {
			values[i] = lorem.generateSentences(1);
		}

		this.values = values;
	}

	constructor() {
		this.update();
	}

	toJSON() {
		return this.values;
	}
}


type DataSource3Element = {
	type: string
	value: string
	timestamp: number
}

class DataSource3 {
	values: DataSource3Element[] = [] ;

	update() {
		const count = randInt(64);
		const values = new Array(count);
		for (let i = 0; i < count; i++) {
			values[i] = {
				type: lorem.generateWords(1).toUpperCase(),
				values: lorem.generateWords(randInt(16)),
				timestamp: Date.now()
			}
		}

		this.values = values;
	}

	constructor() {
		this.update();
	}

	toJSON() {
		return this.values;
	}
}



let data1 = new DataSource1();
setInterval(() => data1.update(), 5000);

let data2 = new DataSource2();
setInterval(() => data2.update(), 7500);

let data3 = new DataSource3();
setInterval(() => data3.update(), 8000);

const app = express();
app.set('etag', 'strong');


app.get('/source/1', (req, res) => {
	res.json(data1);
});

app.get('/source/2', (req, res) => {
	res.json(data2);
});

app.get('/source/3', (req, res) => {
	res.json(data3);
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}.`));

export {};

