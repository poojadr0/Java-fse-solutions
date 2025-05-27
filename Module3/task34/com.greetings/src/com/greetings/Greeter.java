package com.greetings;

import com.utils.StringUtils;

public class Greeter {
    public static void main(String[] args) {
        String name = "world";
        if (args.length > 0) {
            name = args[0];
        }
        
        String capitalized = StringUtils.capitalize(name);
        String reversed = StringUtils.reverse(name);
        
        System.out.println("Hello, " + capitalized + "!");
        System.out.println("Your name reversed is: " + reversed);
    }
} 