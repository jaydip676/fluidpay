//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;

contract FluidPay {

    // address array of all platforms
    address[] public platforms;
    // to check platform add only once
    bool internal isPlatformAdded;

    // structure of platform
    struct Platform{
        address platformAddress;
        string platformName;
        string platformImage;
        string description;
        string placeAddress;
        uint platformChargesPerSecond;
    }

    ///@notice mapping for address to Platform struct
    mapping (address => Platform) public addressToPlatformMapping;

    /// @param _platform is address of the platform who wants to register on platform
    function addPlatform(address _platform, string memory _platformName, string memory _platformImage,
    string memory _platformDescription, string memory _placeAddress, uint _platformChargesPerSecond) public{
        if(!isPlatformAdded){
            platforms.push(_platform);
            addressToPlatformMapping[_platform] = Platform(_platform,_platformName,_platformImage,
            _platformDescription,_placeAddress,_platformChargesPerSecond);
        }
    }

    function getPlatformData(address _platform) public view returns(Platform memory){
        return addressToPlatformMapping[_platform];
    }

    function getAllPlatformsAddress() public view returns(address[] memory){
        return platforms;
    }
}