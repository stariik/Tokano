// Shared constants and data across the application

// Wallet and blockchain constants
export const WALLET_CONFIG = {
  address: "0xjHbahb....35Uenu",
  solanaBalance: "0.002 SOL",
};
export const RPC_ENDPOINT =
  "https://powerful-white-violet.solana-devnet.quiknode.pro/2781db39052562abaaaca4f442d2c4978bd8e94e/";

// Token data - single source of truth
export const TOKENS = [
  {
    id: 1,
    name: "FIRED",
    icon: "🍔",
    balance: "45,230,000.123",
    ticker: "FIRED",
    tokenId: "0xabc1...def2",
    platform: "pump.fun",
  },
  {
    id: 2,
    name: "RAMSA",
    icon: "🐻",
    balance: "87,450,000.567",
    ticker: "RAMSA",
    tokenId: "0xdef3...abc4",
    platform: "pump.fun",
  },
  {
    id: 3,
    name: "LIMASIRA",
    icon: "👨‍💼",
    balance: "123,000,000.234",
    ticker: "LIMAS",
    tokenId: "0xfca9...ed1d",
    platform: "pump.fun",
  },
  {
    id: 4,
    name: "SYRIA",
    icon: "🌍",
    balance: "56,780,000.891",
    ticker: "SYRIA",
    tokenId: "0x1234...5678",
    platform: "pump.fun",
  },
  {
    id: 5,
    name: "NOGA",
    icon: "🦊",
    balance: "34,560,000.445",
    ticker: "NOGA",
    tokenId: "0x9876...4321",
    platform: "pump.fun",
  },
  {
    id: 6,
    name: "GAMNABULIN",
    icon: "🎮",
    balance: "78,920,000.667",
    ticker: "GAMNA",
    tokenId: "0xabcd...efgh",
    platform: "pump.fun",
  },
  {
    id: 7,
    name: "CRYPTO",
    icon: "💎",
    balance: "92,340,000.888",
    ticker: "CRYPTO",
    tokenId: "0x5678...9abc",
    platform: "pump.fun",
  },
  {
    id: 8,
    name: "MOON",
    icon: "🌙",
    balance: "65,420,000.321",
    ticker: "MOON",
    tokenId: "0x1a2b...3c4d",
    platform: "pump.fun",
  },
  {
    id: 9,
    name: "ROCKET",
    icon: "🚀",
    balance: "104,567,000.999",
    ticker: "ROCKET",
    tokenId: "0x9z8y...7x6w",
    platform: "pump.fun",
  },
  {
    id: 10,
    name: "DEGEN",
    icon: "🎯",
    balance: "88,765,000.432",
    ticker: "DEGEN",
    tokenId: "0x4e5f...6g7h",
    platform: "pump.fun",
  },
];

// Fund types configuration
export const FUND_TYPES = [
  {
    id: 1,
    title: "STAKING POOL",
    bgColor: "bg-gradient-to-br",
    gradientStyle: {
      light: "linear-gradient(135deg, #FFFFFF 0%, #DBD4EA 100%)",
      dark: "linear-gradient(90deg, #7F38D5 5%, #1B00B5 100%)",
    },
    textColor: "text-[#190E79] dark:text-white",
    buttonColor:
      "bg-[#1B00B5] hover:bg-[#1B00B5]/90 text-white dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 dark:text-[#0E1379]",
    iconBg: "bg-white bg-opacity-20",
    active: false,
  },
  {
    id: 2,
    title: "COMING SOON",
    bgColor: "bg-gradient-to-br",
    gradientStyle: {
      light: "linear-gradient(135deg, #FFFFFF 0%, #DBD4EA 100%)",
      dark: "linear-gradient(135deg, #7F38D5 0%, #1B00B5 100%)",
    },
    textColor: "text-[#190E79] dark:text-white",
    buttonColor:
      "bg-gray-400 cursor-not-allowed text-white dark:text-[#0E1379]",
    iconBg: "bg-white bg-opacity-20",
    disabled: true,
    active: false,
  },
  {
    id: 3,
    title: "LOCK FUNDS",
    bgColor: "bg-gradient-to-br",
    gradientStyle: {
      light: "linear-gradient(135deg, #FFFFFF 0%, #DBD4EA 100%)",
      dark: "linear-gradient(90deg, #F506B5 5%, #1C77E0 95%)",
    },
    textColor: "text-[#190E79] dark:text-white",
    buttonColor:
      "bg-[#1B00B5] hover:bg-[#1B00B5]/90 text-white dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 dark:text-[#0E1379]",
    iconBg: "bg-white bg-opacity-20",
    active: false,
  },
  {
    id: 4,
    title: "VEST FUNDS",
    bgColor: "bg-gradient-to-br",
    gradientStyle: {
      light: "linear-gradient(135deg, #FFFFFF 0%, #DBD4EA 100%)",
      dark: "linear-gradient(150deg, #1A1E5F 15%, #9D05A1 85%)",
    },
    textColor: "text-[#190E79] dark:text-white",
    buttonColor:
      "bg-[#1B00B5] hover:bg-[#1B00B5]/90 text-white dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 dark:text-[#0E1379]",
    iconBg: "bg-white bg-opacity-20",
    active: false,
  },
];

