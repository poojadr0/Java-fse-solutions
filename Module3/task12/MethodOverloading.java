package Module3.task12;

public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        System.out.println("Adding two integers: " + add(5, 3));
        System.out.println("Adding two doubles: " + add(5.5, 3.3));
        System.out.println("Adding three integers: " + add(5, 3, 2));
    }
} 