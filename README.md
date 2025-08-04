_π
This is an n8n community node. It lets you use SM2 cryptographic operations in your n8n workflows.

SM2 is a public-key cryptography algorithm based on elliptic curves, part of the Chinese National Cryptographic Standard (GM/T 0003-2012). This node provides secure encryption and decryption capabilities using the SM2 algorithm.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Install the package:
```bash
npm install n8n-nodes-sm2-crypto
```

## Operations

This node supports the following operations:

- **Encrypt**: Encrypt plaintext data using an SM2 public key
- **Decrypt**: Decrypt ciphertext using an SM2 private key

## Compatibility

- Minimum n8n version: 1.0.0
- Node.js version: >=20.15
- Tested with n8n versions: 1.x

## Usage

### Basic Setup

1. Add the SM2 Crypto node to your workflow
2. Select the operation (Encrypt or Decrypt)
3. Provide the appropriate key:
   - For **Encrypt**: Use the SM2 public key
   - For **Decrypt**: Use the SM2 private key
4. Specify the input field name containing the data to process

### Input Configuration

- **Operation**: Choose between "Encrypt" or "Decrypt"
- **Token (Key)**: 
  - For encryption: SM2 public key (hex format)
  - For decryption: SM2 private key (hex format)
- **Input Field Name**: Name of the field in your input data that contains the text to encrypt/decrypt (default: "data")

### Output

The node adds the result to your data:
- **Encryption**: Adds a `ciphertext` field with the encrypted data (prefixed with '04')
- **Decryption**: Adds a `plaintext` field with the decrypted data
- **Error**: If an error occurs, an `error` field is added with the error message

### Example Usage

**Encryption Example:**
```json
Input: { "data": "Hello, World!" }
Output: { "data": "Hello, World!", "ciphertext": "04..." }
```

**Decryption Example:**
```json
Input: { "data": "04..." }
Output: { "data": "04...", "plaintext": "Hello, World!" }
```

### Key Format

Keys should be provided in hexadecimal format:
- Public keys: 64-character hex string (uncompressed format without '04' prefix)
- Private keys: 64-character hex string

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [SM2 Cryptographic Algorithm Specification](https://tools.ietf.org/html/draft-shen-sm2-ecdsa-02)
* [sm-crypto library documentation](https://github.com/JuneAndGreen/sm-crypto)

## License

[MIT](LICENSE.md)
