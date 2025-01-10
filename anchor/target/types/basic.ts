/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "burnStablecoinsAndRedeemBonds",
      "discriminator": [
        74,
        165,
        246,
        238,
        140,
        136,
        149,
        222
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true,
          "relations": [
            "collateralAccount",
            "config"
          ]
        },
        {
          "name": "collateralAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  97,
                  116,
                  101,
                  114,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config.name",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.target_fiat_currency",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.signer",
                "account": "mintConfig"
              }
            ]
          }
        },
        {
          "name": "stablecoinTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          },
          "relations": [
            "collateralAccount"
          ]
        },
        {
          "name": "stablecoinMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config.name",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.target_fiat_currency",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.signer",
                "account": "mintConfig"
              }
            ]
          }
        },
        {
          "name": "userStablebondAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "depositedStablebondMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "depositedStablebondMint",
          "writable": true
        },
        {
          "name": "collateralBondTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "collateralAccount"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "depositedStablebondMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          },
          "relations": [
            "collateralAccount"
          ]
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositBondsAndMintStablecoins",
      "discriminator": [
        92,
        149,
        77,
        16,
        102,
        126,
        24,
        188
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true,
          "relations": [
            "config"
          ]
        },
        {
          "name": "collateralAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  97,
                  116,
                  101,
                  114,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config.name",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.target_fiat_currency",
                "account": "mintConfig"
              }
            ]
          }
        },
        {
          "name": "userStablebondAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "depositedStablebondMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "depositedStablebondMint",
          "writable": true
        },
        {
          "name": "stablecoinMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config.name",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.target_fiat_currency",
                "account": "mintConfig"
              },
              {
                "kind": "account",
                "path": "config.signer",
                "account": "mintConfig"
              }
            ]
          }
        },
        {
          "name": "stablecoinTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "stablecoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collateralBondTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "collateralBondTokenAccount"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "depositedStablebondMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeMint",
      "discriminator": [
        209,
        42,
        195,
        4,
        129,
        85,
        209,
        44
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "args.name"
              },
              {
                "kind": "arg",
                "path": "targetCurrency"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "allMints",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  116,
                  97,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116,
                  115,
                  95,
                  99,
                  114,
                  101,
                  97,
                  116,
                  101,
                  100
                ]
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "args.name"
              },
              {
                "kind": "arg",
                "path": "targetCurrency"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createMintAccountArgs"
            }
          }
        },
        {
          "name": "targetCurrency",
          "type": "string"
        },
        {
          "name": "rate",
          "type": "i16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "collateral",
      "discriminator": [
        123,
        130,
        234,
        63,
        255,
        240,
        255,
        92
      ]
    },
    {
      "name": "mintConfig",
      "discriminator": [
        168,
        252,
        88,
        182,
        219,
        205,
        39,
        53
      ]
    },
    {
      "name": "mintsCreated",
      "discriminator": [
        15,
        223,
        128,
        136,
        148,
        166,
        141,
        8
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "insufficientBondBalance",
      "msg": "Insufficient StableBond Balance"
    },
    {
      "code": 6001,
      "name": "invalidAuthority",
      "msg": "Invalid Authority"
    },
    {
      "code": 6002,
      "name": "invalidDepositor",
      "msg": "Invalid Depositor"
    },
    {
      "code": 6003,
      "name": "invalidCollateralAccount",
      "msg": "Invalid Collateral Account"
    },
    {
      "code": 6004,
      "name": "invalidStablecoinAccount",
      "msg": "Invalid Stablecoin Account"
    },
    {
      "code": 6005,
      "name": "insufficientStablecoinBalance",
      "msg": "Insufficient Stablecoin Balance"
    },
    {
      "code": 6006,
      "name": "insufficientCollateralBalance",
      "msg": "Insufficient Collateral Balance"
    },
    {
      "code": 6007,
      "name": "arithmeticError",
      "msg": "Arithmetic Error"
    }
  ],
  "types": [
    {
      "name": "collateral",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "collateralBondTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "stablecoinTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "stablebondBalance",
            "type": "u64"
          },
          {
            "name": "stablecoinMinted",
            "type": "u64"
          },
          {
            "name": "collateralBump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "createMintAccountArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "targetFiatCurrency",
            "type": "string"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "icon",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "interestRate",
            "type": "i16"
          },
          {
            "name": "mintBump",
            "type": "u8"
          },
          {
            "name": "configBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mintInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "publicKey",
            "type": "pubkey"
          },
          {
            "name": "apy",
            "type": "i16"
          }
        ]
      }
    },
    {
      "name": "mintsCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allMints",
            "type": {
              "vec": {
                "defined": {
                  "name": "mintInfo"
                }
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
