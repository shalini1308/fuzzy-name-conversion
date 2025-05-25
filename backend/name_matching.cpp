#include <iostream>
#include <pqxx/pqxx>  // PostgreSQL connection library
#include <rapidfuzz/rapidfuzz_all.hpp>  // Include amalgamated header for RapidFuzz
#include <vector>
#include <string>
#include <algorithm>
#include <nlohmann/json.hpp> // For JSON handling (use nlohmann/json library)

using json = nlohmann::json;

struct Record {
    std::string name;
    std::string gender;
    int age;
    std::string caseType;
    std::string caseFIR;
    std::string location;
};

// Fetch data from PostgreSQL database
std::vector<Record> fetchRecordsFromDB(const std::string& connStr) {
    std::vector<Record> records;
    try {
        pqxx::connection conn(connStr);
        pqxx::work txn(conn);

        // Adjusted query to match the exact column names from the table
        std::string query = R"(SELECT "names", "voter_gender", "age", "casetype", "casefir", "location" FROM "Names_individuals";)";
        pqxx::result result = txn.exec(query);

        // Iterate over the results and populate the records vector
        for (auto row : result) {
            records.push_back({
                row["Names"].c_str(),
                row["voter_gender"].c_str(),
                row["age"].as<int>(),
                row["casetype"].c_str(),
                row["casefir"].c_str(),
                row["location"].c_str()
            });
        }
    } catch (const std::exception& e) {
        std::cerr << "Database Error: " << e.what() << std::endl;
    }
    return records;
}

// Suggest names based on partial input using RapidFuzz
std::vector<json> suggestNames(const std::string& input, const std::vector<Record>& records, int limit = 10) {
    std::vector<json> suggestions;

    // Loop through each record and compare names using RapidFuzz
    for (const auto& record : records) {
        // Use RapidFuzz for partial ratio calculation
        double score = rapidfuzz::fuzz::partial_ratio(input, record.name);
        if (score > 60.0) {
            suggestions.push_back({
                {"name", record.name},
                {"age", record.age},
                {"location", record.location},
                {"score", score}
            });
        }
    }

    // Sort suggestions by score in descending order
    std::sort(suggestions.begin(), suggestions.end(), [](const json& a, const json& b) {
        return a["score"] > b["score"];
    });

    // Limit the results
    if (suggestions.size() > static_cast<size_t>(limit)) {
        suggestions.resize(limit);
    }

    return suggestions;
}

// Search names with detailed results
std::vector<json> searchNames(const std::string& input, const std::vector<Record>& records) {
    std::vector<json> results;

    // Loop through each record and compare names using RapidFuzz
    for (const auto& record : records) {
        double score = rapidfuzz::fuzz::ratio(input, record.name);
        if (score > 60.0) {
            results.push_back({
                {"name", record.name},
                {"age", record.age},
                {"caseType", record.caseType},
                {"caseFIR", record.caseFIR},
                {"location", record.location},
                {"score", score}
            });
        }
    }

    // Sort results by score in descending order
    std::sort(results.begin(), results.end(), [](const json& a, const json& b) {
        return a["score"] > b["score"];
    });

    return results;
}

int main() {
    // Database connection string (adjusted with your database credentials)
    const std::string connStr = "dbname=Names user=postgres password=hari@2004 host=localhost port=5432";

    // Fetch data from the database
    std::vector<Record> records = fetchRecordsFromDB(connStr);

    if (records.empty()) {
        std::cerr << "No records found in the database." << std::endl;
        return 1;
    }

    // Input for testing
    std::string inputName;
    std::cout << "Enter a name to search: ";
    std::getline(std::cin, inputName);

    // Suggest names based on partial input
    std::vector<json> suggestions = suggestNames(inputName, records);
    std::cout << "Suggestions: ";
    for (const auto& suggestion : suggestions) {
        std::cout << suggestion.dump(4) << std::endl;
    }

    // Search names with detailed results
    std::vector<json> searchResults = searchNames(inputName, records);
    std::cout << "Search Results: ";
    for (const auto& result : searchResults) {
        std::cout << result.dump(4) << std::endl;
    }

    return 0;
}
