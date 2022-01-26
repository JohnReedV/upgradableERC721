const { getSelectors, FacetCutAction } = require("../scripts/libraries/diamond.js");

async function test() {
  const cut = [];
  const facet = await ethers.getContractAt("yakimaSmiles", "0x0000000000000000000000000000000000000000"); //facet address must be 0

  cut.push({
    facetAddress: facet.address,
    action: FacetCutAction.Remove,
    functionSelectors: getSelectors(facet),
  });

   // upgrade diamond with facets
   console.log("");
   console.log("Diamond Cut:", cut);
   const diamondCut = await ethers.getContractAt("IDiamondCut", "0x8348125d3Be8eC757CF36582D69f6eA11e46690B"); //diamond address
   let tx;
   let receipt;

   // call to init function
   const diamondInit = await ethers.getContractFactory("DiamondInit");
   let functionCall = diamondInit.interface.encodeFunctionData("init");
   tx = await diamondCut.diamondCut(cut, "0xe2124685F9247f04E2Ef0E2fE42aeB9559818691", functionCall, { gasLimit: 9000000 }); //diamondInit address
   console.log("Diamond cut tx: ", tx.hash);
   receipt = await tx.wait();
   if (!receipt.status) {
     throw Error(`Diamond upgrade failed: ${tx.hash}`);
   }
   console.log("Completed diamond cut");
 }

test();