import java.util.Scanner;

public class PalindromeChecker {
    public static boolean isPalindrome(String str) {
        // Remove non-alphanumeric characters and convert to lowercase
        String cleaned = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        
        // Check if the string is a palindrome
        int left = 0;
        int right = cleaned.length() - 1;
        
        while (left < right) {
            if (cleaned.charAt(left) != cleaned.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a string: ");
            String input = scanner.nextLine();
            
            if (isPalindrome(input)) {
                System.out.println("The string is a palindrome.");
            } else {
                System.out.println("The string is not a palindrome.");
            }
            
        } catch (Exception e) {
            System.out.println("Error: An unexpected error occurred.");
        } finally {
            scanner.close();
        }
    }
} 