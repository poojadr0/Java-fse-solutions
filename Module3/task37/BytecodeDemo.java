package Module3.task37;

public class BytecodeDemo {
    private int value;
    
    public BytecodeDemo(int value) {
        this.value = value;
    }
    
    public int calculate(int x, int y) {
        int sum = x + y;
        int product = x * y;
        return sum + product + this.value;
    }
    
    public static void main(String[] args) {
        BytecodeDemo demo = new BytecodeDemo(10);
        int result = demo.calculate(5, 3);
        System.out.println("Result: " + result);
    }
} 