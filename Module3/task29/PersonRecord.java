import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

// Define a record for Person
record Person(String name, int age) {}

public class PersonRecord {
    public static void main(String[] args) {
        // Create a list of Person records
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 17),
            new Person("Charlie", 30),
            new Person("David", 16),
            new Person("Eve", 22)
        );
        
        System.out.println("All people:");
        people.forEach(System.out::println);
        
        // Filter people who are 18 or older using Streams
        List<Person> adults = people.stream()
            .filter(p -> p.age() >= 18)
            .collect(Collectors.toList());
            
        System.out.println("\nAdults (18 or older):");
        adults.forEach(System.out::println);
        
        // Calculate average age of adults
        double averageAge = adults.stream()
            .mapToInt(Person::age)
            .average()
            .orElse(0.0);
            
        System.out.println("\nAverage age of adults: " + averageAge);
    }
} 