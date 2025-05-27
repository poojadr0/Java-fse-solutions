package Module3.task40;

public class VirtualThreadDemo {
    private static final int THREAD_COUNT = 100_000;
    
    public static void main(String[] args) {
        // Test with virtual threads
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < THREAD_COUNT; i++) {
            final int threadNum = i;
            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + threadNum + " running");
            });
        }
        long virtualThreadTime = System.currentTimeMillis() - startTime;
        
        // Test with platform threads
        startTime = System.currentTimeMillis();
        for (int i = 0; i < THREAD_COUNT; i++) {
            final int threadNum = i;
            new Thread(() -> {
                System.out.println("Platform Thread " + threadNum + " running");
            }).start();
        }
        long platformThreadTime = System.currentTimeMillis() - startTime;
        
        System.out.println("\nPerformance Comparison:");
        System.out.println("Virtual Threads Time: " + virtualThreadTime + "ms");
        System.out.println("Platform Threads Time: " + platformThreadTime + "ms");
    }
} 