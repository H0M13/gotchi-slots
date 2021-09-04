import { addresses } from "utils/vars";
import diamondAbi from "abi/diamondABI.json";

import slotsContractAbi from "abi/slotsContractABI.json";

type DiamondCallMethods = { name: "getAavegotchiSvg"; parameters: [string] };

type SlotsContractCallMethods =
  | {
      name: "addressToFakeTokens";
      parameters: [string];
    }
  | { name: "addressToClaimedFakeTokensBool"; parameters: [string] }
  | { name: "requestIdToRandomNumber", parameters: [string] }
  | { name: "requestIdToProcessedBool", parameters: [string] }
  | { name: "requestIdToSpinOutcomes", parameters: [string, number] };

type SlotsContractSendMethods =
  // Parameter is the address to mint tokens for
  | { name: "mintFakeTokens"; parameters: [string] }
  // Parameter is the gotchi ID to "spin" with
  | { name: "getRandomNumber"; parameters: [number] }
  // Parameter is the request ID from the random number request
  | { name: "processRandomNumber"; parameters: [string] };

export const useDiamondCall = async <R extends unknown>(
  web3: any,
  method: DiamondCallMethods
): Promise<R> => {
  const address = addresses.diamond;
  const contract = new web3.eth.Contract(diamondAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).call();
    return res;
  } catch (err) {
    throw {
      status: 400,
      name: "Diamond contract error",
      message: err.message,
      stack: err.stack,
    };
  }
};

export const useSlotsContractCall = async <R extends unknown>(
  web3: any,
  method: SlotsContractCallMethods
): Promise<R> => {
  const address = addresses.slotsContract;
  const contract = new web3.eth.Contract(slotsContractAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).call();
    return res;
  } catch (err) {
    throw {
      status: 400,
      name: "Slots contract error",
      message: err.message,
      stack: err.stack,
    };
  }
};

export const useSlotsContractSend = async <R extends unknown>(
  web3: any,
  method: SlotsContractSendMethods,
  from: string
): Promise<R> => {
  const address = addresses.slotsContract;
  const contract = new web3.eth.Contract(slotsContractAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).send({
      from: from,
    });
    return res;
  } catch (err) {
    throw {
      status: 400,
      name: "Slots contract error",
      message: err.message,
      stack: err.stack,
    };
  }
};