// Form field configurations for different fund types
export const FORM_CONFIGS = {
  "STAKING POOL": {
    fields: [
      {
        name: "activationDateTime",
        type: "datetime-local",
        label: "Activation Date and Time",
        required: true,
      },
      {
        name: "rewardAmount",
        type: "number",
        label: "Reward Amount",
        placeholder: "0",
        suffix: "tokens",
      },
      {
        name: "distributionLength",
        type: "number",
        label: "Distribution Length",
        defaultValue: 100,
        suffix: "days",
      },
      {
        name: "unstakingPeriod",
        type: "dual-number",
        label: "Unstaking Period",
        placeholder: "0",
        fields: [
          { name: "unstakingPeriodDays", suffix: "days", placeholder: "0" },
          { name: "unstakingPeriodHours", suffix: "hours", placeholder: "0" },
        ],
      },
    ],
    description: "pool activates for staking on",
    attentionMessage: "users can claim rewards every 24h",
  },
  "LOCK FUNDS": {
    fields: [
      {
        name: "lockDateTime",
        type: "datetime-local",
        label: "Lock Date and Time",
        required: true,
      },
      {
        name: "tokenAmount",
        type: "number",
        label: "Token Amount",
        placeholder: "0",
        suffix: "tokens",
      },
      {
        name: "releaseDate",
        type: "datetime-local",
        label: "Release Date",
        required: true,
      },
      {
        name: "recipientWallet",
        type: "text",
        label: "Recipient Wallet",
        placeholder: "Enter wallet address",
      },
    ],
    description: "tokens get locked on",
    attentionMessage:
      "tokens will not be transferred automatically and need to be claimed by owner.",
  },
  "VEST FUNDS": {
    fields: [
      {
        name: "activationDateTime",
        type: "datetime-local",
        label: "Activation Date and Time",
        required: true,
      },
      {
        name: "tokenAmount",
        type: "number",
        label: "Token Amount",
        placeholder: "0",
        suffix: "tokens",
      },
      {
        name: "cliffPeriod",
        type: "number",
        label: "Cliff Period",
        defaultValue: 100,
        suffix: "days",
      },
      {
        name: "releaseModel",
        type: "select",
        label: "Release Model",
        options: ["monthly", "weekly", "daily"],
        defaultValue: "monthly",
      },
      {
        name: "recipientWallet",
        type: "text",
        label: "Recipient Wallet",
        placeholder: "Enter wallet address",
      },
    ],
    description: "vesting activates on",
    attentionMessage: "users can claim rewards every 24h",
  },
};

// Helper functions
export const getTokenById = (id) => TOKENS.find((token) => token.id === id);
export const getFundTypeById = (id) =>
  FUND_TYPES.find((fund) => fund.id === id);
export const getFormConfig = (fundType) => FORM_CONFIGS[fundType] || null;
