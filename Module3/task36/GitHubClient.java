package Module3.task36;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class GitHubClient {
    private static final String GITHUB_API_URL = "https://api.github.com/users/";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Please provide a GitHub username as an argument");
            return;
        }

        String username = args[0];
        fetchUserData(username);
    }

    private static void fetchUserData(String username) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GITHUB_API_URL + username))
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Status Code: " + response.statusCode());
            System.out.println("Response Body:");
            System.out.println(response.body());

        } catch (Exception e) {
            System.err.println("Error fetching data: " + e.getMessage());
        }
    }
} 