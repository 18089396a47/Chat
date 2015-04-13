import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Event {
	public String type;
	public Message message;
	public Event(String type, Message message) {
		this.type=type;
		this.message=message;
	}
	@Override
	public String toString() {
		return message.toString();
	}
}