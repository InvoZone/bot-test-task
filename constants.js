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

let FactoryABI = [
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "getPair",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  let PoolABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            { "internalType": "uint112", "name": "_reserve0", "type": "uint112" },
            { "internalType": "uint112", "name": "_reserve1", "type": "uint112" },
            {
                "internalType": "uint32",
                "name": "_blockTimestampLast",
                "type": "uint32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
  ]

// Router V2 
let uniswap_address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
let pancake_address = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";

// Factory
let uniswap_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
let pancake_factory = "0x1097053Fd2ea711dad45caCcc45EfF7548fCB362"

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const usdt_usdc = {
    address1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol1: "USDT",
    address2: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol2: "USDC"
  }

const usdc_usdt = {
    address1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol1: "USDC",
    address2: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol2: "USDT"
  }



module.exports = {
    RouterABI,
    FactoryABI,
    PoolABI,
    uniswap_address,
    pancake_address,
    uniswap_factory,
    pancake_factory,
    usdt_usdc,
    usdc_usdt,
    USDT,
    USDC
}