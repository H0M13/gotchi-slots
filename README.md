## 1 Arm Baandit

![image](https://user-images.githubusercontent.com/6655367/132122478-37f0d060-9edb-452f-a514-10b379b137cb.png)


This is a slots-inspired minigame for Aavegotchi built as part of the first Game Jaam.

Check out live demo @ https://gotchi-slots-r9mxieta7-h0m13.vercel.app/

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

