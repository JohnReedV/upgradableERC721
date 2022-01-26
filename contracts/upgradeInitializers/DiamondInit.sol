//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import {LibDiamond} from "../DiamondCore/libDiamond.sol";
import { IDiamondCut } from "../DiamondCut/IDiamondCut.sol";
//import { IDiamondLoupe } from "";

contract DiamondInit {    

    // You can add parameters to this function in order to pass in 
    // data to set your own state variables
    function init() external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        //ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;

        // add state variables
    }
}