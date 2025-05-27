import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AccountTransfer {
    private static final String URL = "jdbc:mysql://localhost:3306/bankdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    public boolean transferMoney(int fromAccount, int toAccount, double amount) {
        String debitQuery = "UPDATE accounts SET balance = balance - ? WHERE account_id = ? AND balance >= ?";
        String creditQuery = "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";
        
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            conn.setAutoCommit(false);
            
            try {
                try (PreparedStatement debitStmt = conn.prepareStatement(debitQuery)) {
                    debitStmt.setDouble(1, amount);
                    debitStmt.setInt(2, fromAccount);
                    debitStmt.setDouble(3, amount);
                    
                    int rowsAffected = debitStmt.executeUpdate();
                    if (rowsAffected == 0) {
                        throw new SQLException("Insufficient funds or account not found");
                    }
                }
                
                try (PreparedStatement creditStmt = conn.prepareStatement(creditQuery)) {
                    creditStmt.setDouble(1, amount);
                    creditStmt.setInt(2, toAccount);
                    
                    int rowsAffected = creditStmt.executeUpdate();
                    if (rowsAffected == 0) {
                        throw new SQLException("Destination account not found");
                    }
                }
                
                conn.commit();
                return true;
                
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transfer failed: " + e.getMessage());
                return false;
            } finally {
                conn.setAutoCommit(true);
            }
            
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
            return false;
        }
    }
    
    public static void main(String[] args) {
        AccountTransfer transfer = new AccountTransfer();
        
        System.out.println("Attempting to transfer $100 from account 1 to account 2...");
        boolean success = transfer.transferMoney(1, 2, 100.0);
        System.out.println("Transfer " + (success ? "successful" : "failed"));
    }
} 