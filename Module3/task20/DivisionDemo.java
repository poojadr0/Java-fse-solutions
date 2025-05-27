import java.util.Scanner;

public class DivisionDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter first number: ");
            int num1 = scanner.nextInt();
            
            System.out.print("Enter second number: ");
            int num2 = scanner.nextInt();
            
            try {
                int result = num1 / num2;
                System.out.println("Result: " + result);
            } catch (ArithmeticException e) {
                System.out.println("Error: Cannot divide by zero!");
            }
            
        } catch (Exception e) {
            System.out.println("Error: Please enter valid integers.");
        } finally {
            scanner.close();
        }
    }
} 