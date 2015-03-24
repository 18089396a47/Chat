var flagSave = false;
var login;
var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();
	return Math.floor(date * random).toString();
};

var theMessage = function(text, name) {
	return {
		message : text,
		login : name,
		id : uniqueId()
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
	var newMessage = theMessage($("#textArea").val(), login);
	var edit = '<button class="' + newMessage.id + 'e" id="buttonMessage" onclick="edit(this)">edit</button>';
	var remove = '<button class="' + newMessage.id + 'r" id="buttonMessage" onclick="del(this)">remove</button>';
	$("#AreaMessages").append(
			'<div><span class="span1">' + login
					+ ': </span><span class="span2">' + $("#textArea").val()
					+ '</span>' + edit + remove + '</div>');
	$("#textArea").val('');
	$("#AreaMessages").prop("scrollTop",
			$("#AreaMessages").prop("scrollHeight"));
	addMessage(newMessage);
	store(listMessages);
}

function edit(obj) {
	var span = $(obj).parent().find('.span2');
	span.prop("contenteditable",
			span.prop("contenteditable") == "true" ? "false" : "true");
	if (span.prop("contenteditable") == "false") {
		var id = obj.className.substring(0, obj.className.length - 1);
		for (var i=0;i<listMessages.length;i++)
			if (listMessages[i].id == id) {
				addMessage(theMessage(span.text(), listMessages[i].login));
				listMessages.splice(i,1);
				break;
			}
		store(listMessages);
	}
}

function del(obj) {
	var id = obj.className.substring(0, obj.className.length - 1);
	for (var i=0;i<listMessages.length;i++)
		if (listMessages[i].id == id) {
			listMessages.splice(i,1);
			break;
		}
	store(listMessages);
	$(obj).parent().remove();
}

function save() {
	if ($("#text1").val() && $("#text2").val() && $("#text3").val()
			&& $("#text4").val()) {
		flagSave = true;
		login = $("#text3").val();
	}
}

function onKey(event) {
	if (event.keyCode == 13) {
		send_click();
		return false;
	}
}

function run() {
	var allMessages = restore();
	if (allMessages == null) {
		return;
	}
	for (var i = 0; i < allMessages.length; i++) {
		addMessage(allMessages[i]);
		output(allMessages[i]);
	}
}

function addMessage(message) {
	listMessages.push(message);
}

function restore() {
	var item = localStorage.getItem("listMessages");
	return item && JSON.parse(item);
}

function store(listMessages) {
	localStorage.setItem("listMessages", JSON.stringify(listMessages));
}

function output(message) {
	var edit = '<button class="' + message.id + 'e" id="buttonMessage" onclick="edit(this)">edit</button>';
	var remove = '<button class="' + message.id + 'r" id="buttonMessage" onclick="del(this)">remove</button>';
	$("#AreaMessages").append(
			'<div><span class="span1">' + message.login
					+ ': </span><span class="span2" id="' + message.id + '">' + message.message
					+ '</span>' + edit + remove + '</div>');
}