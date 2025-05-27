package Module3.task39;

public class TargetClass {
    private String message = "Hello";
    
    public String greet(String name) {
        return message + ", " + name + "!";
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    private void privateMethod() {
        System.out.println("This is a private method");
    }
} 