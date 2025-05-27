public class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
    
    public static void main(String[] args) {
        // Create instances of both classes
        Animal animal = new Animal();
        Dog dog = new Dog();
        
        // Call makeSound() on both objects
        System.out.println("Animal sound:");
        animal.makeSound();
        
        System.out.println("\nDog sound:");
        dog.makeSound();
    }
} 