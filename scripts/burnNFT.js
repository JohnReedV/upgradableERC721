  
  async function burn() {
    const [accounts] = await ethers.getSigners();
    const instance = await ethers.getContractFactory("yakimaSmiles");
    const address = "0x8348125d3Be8eC757CF36582D69f6eA11e46690B";
    const contract = new ethers.Contract(address, instance.interface, provider)
    const Contract = contract.connect(accounts)

    for (i = 0; i < 100; i++){
        let tx = await Contract["safeTransferFrom(address,address,uint256)"]("0xA07876136c3A3141Dc2C25071330D3B08225e043", "0x000000000000000000000000000000000000dEaD", i)
        console.log("burned " + i, tx)
    }
  }

  burn()