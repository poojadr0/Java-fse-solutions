import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class BasicJDBC {
    // Database connection parameters
    private static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    public static void main(String[] args) {
        try {
            // Load the JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Create connection
            try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
                System.out.println("Connected to database successfully!");
                
                // Create statement
                try (Statement stmt = conn.createStatement()) {
                    // Execute query
                    String query = "SELECT * FROM students";
                    try (ResultSet rs = stmt.executeQuery(query)) {
                        // Process results
                        System.out.println("\nStudent Records:");
                        System.out.println("ID\tName\t\tAge");
                        System.out.println("------------------------");
                        
                        while (rs.next()) {
                            int id = rs.getInt("id");
                            String name = rs.getString("name");
                            int age = rs.getInt("age");
                            System.out.printf("%d\t%-15s\t%d%n", id, name, age);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 