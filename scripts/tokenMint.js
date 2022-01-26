//mint new token

async function test(uri) {
  const [accounts] = await ethers.getSigners();
  const instance = await ethers.getContractFactory("yakimaSmiles");
  const address = "0x62aAEf1F93C84B557ffDD3c1C8618cFa1aA51316";
  const contract = new ethers.Contract(address, instance.interface, provider);
  const Contract = contract.connect(accounts);

  let tx = await Contract.safeMint(
    "0xA07876136c3A3141Dc2C25071330D3B08225e043",
    uri
  );

  console.log(tx, uri);

  
}

let awesomeArr = ["Feet your eyes apon HIGH CLASS toes"]

async function append(image) {

  let saying = awesomeArr[Math.floor(Math.random()*awesomeArr.length)];

  let object = {
    name: "Le foot O' John",
    image: image,
    description: saying
  }

  await test(object)

}


async function dogwater(){
  
//await append("ipfs://bafybeiecjvcelbjis2ve43yzuktg6gxkavgaghbg3anjksmpy3qjjwqnky")
await append("https://ipfs.io/ipfs/QmZCX75qJNqJk9kQGn8Qzb41xhUVd6c6egTMDjthbexTRB?filename=download.jpg")

}

dogwater()