var flagSave=false;
var login;
function send_click() {
	if (flagSave==false) {
		return;
	}
	var textVal=$("#textArea").val().replace(/\s+/g,' ');
	if ($("#textArea").val()=="" || $("#textArea").val()=="\n" || textVal==" ") {
		$("#textArea").val('');
		return;
	}
	$("#textArea").val($("#textArea").val().replace(/\s/g,'&nbsp;'));
	var edit = '<button class="edit-button" id="buttonMessage" onclick="edit(this)">edit</button>';
	var remove = '<button class="remove-button" id="buttonMessage" onclick="del(this)">remove</button>';
	$("#AreaMessages").append(
			'<div><span class="span1">' + login + ': </span><span class="span2">' + $("#textArea").val() + '</span>' + edit + remove
					+ '</div>');
	$("#textArea").val('');
	$("#AreaMessages").prop("scrollTop",$("#AreaMessages").prop("scrollHeight"));
}

function edit(obj) {
	var span = $(obj).parent().find('.span2');
	span.prop("contenteditable",
			span.prop("contenteditable") == "true" ? "false" : "true");

}

function del(obj) {
	$(obj).parent().remove();
}

function save() {
	if ($("#text1").val() && $("#text2").val() && $("#text3").val() && $("#text4").val()) {
		flagSave=true;
		login=$("#text3").val();
	}
}

function onKey(event) {
	if (event.keyCode == 13) {
		send_click();
		return false;
	}
}