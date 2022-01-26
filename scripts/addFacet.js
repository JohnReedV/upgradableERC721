const { getSelectors, FacetCutAction } = require("../scripts/libraries/diamond.js");

async function test() {
  const cut = [];
  async function deployFacet(FacetName, ...args) {
    const Facet = await ethers.getContractFactory(FacetName);
    var facet = await Facet.deploy(...args);
    await facet.deployed();
    console.log(`${FacetName} deployed: ${facet.address}`);
    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }

  await deployFacet("yakimaSmiles");

  // upgrade diamond with facets
  console.log("");
  console.log("Diamond Cut:", cut);
  const diamondCut = await ethers.getContractAt(
    "IDiamondCut",
    "0x8348125d3Be8eC757CF36582D69f6eA11e46690B" //diamond address
  );
  let tx;
  let receipt;
  // call to init function

  const diamondInit = await ethers.getContractFactory("DiamondInit");

  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(
    cut,
    "0xe2124685F9247f04E2Ef0E2fE42aeB9559818691", //diamond init address
    functionCall,
    { gasLimit: 9000000 }
  );
  console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond cut");
}

test();