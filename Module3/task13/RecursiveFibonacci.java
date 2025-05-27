import java.util.Scanner;

public class RecursiveFibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a positive integer: ");
            if (!scanner.hasNextInt()) {
                System.out.println("Error: Please enter a valid integer.");
                return;
            }
            
            int n = scanner.nextInt();
            
            if (n < 0) {
                System.out.println("Error: Please enter a positive integer.");
            } else if (n > 40) {
                System.out.println("Warning: Large numbers may take a long time to calculate.");
                System.out.println("The " + n + "th Fibonacci number is: " + fibonacci(n));
            } else {
                System.out.println("The " + n + "th Fibonacci number is: " + fibonacci(n));
            }
        } catch (Exception e) {
            System.out.println("Error: An unexpected error occurred.");
        } finally {
            scanner.close();
        }
    }
} 