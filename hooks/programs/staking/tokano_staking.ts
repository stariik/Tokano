/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tokano_staking.json`.
 */
export type TokanoStaking = {
  address: "Hpx8uRMgS8PAcANE223eMf4okXRCrCm5UT2W4Nv3PXAH";
  metadata: {
    name: "tokanoStaking";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "closePoolState";
      discriminator: [132, 78, 46, 12, 65, 129, 110, 98];
      accounts: [
        {
          name: "poolState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "closeUserState";
      discriminator: [127, 206, 172, 187, 146, 179, 215, 194];
      accounts: [
        {
          name: "userState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user_state.pool_address";
                account: "userState";
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "user_state.random_seed";
                account: "userState";
              }
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "getReward";
      discriminator: [221, 63, 124, 201, 96, 218, 238, 29];
      accounts: [
        {
          name: "poolState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "userState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "poolState";
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "user_state.random_seed";
                account: "userState";
              }
            ];
          };
        },
        {
          name: "rewardsAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "rewardsToAccount";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initStake";
      discriminator: [177, 156, 4, 57, 220, 174, 174, 155];
      accounts: [
        {
          name: "poolState";
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "userState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "poolState";
              },
              {
                kind: "account";
                path: "stakerUser";
              },
              {
                kind: "arg";
                path: "randomSeed";
              }
            ];
          };
        },
        {
          name: "stakerUser";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "randomSeed";
          type: {
            array: ["u8", 16];
          };
        }
      ];
    },
    {
      name: "initializePool";
      discriminator: [95, 180, 10, 172, 84, 174, 232, 40];
      accounts: [
        {
          name: "poolState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "initializer";
              },
              {
                kind: "account";
                path: "tokenMint";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "arg";
                path: "extraSeed";
              }
            ];
          };
        },
        {
          name: "poolTokensAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "initializer";
              },
              {
                kind: "account";
                path: "tokenMint";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108, 95, 116, 111, 107, 101, 110, 115];
              },
              {
                kind: "arg";
                path: "extraSeed";
              }
            ];
          };
        },
        {
          name: "rewardsAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "initializer";
              },
              {
                kind: "account";
                path: "tokenMint";
              },
              {
                kind: "const";
                value: [
                  114,
                  101,
                  119,
                  97,
                  114,
                  100,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "arg";
                path: "extraSeed";
              }
            ];
          };
        },
        {
          name: "tokenMint";
        },
        {
          name: "rewardTokenMint";
        },
        {
          name: "initializerRewardTokenAccount";
          writable: true;
        },
        {
          name: "platformWallet";
          writable: true;
        },
        {
          name: "platformSplAccount";
          writable: true;
        },
        {
          name: "initializer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "reward";
          type: "u128";
        },
        {
          name: "rewardPeriodInSeconds";
          type: "u64";
        },
        {
          name: "lockingPeriodForStakers";
          type: "u64";
        },
        {
          name: "startTimeStamp";
          type: "i64";
        },
        {
          name: "extraSeed";
          type: {
            array: ["u8", 8];
          };
        }
      ];
    },
    {
      name: "stake";
      discriminator: [206, 176, 202, 18, 200, 209, 179, 108];
      accounts: [
        {
          name: "poolState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "userState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "poolState";
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "user_state.random_seed";
                account: "userState";
              }
            ];
          };
        },
        {
          name: "poolTokensAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108, 95, 116, 111, 107, 101, 110, 115];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "tokensFromAccount";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdraw";
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34];
      accounts: [
        {
          name: "poolState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "userState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "poolState";
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "user_state.random_seed";
                account: "userState";
              }
            ];
          };
        },
        {
          name: "poolTokensAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pool_state.initializer";
                account: "poolState";
              },
              {
                kind: "account";
                path: "pool_state.token_mint";
                account: "poolState";
              },
              {
                kind: "const";
                value: [112, 111, 111, 108, 95, 116, 111, 107, 101, 110, 115];
              },
              {
                kind: "account";
                path: "pool_state.extra_seed";
                account: "poolState";
              }
            ];
          };
        },
        {
          name: "tokensToAccount";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "poolState";
      discriminator: [247, 237, 227, 245, 215, 195, 222, 70];
    },
    {
      name: "userState";
      discriminator: [72, 177, 85, 249, 76, 167, 186, 126];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidNumericConversion";
      msg: "Invalid numeric conversion";
    },
    {
      code: 6001;
      name: "invalidPlatformWallet";
      msg: "Invalid platform wallet";
    },
    {
      code: 6002;
      name: "invalidPlatformSplAccount";
      msg: "Invalid platform SPL account";
    },
    {
      code: 6003;
      name: "invalidRewardPeriod";
      msg: "Invalid reward period";
    },
    {
      code: 6004;
      name: "stakingNotStarted";
      msg: "Staking not started";
    },
    {
      code: 6005;
      name: "stakingEnded";
      msg: "Staking ended";
    },
    {
      code: 6006;
      name: "invalidRewardTokenMint";
      msg: "Invalid reward token mint";
    },
    {
      code: 6007;
      name: "zeroWithdrawAmount";
      msg: "Zero withdraw amount";
    },
    {
      code: 6008;
      name: "invalidWithdrawAmount";
      msg: "Invalid withdraw amount";
    },
    {
      code: 6009;
      name: "releaseTimeHasNotPassed";
      msg: "Release time has not passed";
    },
    {
      code: 6010;
      name: "withdrawBeforeClose";
      msg: "Withdraw before close";
    },
    {
      code: 6011;
      name: "usersStillHaveTokens";
      msg: "Users still have tokens";
    }
  ];
  types: [
    {
      name: "poolState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "initializer";
            type: "pubkey";
          },
          {
            name: "tokenMint";
            type: "pubkey";
          },
          {
            name: "rewardTokenMint";
            type: "pubkey";
          },
          {
            name: "totalTokenStaked";
            type: "u128";
          },
          {
            name: "rewardPerTokenStored";
            type: "u128";
          },
          {
            name: "rewardRate";
            type: "u64";
          },
          {
            name: "lastUpdateTime";
            type: "i64";
          },
          {
            name: "rewardDistributed";
            type: "u128";
          },
          {
            name: "lockingPeriodForStakers";
            type: "u64";
          },
          {
            name: "startTimeStamp";
            type: "i64";
          },
          {
            name: "endTimeStamp";
            type: "i64";
          },
          {
            name: "extraSeed";
            type: {
              array: ["u8", 8];
            };
          },
          {
            name: "poolStateBump";
            type: "u8";
          },
          {
            name: "poolTokensBump";
            type: "u8";
          },
          {
            name: "rewardsAccountBump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "stakerUser";
            type: "pubkey";
          },
          {
            name: "poolAddress";
            type: "pubkey";
          },
          {
            name: "stakedTokenBalance";
            type: "u128";
          },
          {
            name: "rewardPerTokenPaid";
            type: "u128";
          },
          {
            name: "rewards";
            type: "u64";
          },
          {
            name: "releaseTime";
            type: "i64";
          },
          {
            name: "lastRewardGetTime";
            type: "i64";
          },
          {
            name: "randomSeed";
            type: {
              array: ["u8", 16];
            };
          },
          {
            name: "userStateBump";
            type: "u8";
          }
        ];
      };
    }
  ];
};
