/* eslint-disable @typescript-eslint/no-explicit-any */

// Function to convert an object of parameters into a URL-encoded form body
export function getFormBody(params: any) {
  const formBody = []; // Initialize an array to hold key-value pairs

  // Loop through each property in the input object
  for (const property in params) {
    const encodedKey = encodeURIComponent(property); // Encode the property name to ensure it is safe for use in a URL
    const encodedValue = encodeURIComponent(params[property]); // Encode the property value similarly

    // Combine the encoded key and value in "key=value" format and add to the formBody array
    formBody.push(encodedKey + "=" + encodedValue);
  }

  // Join all key-value pairs with '&' to form the final URL-encoded string
  return formBody.join("&");
}
