import java.util.Scanner;

public class StringReversal {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a string: ");
            String input = scanner.nextLine();
            
            StringBuilder reversed = new StringBuilder(input).reverse();
            
            System.out.println("Original string: " + input);
            System.out.println("Reversed string: " + reversed);
            
        } catch (Exception e) {
            System.out.println("Error: An unexpected error occurred.");
        } finally {
            scanner.close();
        }
    }
} 