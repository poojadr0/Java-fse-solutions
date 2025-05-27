import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class StudentDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    // Insert a new student
    public boolean insertStudent(String name, int age) {
        String query = "INSERT INTO students (name, age) VALUES (?, ?)";
        
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
            
        } catch (SQLException e) {
            System.out.println("Error inserting student: " + e.getMessage());
            return false;
        }
    }
    
    // Update student details
    public boolean updateStudent(int id, String name, int age) {
        String query = "UPDATE students SET name = ?, age = ? WHERE id = ?";
        
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.setInt(3, id);
            
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
            
        } catch (SQLException e) {
            System.out.println("Error updating student: " + e.getMessage());
            return false;
        }
    }
    
    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        
        // Test insert operation
        System.out.println("Inserting new student...");
        boolean insertSuccess = dao.insertStudent("John Doe", 20);
        System.out.println("Insert " + (insertSuccess ? "successful" : "failed"));
        
        // Test update operation
        System.out.println("\nUpdating student...");
        boolean updateSuccess = dao.updateStudent(1, "John Smith", 21);
        System.out.println("Update " + (updateSuccess ? "successful" : "failed"));
    }
} 