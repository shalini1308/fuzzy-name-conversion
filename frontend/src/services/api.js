import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const searchName = async (name) => {
  try {
    const response = await axios.post(`${BASE_URL}/search`, { name });
    console.log("Full API Response:", response);
    return response.data.results || [];
  } catch (error) {
    handleApiError(error, "fetching data");
    return [];
  }
};

export const suggestName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/suggest`, {
      params: { name },
    });
    console.log("Suggestion API Response:", response);
    if (response.data.suggestions && Array.isArray(response.data.suggestions)) {
      return response.data.suggestions.map((item) => item.name);
    }
    return [];
  } catch (error) {
    handleApiError(error, "fetching suggestions");
    return [];
  }
};

export const addNewRecord = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-record`, data);
    console.log("Add Record API Response:", response);
    if (response.status === 201 && response.data.record) {
      return response.data.record;
    }
    throw new Error(response.data.error || "Failed to add the record.");
  } catch (error) {
    handleApiError(error, "adding a new record");
    throw error;
  }
};

const handleApiError = (error, action) => {
  console.error(`Error during ${action}:`, error);
  if (error.response?.data?.error) {
    alert(error.response.data.error);
  } else {
    alert(`Error occurred during ${action}. Please try again later.`);
  }
};

