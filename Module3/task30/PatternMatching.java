public class PatternMatching {
    public static String getTypeInfo(Object obj) {
        return switch (obj) {
            case String s -> "String: " + s + " (length: " + s.length() + ")";
            case Integer i -> "Integer: " + i + " (double value: " + i.doubleValue() + ")";
            case Double d -> "Double: " + d + " (int value: " + d.intValue() + ")";
            case Boolean b -> "Boolean: " + b;
            case null -> "Null value";
            default -> "Unknown type: " + obj.getClass().getSimpleName();
        };
    }
    
    public static void main(String[] args) {
        // Test with different types
        Object[] testObjects = {
            "Hello, World!",
            42,
            3.14,
            true,
            null,
            new int[]{1, 2, 3}
        };
        
        // Process each object
        for (Object obj : testObjects) {
            System.out.println(getTypeInfo(obj));
        }
    }
} 