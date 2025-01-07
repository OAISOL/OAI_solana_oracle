
# Solana AI Oracle

## Overview
This repository contains a decentralized oracle system built on Solana. It integrates AI for off-chain data processing and provides accurate on-chain data for Solana-based DApps.

## Features
- **AI-Powered Data**: Uses AI models for trend prediction (e.g., crypto market trends).
- **Decentralized Consensus**: Ensures reliable data through consensus among oracle nodes.
- **DApp Integration**: Includes a sample React DApp to fetch oracle data.

---

## Repository Structure

```
solana-ai-oracle/
├── smart-contract/      # Solana program in Rust
├── oracle-node/         # Oracle node with AI integration
├── sample-dapp/         # React-based sample DApp
├── scripts/             # Deployment and initialization scripts
```

---

## Prerequisites
- **Solana CLI** installed ([Install Guide](https://docs.solana.com/cli/install-solana-cli-tools)).
- **Rust** installed ([Install Guide](https://www.rust-lang.org/tools/install)).
- **Node.js** and **npm** installed.
- Python (for training AI models).

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/solana-ai-oracle.git
cd solana-ai-oracle
```

### 2. Deploy the Smart Contract
1. Navigate to the `smart-contract/` directory:
   ```bash
   cd smart-contract
   ```
2. Build and deploy the smart contract:
   ```bash
   cargo build-bpf --bpf-out-dir=../target/deploy
   solana program deploy ../target/deploy/solana_ai_oracle.so
   ```

### 3. Set Up the Oracle Node
1. Navigate to the `oracle-node/` directory:
   ```bash
   cd ../oracle-node
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Train the AI model (optional, pre-trained model included):
   ```bash
   python train_model.py
   ```
4. Run the Oracle Node:
   ```bash
   node oracle_node_with_ai.js
   ```

### 4. Run the Sample DApp
1. Navigate to the `sample-dapp/` directory:
   ```bash
   cd ../sample-dapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the DApp:
   ```bash
   npm start
   ```

---

## Usage
1. **Submit Data**: The Oracle Node processes AI data and submits it to the Solana smart contract.
2. **Finalize Consensus**: The contract finalizes consensus to ensure reliable data.
3. **Fetch Data**: The sample DApp fetches and displays oracle data.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT License
