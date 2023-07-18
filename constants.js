let RouterABI = [
    {
        inputs: [
            { internalType: "uint256", name: "amountIn", type: "uint256" },
            { internalType: "address[]", name: "path", type: "address[]" },
        ],
        name: "getAmountsOut",
        outputs: [
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
];

// Router V2 
let uniswap_address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
let pancake_address = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


module.exports = {
    RouterABI,
    uniswap_address,
    pancake_address,
    USDT,
    USDC
}