# Password Leak Checker

A command-line tool to check if your passwords have been exposed in known data breaches using the Have I Been Pwned API.

## Features

- Interactive CLI interface
- Secure password input (hidden while typing)
- K-Anonymity: Only the first 5 characters of the password hash are sent to the API
- Real-time checking against known data breaches
- Color-coded results for better visibility
- Loading spinner for better user experience

## Installation

1. Clone this repository:

```bash
git clone git@github.com:KingTenet/leakCheck.git
cd leakCheck
```

2. Install dependencies:

```bash
npm install
```

## Usage

Run the tool:

```bash
npm start
```

The tool will:

1. Prompt you to enter a password
2. Check if the password has been exposed in known data breaches
3. Show the results with appropriate recommendations
4. Allow you to check another password or exit

To exit the program, simply press Enter without typing a password.

## Security

This tool uses the [Have I Been Pwned API](https://haveibeenpwned.com/API/v3) and implements the k-anonymity model to ensure your password is never sent over the network:

1. Your password is hashed locally using SHA-1
2. Only the first 5 characters of the hash are sent to the API
3. The API returns a list of hash suffixes that match the prefix
4. The complete hash is compared locally to check if your password has been exposed

## Dependencies

- `inquirer` - Interactive CLI interface
- `chalk` - Terminal string styling
- `ora` - Elegant terminal spinners
- `node-fetch` - HTTP client
- `crypto` - Cryptographic functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
