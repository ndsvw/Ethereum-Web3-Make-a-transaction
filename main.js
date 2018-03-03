const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let getBalance = (acc) => {
  return new Promise((res, rej) => {
    let balance = web3.eth.getBalance(acc).then((data, error) => {
      if (!error) {
        let ethers = web3.utils.fromWei(data, "ether");
        res(ethers);
      } else {
        rej("Requesting balance failed.");
      }
    });
  }).catch((e) => {
    console.error(e)
  })
}

let main = async () => {
  let accounts = await web3.eth.getAccounts();
  let acc1 = accounts[0];
  let acc2 = accounts[1];

  console.log("Before:\n");
  console.log("\tAccount 1: " + await getBalance(acc1));
  console.log("\tAccount 2: " + await getBalance(acc2));

  await web3.eth.sendTransaction({
    from: acc1,
    to: acc2,
    value: web3.utils.toWei('1', "ether"),
    gasLimit: 21000,
    gasPrice: 2e11
  });

  console.log("Before:\n");
  console.log("\tAccount 1: " + await getBalance(acc1));
  console.log("\tAccount 2: " + await getBalance(acc2));
}

main();