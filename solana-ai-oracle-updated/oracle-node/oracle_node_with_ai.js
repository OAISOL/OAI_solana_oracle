
const { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } = require("@solana/web3.js");
const borsh = require("borsh");
const tf = require("@tensorflow/tfjs-node");

class OracleInstruction {
    static schema = new Map([
        [OracleInstruction, { kind: "struct", fields: [["value", "string"]] }],
    ]);

    constructor({ value }) {
        this.value = value;
    }
}

async function predictTrend() {
    const model = await tf.loadLayersModel("file://./model/model.json");
    const historicalData = [45000, 46000, 45500, 47000, 46500];
    const input = tf.tensor2d([historicalData], [1, historicalData.length]);

    const prediction = model.predict(input);
    const trend = prediction.dataSync()[0] > 0.5 ? "uptrend" : "downtrend";
    return trend;
}

async function submitData(connection, payer, programId, oracleAccount, data) {
    const instructionData = Buffer.from(
        borsh.serialize(
            OracleInstruction.schema,
            new OracleInstruction({ value: data })
        )
    );

    const transaction = new Transaction().add({
        keys: [{ pubkey: oracleAccount.publicKey, isSigner: false, isWritable: true }],
        programId,
        data: instructionData,
    });

    await sendAndConfirmTransaction(connection, transaction, [payer]);
}

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const payer = Keypair.generate();
    const programId = new PublicKey("<PROGRAM_ID>");
    const oracleAccount = Keypair.generate();

    await connection.requestAirdrop(payer.publicKey, 2 * 10 ** 9);

    const aiPrediction = await predictTrend();
    await submitData(connection, payer, programId, oracleAccount, aiPrediction);
})();
