//read token URI

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.api.moonbeam.network"
);

async function mint() {
  const instance = await ethers.getContractFactory("yakimaSmiles");
  const diamondAddress = "0x8348125d3Be8eC757CF36582D69f6eA11e46690B";
  const contract = new ethers.Contract(diamondAddress, instance.interface, provider);

  const uri = await contract.tokenURI(89);
  console.log(uri);
}

mint();
