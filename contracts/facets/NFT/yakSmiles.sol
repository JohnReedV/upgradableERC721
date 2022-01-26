// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.sol";
import "./ERC721URIStorage.sol";
import "./Counters.sol";
import {LibDiamond} from "../../DiamondCore/libDiamond.sol";

contract yakimaSmiles is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Yakima Smiles", "YAK") {}

    function safeMint(address to, string memory uri) public {
        require (msg.sender == LibDiamond.contractOwner(), "Only the owner is permitted");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        uint256 supply = LibDiamond.totalSupply();
        supply++;
        LibDiamond.setTotalSupply(supply);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function totalSupply() public view returns (uint256 supply){
        return LibDiamond.totalSupply();
        
    }
}