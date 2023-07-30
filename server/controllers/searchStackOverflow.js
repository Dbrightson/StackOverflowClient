import axios from 'axios'

// base url
const baseUrl = 'https://api.stackexchange.com/2.2/search/advanced';
// default params
const site = 'stackoverflow';
const filter = '!)rTkraPXy17fPqpx7wE5';
const pageSize = 10;
/**
 *
 * @param encodedString - string to decode
 * @return decodedSring
 */
const decodeEntities = encodedString => {
	const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
	const translate = {
		nbsp: ' ',
		amp: '&',
		quot: '"',
		lt: '<',
		gt: '>'
	};
	return encodedString
		.replace(translate_re, (match, entity) => {
			return translate[entity];
		})
		.replace(/&#(\d+);/gi, (match, numStr) => {
			const num = parseInt(numStr, 10);
			return String.fromCharCode(num);
		});
};

/**
 *
 * @param question - user inputed question
 * @param flags - user provided flags
 */
const searchStackOverflow = async (req, res) => {
	// console.log('start searchStackOverflow server ctrl searchStackOverflow searchStackOverflow ');
	const order = 'desc';
	let sort= `votes`
	let question = req.body.question
	// console.log(question);
	if (question === '') {
		return res.status(300).send({message:'You did not enter a question. Please enter one'});
	}
	try {
		// console.log('inside try searchStackOverflow server ctrl searchStackOverflow searchStackOverflow');
		const { data } = await axios.get(
			`${baseUrl}?order=${order}&sort=${sort}&q=${question}&pageSize=${pageSize}&site=${site}&filter=${filter}`
			);
		// console.log('after fetching search results searchStackOverflow server ctrl searchStackOverflow searchStackOverflow');
		for (const [key, value] of Object.entries(data['items'])) {
            let item = value['body_markdown'];
			data['items'][key]['body_markdown'] = decodeEntities(item).split(
                '\r\n'
                );
			data['items'][key]['body'] = [];
		}
		let { items } = data;
		let basicInfoOfQuestions = [];
		items = Object.keys(items).map(key => {
			return items[key];
		})
		// console.log(items)
		items.map(item => {
			basicInfoOfQuestions.push({
				title: typeof(item.title) === 'undefined' ? '' : item.title,
				body: format(item.body_markdown),
				answers: threadAns(item.answers)
			});
		});
        // console.log('search results searchStackOverflow server ctrl searchStackOverflow searchStackOverflow',basicInfoOfQuestions)
        return res.status(200).send({message:basicInfoOfQuestions});
	} catch (err) {
        console.log('server ctrl searchStackOverflow searchStackOverflow',err);
        return res.status(500).send({message:err});
	}
}

/**
 *
 * @param thread - stackoverflow thread for answers
 * @return - array of answers of the threads
 */
const threadAns = thread => {
	const temp = [];
	if (typeof thread === 'undefined') {
		return temp;
	}

	thread.map(ans => {
		temp.push(ans.body_markdown);
	});
	return temp;
};

/**
 *
 * @param question - thread question
 * @return body - formated body
 */
const format = question => {
	let body = '';

	question.map(index => {
		body += `${index}\n`;
	});

	return body;
};
export default searchStackOverflow;