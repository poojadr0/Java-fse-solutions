public class MusicDemo {
    public static void main(String[] args) {
        // Create instances of both instruments
        Playable guitar = new Guitar();
        Playable piano = new Piano();
        
        // Play both instruments
        System.out.println("Playing the guitar:");
        guitar.play();
        
        System.out.println("\nPlaying the piano:");
        piano.play();
    }
} 