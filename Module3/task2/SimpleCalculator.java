import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.println("\nChoose operation:");
        System.out.println("1. Addition (+)");
        System.out.println("2. Subtraction (-)");
        System.out.println("3. Multiplication (*)");
        System.out.println("4. Division (/)");
        System.out.print("Enter your choice (1-4): ");
        int choice = scanner.nextInt();
        
        double result = 0;
        String operation = "";
        
        switch (choice) {
            case 1:
                result = num1 + num2;
                operation = "+";
                break;
            case 2:
                result = num1 - num2;
                operation = "-";
                break;
            case 3:
                result = num1 * num2;
                operation = "*";
                break;
            case 4:
                if (num2 != 0) {
                    result = num1 / num2;
                    operation = "/";
                } else {
                    System.out.println("Error: Cannot divide by zero!");
                    scanner.close();
                    return;
                }
                break;
            default:
                System.out.println("Invalid choice!");
                scanner.close();
                return;
        }
        
        System.out.printf("\nResult: %.2f %s %.2f = %.2f", num1, operation, num2, result);
        
        scanner.close();
    }
} 