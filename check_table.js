/*
 * File containing fucntions that need to be implemented
 * */

// Global varibles

var sourceCode = `
<<<<<<< HEAD
i = 1
i = i + 1
while (i<4) {
	i +=1
}
if (i > 6) {
	answer = "HackBX"
}
=======
i = 0
i++
>>>>>>> ef668d9a9ab8c854b9c4f696c1cb48946683f017
`;

var instructions = [
	{ i : 0 },
	{ i : 1 },
];

var num_instructions = instructions.length();
var id_current_instruction = 0;

// @param memory : dictionnaire
function check_memory(memory) {
	if (dict_equals(memory, current_instruction_answer)) {
		next_instruction();
		if (id_current_instruction == num_instructions) {
			finish();
		}
	}
}

// TODO : implement
function next_instruction() {
	id_current_instruction++;
	update_arrow();
}

// @brief Update the arrow pointing the current instruction
// TODO : implement
function update_arrow() {

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
 * TODO : implement
 * */
function finish() {

}
