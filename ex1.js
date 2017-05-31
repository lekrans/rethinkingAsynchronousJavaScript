function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);{}
}

// **************************************
// The old-n-busted callback way

function FileStatus(file) {
	this.file = file;
	this.received = false;
	this.published = false;
	this.text = '';
}

let pendingFiles = [];

function publish()  {	
	pendingFiles.every( (element) => {
		if (element.received === true) {
			if (element.published === true) {
				return true
			}
			element.published = true;
			output(element.text);
			return true;
		}	
		return false;
	})
}

function getFile(file) {
	let ix = pendingFiles.push(new FileStatus(file));
	fakeAjax(file,function(text){
		pendingFiles[ix-1].text = text;
		pendingFiles[ix-1].received = true;
		
		publish();
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
