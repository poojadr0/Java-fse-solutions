import java.util.Scanner;

public class ArraySumAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter the number of elements: ");
            if (!scanner.hasNextInt()) {
                System.out.println("Error: Please enter a valid integer for the number of elements.");
                return;
            }
            
            int n = scanner.nextInt();
            
            if (n <= 0) {
                System.out.println("Error: Please enter a positive number of elements.");
                return;
            }
            
            if (n > 1000) {
                System.out.println("Warning: Large number of elements may affect performance.");
            }
            
            double[] numbers = new double[n];
            double sum = 0;
            
            System.out.println("Enter " + n + " numbers:");
            for (int i = 0; i < n; i++) {
                if (!scanner.hasNextDouble()) {
                    System.out.println("Error: Please enter valid numbers only.");
                    return;
                }
                numbers[i] = scanner.nextDouble();
                sum += numbers[i];
            }
            
            double average = sum / n;
            
            System.out.println("\nResults:");
            System.out.println("Sum: " + String.format("%.2f", sum));
            System.out.println("Average: " + String.format("%.2f", average));
            
        } catch (Exception e) {
            System.out.println("Error: An unexpected error occurred.");
        } finally {
            scanner.close();
        }
    }
} 