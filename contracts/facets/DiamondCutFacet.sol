//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IDiamondCut }  from "../DiamondCut/IDiamondCut.sol";
import { LibDiamond } from "../DiamondCore/libDiamond.sol";

contract DiamondCutFacet is IDiamondCut {
    function diamondCut(
        FacetCut[] calldata _diamondCut,
        address _init,
        bytes calldata _calldata
    ) external override {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.diamondCut(_diamondCut, _init, _calldata);
    }
}