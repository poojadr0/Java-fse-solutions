public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleValue = 9.78;
        int intValue = (int) doubleValue;
        System.out.println("Double to int: " + doubleValue + " -> " + intValue);

        int anotherInt = 25;
        double anotherDouble = (double) anotherInt;
        System.out.println("Int to double: " + anotherInt + " -> " + anotherDouble);
    }
} 