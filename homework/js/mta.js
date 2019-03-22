
/*There are 3 subway lines:
The N line has the following stops: Times Square, 34th, 28th, 23rd, Union Square, and 8th
The L line has the following stops: 8th, 6th, Union Square, 3rd, and 1st
The 6 line has the following stops: Grand Central, 33rd, 28th, 23rd, Union Square, and Astor Place.
All 3 subway lines intersect at Union Square, but there are no other intersection points. (For example, 
	this means the 28th stop on the N line is different than the 28th street stop on the 6 line, 
	so you'll have to differentiate this when you name your stops in the arrays.)
Tell the user the number of stops AND the stops IN ORDER that they will pass through or change at.*/



// subway lines
//const LineN = ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"];
//const LineL = ["8th", "6th", "Union Square", "3rd", "1st"];
//const Line6 = ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"];


const LineN = {
  name: 'N',
  stops: ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"]
};

const LineL = {
  name: 'L',
  stops: ["8th", "6th", "Union Square", "3rd", "1st"]
};

const Line6 = {
  name: '6',
  stops: ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]
};

const subway = [LineN, LineL, Line6] ;

const findLine = function (line) {
	let foundIndex = 0;

	//console.log("line = " + line);

	for (let i=0; i<subway.length; i++) {
		//console.log(i, subway[i].name)
		if (line === subway[i].name) {
			//console.log("found it");
			foundIndex = i;
			break;
		}
	}

	//console.log("foundline = " + foundline);
	//return the line
	return subway[foundIndex];
};

const center = "Union Square";

const printStops = function(stopsArray, indexStart, indexEnd) {
	//console.log(stopsArray);
	//console.log("" + indexStart);
	//console.log("" + indexEnd);

	let pArray = [];
	if (indexStart > indexEnd) {
		for (let y = (indexStart-1); y >= indexEnd; y--) {
			pArray.push(stopsArray[y]);
		}
	} else {
		//if (indexStart > indexCenter) {
		for (let y = (indexStart); y <= indexEnd; y++) {
			pArray.push(stopsArray[y]);
		}
	}

	return pArray;
}

const planTrip = function (startline, startpt, destline, destpt) {

	//====== startingpt details

	const sLine = findLine (startline);
	
	//console.log("sLine " + sLine.name);
	//console.log("stops " + sLine.stops);

	const sIndex = sLine.stops.indexOf(startpt); 
	//console.log("station " + sIndex + "," + sLine.stops[sIndex] );

	const sUSidx = sLine.stops.indexOf(center);


	//====== destination details

	const dLine = findLine (destline);
	

	if (sLine===dLine) {
		// if same line, no need to stop at Union Square
		// one function call only
		
	} else {


	//console.log("dLine " + dLine.name);
	//console.log("stops " + dLine.stops);

	const dIndex = dLine.stops.indexOf(destpt); 
	//console.log("station " + dIndex + "," + dLine.stops[dIndex] );

	const dUSidx = dLine.stops.indexOf(center);

	let startstops = printStops(sLine.stops, sIndex, sUSidx);
	let deststops = printStops(dLine.stops, dUSidx, dIndex);

	console.log(`You must travel through the following stops on the ${startline} line: ${startstops}.`);

	console.log("Change at Union Square.");

	console.log(`Your journey continues through the following stops: ${deststops}.`);
	
	console.log( (startstops.length + (deststops.length-1)) + " stops in total.");
	}

};

planTrip('N', 'Times Square', '6', '33rd');
planTrip('N', 'Times Square', 'N', '8th');


