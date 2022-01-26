//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IDiamondCut }  from "../DiamondCut/IDiamondCut.sol";
import { LibDiamond } from "./libDiamond.sol";

contract diamondCore{

    constructor(address _contractOwner, address _diamondCutFacet) payable{
        LibDiamond.setContractOwner(_contractOwner);

        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](1);
        bytes4[] memory functionSelectors = new bytes4[](1);
        functionSelectors[0] = IDiamondCut.diamondCut.selector;
        cut[0] = IDiamondCut.FacetCut({
            facetAddress: _diamondCutFacet, 
            action: IDiamondCut.FacetCutAction.Add, 
            functionSelectors: functionSelectors
        });
        LibDiamond.diamondCut(cut, address(0), "");      
    }

    fallback() external payable {
        LibDiamond.DiamondStorage storage store = LibDiamond.diamondStorage();
        

        address facetAddress = store.facetAddressAndSelectorPosition[msg.sig].facetAddress;
        require(facetAddress!=address(0x0),"Target Facet must be initialized.");

        //And here comes the magic!
        assembly{
            calldatacopy(0,0,calldatasize())

            let res:= delegatecall(gas(),facetAddress,0,calldatasize(),0,0)

            returndatacopy(0,0,returndatasize())

            switch res
                case 0 {revert(0,returndatasize())}
                default{return(0,returndatasize())}
            
        }


    }
}
