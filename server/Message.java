import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Date;

public class Message {
	public String message, name;
	public long id;
	
	Message() {
		message = "";
		name = "";
		Date d = new Date();
		id = d.getTime();
	}
	
	Message(String message , String name) {
		this.message = message;
		this.name = name;
		Date d = new Date();
		id = d.getTime();
	}
	
	public void toMessage(String m) throws ParseException{
		this.message = (String)getJSONObject(m).get("message");
		this.name = (String)getJSONObject(m).get("name");
		this.id = (long)getJSONObject(m).get("id");
	}
	
	public JSONObject getJSONObject(String js) throws ParseException{
		JSONParser jsParser = new JSONParser();
		return (JSONObject)jsParser.parse(js.trim());
	}
	
	@Override
	public String toString() {
		JSONObject jsObject = new JSONObject();
		jsObject.put("message", message);
		jsObject.put("name", name);
		jsObject.put("id", id);
		return jsObject.toJSONString();
	}
}