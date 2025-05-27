package Module3.task41;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class ExecutorServiceDemo {
    private static final int TASK_COUNT = 10;
    private static final AtomicInteger counter = new AtomicInteger(0);
    
    public static void main(String[] args) {
        // Create a fixed thread pool
        ExecutorService executor = Executors.newFixedThreadPool(4);
        List<Future<Integer>> futures = new ArrayList<>();
        
        // Submit callable tasks
        for (int i = 0; i < TASK_COUNT; i++) {
            final int taskId = i;
            Future<Integer> future = executor.submit(() -> {
                // Simulate some work
                Thread.sleep(1000);
                int result = counter.incrementAndGet();
                System.out.println("Task " + taskId + " completed with result: " + result);
                return result;
            });
            futures.add(future);
        }
        
        // Collect results
        try {
            for (int i = 0; i < futures.size(); i++) {
                Future<Integer> future = futures.get(i);
                try {
                    Integer result = future.get(2, TimeUnit.SECONDS);
                    System.out.println("Retrieved result for task " + i + ": " + result);
                } catch (TimeoutException e) {
                    System.err.println("Task " + i + " timed out");
                }
            }
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error retrieving results: " + e.getMessage());
        } finally {
            executor.shutdown();
            try {
                if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                    executor.shutdownNow();
                }
            } catch (InterruptedException e) {
                executor.shutdownNow();
            }
        }
    }
} 