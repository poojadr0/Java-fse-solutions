import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        int numberToGuess = random.nextInt(100) + 1;
        int attempts = 0;
        boolean hasWon = false;
        
        System.out.println("Welcome to the Number Guessing Game!");
        System.out.println("I'm thinking of a number between 1 and 100.");
        
        while (!hasWon && attempts < 10) {
            System.out.print("\nEnter your guess: ");
            int guess = scanner.nextInt();
            attempts++;
            
            if (guess < numberToGuess) {
                System.out.println("Too low! Try again.");
            } else if (guess > numberToGuess) {
                System.out.println("Too high! Try again.");
            } else {
                hasWon = true;
                System.out.println("Congratulations! You've guessed the number in " + attempts + " attempts!");
            }
        }
        
        if (!hasWon) {
            System.out.println("\nGame Over! The number was " + numberToGuess);
        }
        
        scanner.close();
    }
} 