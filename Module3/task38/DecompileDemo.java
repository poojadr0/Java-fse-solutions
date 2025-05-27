package Module3.task38;

import java.util.ArrayList;
import java.util.List;

public class DecompileDemo {
    private List<String> items;
    private int count;
    
    public DecompileDemo() {
        this.items = new ArrayList<>();
        this.count = 0;
    }
    
    public void addItem(String item) {
        items.add(item);
        count++;
    }
    
    public String getItem(int index) {
        if (index >= 0 && index < items.size()) {
            return items.get(index);
        }
        return null;
    }
    
    public int getCount() {
        return count;
    }
    
    public static void main(String[] args) {
        DecompileDemo demo = new DecompileDemo();
        demo.addItem("First");
        demo.addItem("Second");
        demo.addItem("Third");
        
        System.out.println("Count: " + demo.getCount());
        System.out.println("Item at index 1: " + demo.getItem(1));
    }
} 