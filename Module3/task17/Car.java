public class Car {
    private String make;
    private String model;
    private int year;
    
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    public void displayDetails() {
        System.out.println("Car Details:");
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
    
    public static void main(String[] args) {
        // Create two car objects
        Car car1 = new Car("Toyota", "Camry", 2020);
        Car car2 = new Car("Honda", "Civic", 2021);
        
        // Display details of both cars
        System.out.println("First Car:");
        car1.displayDetails();
        
        System.out.println("\nSecond Car:");
        car2.displayDetails();
    }
} 