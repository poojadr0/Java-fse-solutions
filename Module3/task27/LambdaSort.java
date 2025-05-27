import java.util.Arrays;
import java.util.List;
import java.util.Collections;

public class LambdaSort {
    public static void main(String[] args) {
        // Create a list of strings
        List<String> names = Arrays.asList(
            "Alice", "Charlie", "Bob", "David", "Eve"
        );
        
        System.out.println("Original list: " + names);
        
        // Sort using lambda expression (case-insensitive)
        Collections.sort(names, (a, b) -> a.compareToIgnoreCase(b));
        
        System.out.println("Sorted list: " + names);
        
        // Sort in reverse order using lambda
        Collections.sort(names, (a, b) -> b.compareToIgnoreCase(a));
        
        System.out.println("Reverse sorted list: " + names);
    }
} 