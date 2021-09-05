## 1 Arm Baandit

![image](https://user-images.githubusercontent.com/6655367/132122478-37f0d060-9edb-452f-a514-10b379b137cb.png)


This is a slots-inspired minigame for Aavegotchi built as part of the first Game Jaam.

## Submission details

We've created an Aavegotchi-themed slots game which interacts with a smart contract on Polygon Mainnet and uses Chainlink VRF to fairly determine users' spins. 

Gotchis can spin with different odds depending on their spirit force collateral type (while maintaining balance in total 99.5% payout across all types). See the 'Odds' tab on the site for more details.

For the game jaam we decided it would be both safest and easiest to demo if we used 'demo GHST' balances rather than the real ERC-20. Each wallet can one-time 'mint' themselves 100 demo GHST to play with!

There is a jackpot prize which grows every time someone plays the game (if they don't win it themselves!).

**Note** Chainlink VRF can be very slow to respond lately, like *2 or 3 minutes* kind of slow! Please be patient with it :sweat_smile: 

Video: 
https://www.youtube.com/watch?v=Gr5f7ogSAPg

Repos:
https://github.com/H0M13/gotchi-slots-contracts
https://github.com/H0M13/gotchi-slots

Demo site:
https://gotchi-slots-r9mxieta7-h0m13.vercel.app/

Contract:
https://polygonscan.com/address/0x44a8F7908ee49c5189846F752FB78044cAdCD800

## Dev dependencies needed

* [ts-node](https://github.com/TypeStrong/ts-node)
* [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/)

## Getting started

Using the [github client](https://cli.github.com/), in your command line run:
```
gh repo create <my-web3-project> --template="https://github.com/aavegotchi/nextjs-moralis-aavegotchi.git"
cd <my-web3-project>
git pull origin main
yarn install
```

To run the app, in your terminal run:
```
yarn dev
```

To connect to Moralis you will need to create a new Moralis project by following the [Moralis documentation]("https://docs.moralis.io/getting-started/quick-start").

Then create a `.env.development` and `.env.production`. Inside both set the the following keys:

```
MORALIS_APPLICATION_ID='[APP_ID]'
MORALIS_SERVER_ID='[SERVER_ID]'
```

