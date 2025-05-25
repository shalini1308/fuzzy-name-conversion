#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

// Helper function to check if a character is a vowel
bool isVowel(char ch, const std::unordered_map<char, bool>& vowelMap) {
    return vowelMap.find(ch) != vowelMap.end();
}

// Process a string to modify characters based on rules
std::string processString(const std::string& input, const std::unordered_map<char, char>& charMap, const std::unordered_map<char, bool>& vowelMap) {
    std::string result;
    for (size_t i = 0; i < input.length(); ++i) {
        char current = input[i];

        if (current == '\u094D') { // Unicode for '्'
            if (!result.empty()) {
                result.pop_back();
                result.push_back('\u0905'); // Replace with default vowel
            }
        } else if (isVowel(current, vowelMap)) {
            result.push_back(current);
        } else if (charMap.find(current) != charMap.end()) {
            result.push_back(charMap.at(current));
        } else {
            result.push_back(current);
        }
    }
    return result;
}

int main() {
    // Define mappings for characters and vowels
    std::unordered_map<char, char> charMap = {
        {'\u0915', '\u093E'}, // Example mappings (replace as needed)
        {'\u0917', '\u0940'},
    };

    std::unordered_map<char, bool> vowelMap = {
        {'\u0905', true},
        {'\u0906', true},
        {'\u0907', true},
        {'\u0908', true},
    };

    // Input strings
    std::string h = "\u0915\u094D\u0917"; // Example input
    std::string k = "\u0917\u094D\u0915"; // Example input

    // Process both strings
    std::string resultH = processString(h, charMap, vowelMap);
    std::string resultK = processString(k, charMap, vowelMap);

    // Output results
    std::cout << "Processed H: " << resultH << std::endl;
    std::cout << "Processed K: " << resultK << std::endl;

    return 0;
}
