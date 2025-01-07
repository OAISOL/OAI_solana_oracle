
import React, { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const ORACLE_ACCOUNT = "<REPLACE_WITH_ORACLE_ACCOUNT>";
const CONNECTION_URL = "https://api.devnet.solana.com";

function App() {
    const [oracleData, setOracleData] = useState(null);

    const fetchOracleData = async () => {
        const connection = new Connection(CONNECTION_URL, "confirmed");
        const accountInfo = await connection.getAccountInfo(new PublicKey(ORACLE_ACCOUNT));
        if (accountInfo) {
            const data = new TextDecoder().decode(accountInfo.data);
            setOracleData(data);
        } else {
            console.error("No data found!");
        }
    };

    return (
        <div>
            <h1>Solana AI Oracle DApp</h1>
            <button onClick={fetchOracleData}>Fetch Oracle Data</button>
            {oracleData && <p>Oracle Prediction: {oracleData}</p>}
        </div>
    );
}

export default App;
