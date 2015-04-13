var token="TN11EN";
var id=null;
var flagSave=false;
var login;
var theMessage = function(text, name, id) {
	return {
		message : text,
		name : name,
		id : id
	}
}
var listMessages = [];
function send_click() {
	if (flagSave == false) {
		return;
	}
	var textVal = $("#textArea").val().replace(/\s+/g, ' ');
	if ($("#textArea").val() == "" || $("#textArea").val() == "\n"
			|| textVal == " ") {
		$("#textArea").val('');
		return;
	}
	$("#textArea").val($("#textArea").val().replace(/\s/g, '&nbsp;'));
	var m = theMessage($("#textArea").val(), login, id);
	if (id == null) {
		ajax('POST', 'http://localhost:999/chat?token=' + token, JSON.stringify(m), function(error) {
			alert(error)
			}, function(serverResponce) {
		});
	}
	else {
		ajax('PUT', 'http://localhost:999/chat?token=' + token, JSON.stringify(m), function(error) {
			alert(error)
			}, function(serverResponce) {
		});
	}
	//var newMessage = theMessage($("#textArea").val(), login);
	//var edit = '<button class="' + newMessage.id + 'e" id="buttonMessage" onclick="edit(this)">edit</button>';
	//var remove = '<button class="' + newMessage.id + 'r" id="buttonMessage" onclick="del(this)">remove</button>';
	//$("#AreaMessages").append(
			//'<div><span class="span1">' + login
					//+ ': </span><span class="span2">' + $("#textArea").val()
					//+ '</span>' + edit + remove + '</div>');
	//$("#textArea").val('');
	//$("#AreaMessages").prop("scrollTop",
			//$("#AreaMessages").prop("scrollHeight"));
	//addMessage(newMessage);
//	store(listMessages);
}

function edit(obj) {
	id = $(obj).attr('id').substring(login.length, $(obj).attr('id').length);
	$(obj).parent().remove();
}

function del(obj) {
	var mId = $(obj).attr('id');
	ajax('DELETE', 'http://localhost:999/chat?token=' + token, function(error) {
			alert(error)
			}, function(serverResponce) {
		});
	$(obj).parent().remove();
}

function save() {
	if ($("#text1").val() && $("#text2").val() && $("#text3").val()
			&& $("#text4").val()) {
		flagSave = true;
		login = $("#text3").val();
	}
}

function ajax(method, url, data, continueWith , continueWithError) {
	var xmlhr = new XMLHttpRequest();
	xmlhr.open(method, url, true);
	xmlhr.onload = function () {
		if (xmlhr.readyState !== 4)
            return;
		if(xmlhr.status != 200) {
			continueWithError('Error on the server side, response ' + xhr.status);
			return;
			}
		if(isError(xmlhr.responseText)) {
			continueWithError('Error on the server side, response ' + xhr.responseText);
			return;
			}
		continueWith(xmlhr.responseText);
	}
	xmlhr.ontimeout = function () {
		continueWithError('Server timed out !');
	}
	xmlhr.onerror = function (e) {
		var errMsg = 'Server connection error !\n'+'\n'+'Check if \n'+'- server is active\n'+'- server sends header "Access-Control-Allow-Origin:*"';
		continueWithError(errMsg);
	}
	xmlhr.send(data);
}

function onKey(event) {
	if (event.keyCode == 13) {
		send_click();
		return false;
	}
}

function run() {
	setInterval(function() {
		ajax('GET', 'http://localhost:999/chat?token=' + token, function(error){ alert(error)}, getLastMessage)
	}, 666);
}

function getLastMessage(serverResponse) {
	var m = JSON.parse(serverResponse);
	doEvents(m.event);
	if (m.token.toString != "TN11EN") {
		token = m.token;
	}
}

function doEvents(events) {
	for (var i = 0;i < events.size();i++) {
		doEvent(events[i]);
	}
}

function doEvent(event) {
	if (event.type == "add") {
		output(JSON.parse(event.message));
	} else if(event.type == "edit") {
		
	} else if(event.type == "delete") {
		
	}
}

function addMessage(message) {
	listMessages.push(message);
}

function output(message) {
	var edit = '<button id="buttonMessage" onclick="edit(this)">edit</button>';
	var remove = '<button id="buttonMessage" onclick="del(this)">remove</button>';
	$("#AreaMessages").append(
			'<div><span class="span1">' + message.user
					+ ': </span><span class="span2" id="' + message.id + '">' + message.message
					+ '</span>' + edit + remove + '</div>');
}