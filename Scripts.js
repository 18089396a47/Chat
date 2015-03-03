function send_click(){
	if (document.getElementById("textAreaMessages").value){
		document.getElementById("textAreaMessages").value+="\n"+document.getElementById("textArea").value;
	}
	else{
		document.getElementById("textAreaMessages").value=document.getElementById("textArea").value;
	}
	document.getElementById("textArea").value="";
}