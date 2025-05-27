public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;
        int result3 = 10 + 5 * 2 - 3;
        int result4 = 10 + (5 * 2) - 3;
        
        System.out.println("Expression 1: 10 + 5 * 2 = " + result1);
        System.out.println("Expression 2: (10 + 5) * 2 = " + result2);
        System.out.println("Expression 3: 10 + 5 * 2 - 3 = " + result3);
        System.out.println("Expression 4: 10 + (5 * 2) - 3 = " + result4);
        
        System.out.println("\nOrder of operations:");
        System.out.println("1. Parentheses ()");
        System.out.println("2. Multiplication/Division * /");
        System.out.println("3. Addition/Subtraction + -");
    }
} 