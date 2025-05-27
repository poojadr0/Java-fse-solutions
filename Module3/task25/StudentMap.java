import java.util.HashMap;
import java.util.Scanner;

public class StudentMap {
    public static void main(String[] args) {
        HashMap<Integer, String> students = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        
        try {
            while (true) {
                System.out.println("\n1. Add student");
                System.out.println("2. Find student by ID");
                System.out.println("3. Display all students");
                System.out.println("4. Exit");
                System.out.print("Enter your choice (1-4): ");
                
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline
                
                switch (choice) {
                    case 1:
                        System.out.print("Enter student ID: ");
                        int id = scanner.nextInt();
                        scanner.nextLine(); // Consume newline
                        System.out.print("Enter student name: ");
                        String name = scanner.nextLine();
                        students.put(id, name);
                        System.out.println("Student added successfully!");
                        break;
                        
                    case 2:
                        System.out.print("Enter student ID to find: ");
                        int searchId = scanner.nextInt();
                        String foundName = students.get(searchId);
                        if (foundName != null) {
                            System.out.println("Student found: " + foundName);
                        } else {
                            System.out.println("No student found with ID: " + searchId);
                        }
                        break;
                        
                    case 3:
                        if (students.isEmpty()) {
                            System.out.println("No students in the database.");
                        } else {
                            System.out.println("\nStudent Database:");
                            for (HashMap.Entry<Integer, String> entry : students.entrySet()) {
                                System.out.println("ID: " + entry.getKey() + ", Name: " + entry.getValue());
                            }
                        }
                        break;
                        
                    case 4:
                        System.out.println("Goodbye!");
                        return;
                        
                    default:
                        System.out.println("Invalid choice. Please try again.");
                }
            }
        } catch (Exception e) {
            System.out.println("Error: An unexpected error occurred.");
        } finally {
            scanner.close();
        }
    }
} 