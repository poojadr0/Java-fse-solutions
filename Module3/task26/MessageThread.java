public class MessageThread extends Thread {
    private String message;
    private int count;
    
    public MessageThread(String message, int count) {
        this.message = message;
        this.count = count;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(message + " - Count: " + i);
            try {
                Thread.sleep(500); // Sleep for 500ms between messages
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted: " + e.getMessage());
            }
        }
    }
    
    public static void main(String[] args) {
        // Create two threads
        MessageThread thread1 = new MessageThread("Thread 1", 5);
        MessageThread thread2 = new MessageThread("Thread 2", 5);
        
        // Start both threads
        thread1.start();
        thread2.start();
        
        try {
            // Wait for both threads to complete
            thread1.join();
            thread2.join();
            System.out.println("Both threads have completed.");
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted: " + e.getMessage());
        }
    }
} 