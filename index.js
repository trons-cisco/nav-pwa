//I've Put my own flair on https://github.com/cisco-ce/roomos-samples/tree/main/navigator/navigator-webapp
//Still fumbling through learning this coding stuff ;)

//need to add xapi.Config.UserInterface.LedControl.Mode.set('Manual');
function setledcontrolmanual(){
	xapi.Config.UserInterface.LedControl.Mode.set('Manual');
};

setledcontrolmanual();

//Initialize the xAPI on page load to make the xapi object available.
//Creating a persistent Cookie with navigator ID is not necessary, 
//just done as an example for how to distinguish between unique navigators.
async function init() {
	try {
		xapi = await getXAPI();
		xapistatus.textContent = "jsxapi active";
		unique_id = createPersistentCookie();
		content.textContent = "Navigator ID: " + unique_id;
		setupSubscriptions();
		getCurrent();
	} catch(e) {
		content.textContent = e.message;
		xapistatus.textContent = "Houston, we have a problem...error getting jsxapi object";
	}
}

window.onload = async function() {
	init();
};

//Persistent Cookie example for Unique Navigator ID:
//Searches for an existing cookie, if not found generates a new UUID and stores it.
function createPersistentCookie() {
	value_or_null = (document.cookie.match(/^(?:.*;)?\s*uniqueId\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
	var ret_val;
	if(value_or_null == null) {
		var expiration_date = new Date();
		var cookie_string = '';
		expiration_date.setFullYear(expiration_date.getFullYear() + 1);
		cookie_string = "uniqueId=" + uuidv4() +"; path=/; expires=" + expiration_date.toUTCString();
		document.cookie = cookie_string;
	}
	return (document.cookie.match(/^(?:.*;)?\s*uniqueId\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

//Event handlers for button presses below.
//Xapi Command to set the LedControl Color to Green
const greenButton = document.getElementById('greenButton');
const content = document.getElementById('content');
const xapistatus = document.getElementById('xapistatus');
greenButton.addEventListener('click', async function(e) {
	try {		
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Green' });
	} catch(e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Yellow
const yellowButton = document.getElementById('yellowButton');
yellowButton.addEventListener('click', async function(e) {
	try {
	   	//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Yellow' });
  	} catch(e) {
		content.textContent = e.message;
   	}
});

//Xapi Command to set the LedControl Color to Red
const redButton = document.getElementById('redButton');
redButton.addEventListener('click', async function(e) {
   try {
	   //Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Red' });
   	} catch(e) {
		content.textContent = e.message;
   	}
});

const offButton = document.getElementById('offButton');
offButton.addEventListener('click', async function(e) {
   try {
		//Example xapi xConfiguration
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Off' });
   	} catch(e) {
		content.textContent = e.message;
   	}
});

//Gets the current xStatus of LedControl Color and displays on the page.
function getCurrent() {
	//Example xapi xStatus
	xapi.Status.UserInterface.LedControl.Color.get().then((color) => {
		switch(color) {
			case 'Green':
				 document.getElementById('ledRect').style.fill = color;
				 break;
			case 'Yellow':
				 document.getElementById('ledRect').style.fill = color;
				 break;
			case 'Red':
				 document.getElementById('ledRect').style.fill = color;
				 break;
			default: 
				console.log("Unexpected color")
				document.getElementById('ledRect').style.fill = 'orange';
		}
    })
    .catch(function(error) {
		console.log(error);
    });
}

//Gets the current xStatus of LedControl Color and displays on the page.
function setupSubscriptions() {
	//Example xapi xStatus
	content.textContent = "Checking stuff and things";
	xapi.Status.UserInterface.LedControl.Color.on(v =>content.textContent = v);
	xapi.Status.UserInterface.LedControl.Color.on(v =>document.getElementById('ledRect').style.fill = v);
}
