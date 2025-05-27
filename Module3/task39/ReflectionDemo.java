package Module3.task39;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionDemo {
    public static void main(String[] args) {
        try {
            // Load the class dynamically
            Class<?> targetClass = Class.forName("Module3.task39.TargetClass");
            Object instance = targetClass.getDeclaredConstructor().newInstance();

            // Get all declared methods
            Method[] methods = targetClass.getDeclaredMethods();
            System.out.println("Available methods:");
            for (Method method : methods) {
                System.out.println("\nMethod: " + method.getName());
                System.out.println("Parameters:");
                for (Parameter param : method.getParameters()) {
                    System.out.println("  - " + param.getType().getName() + " " + param.getName());
                }
            }

            // Invoke a specific method
            Method targetMethod = targetClass.getDeclaredMethod("greet", String.class);
            String result = (String) targetMethod.invoke(instance, "World");
            System.out.println("\nMethod invocation result: " + result);

            // Invoke private method
            Method privateMethod = targetClass.getDeclaredMethod("privateMethod");
            privateMethod.setAccessible(true);
            privateMethod.invoke(instance);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 