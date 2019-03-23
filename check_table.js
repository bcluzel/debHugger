/*
 * File containing fucntions that need to be implemented
 * */

// Global varibles

var sourceCode = `
i = 1
i = i + 1
while (i<4) {
	i +=1
}
if (i > 6) {
	answer = "HackBX"
}
`;

var current_instruction = 0;


// @param memory : dictionnaire
function check_memory(memory) {
	if (dict_equals(memory, current_instruction_answer)) {
		next_instruction()
	}
}

// TODO : implement
function next_instruction() {
	current_instruction += 1;
}

function dict_equals(dic1, dic2) {
	let rep = 1;
	for (let propriety in dic1) {
	  if(dic1[propriety] != dic2[propriety]){
	    rep = 0;
	  }
	}
	return rep;
}

/*
 * Tell the player he won.
 * */
function finish() {

}
