# AI Project: Code Review and Bug Fixing

This project is an AI-powered tool that allows users to submit their code for review and automatically fixes bugs. It features a single route for code reviewing and uses Gemini AI for its analysis. it uses gemini AI

## Features

- **Code Review**: Submit your code and get an AI-generated review.
- **Bug Fixing**: Automatically detects and fixes bugs in the submitted code.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ai-project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ai-project
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Use the following route to submit your code for review:
    ```
    POST /review
    ```
    - **Request Body**: JSON object containing the code to be reviewed.
    - **Response**: JSON object with the review and fixed code.

## Example

### Request
```json
POST /review
{
    "code": "function add(a, b) { return a + b; }"
}
```

### Response
```json
{
    "review": "The code is correct but lacks error handling.",
    "fixedCode": "function add(a, b) { if (typeof a !== 'number' || typeof b !== 'number') { throw new Error('Invalid input'); } return a + b; }"
}
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.