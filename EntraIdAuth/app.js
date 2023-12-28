const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");

require("dotenv").config();

async function main() {
    console.log("Getting access to Azure Blob storage...");

    // Enter your storage account name
    const account = process.env.ACCOUNT_NAME || "scottcun20231207";
    const containerName = process.env.CONTAINER_NAME || "paermini-spike";

    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        new DefaultAzureCredential()
      );

    console.log("\nCreating new container..");
    let containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        await containerClient.create();
        console.log(`Created container ${containerName} successfully.`);
    } catch (err) {
        console.log(`requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`);
    }

    console.log("\nCreating blob and uploading trace zip file...");
    
    const content = fs.readFileSync("./trace-example.zip");
    const blobName = `trace-${new Date().getTime()}.zip`;
    let blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(content, Buffer.byteLength(content));

    const blobProperties = await blockBlobClient.getProperties();
    console.log(`getProperties() on blob - ${blobName}, blobType = ${blobProperties.blobType}, accessTier = ${blobProperties.accessTier}`);

    var url = `trace.playwright.dev/?trace=${blockBlobClient.url}`;
    
    console.log("\nUPLOAD COMPLETED!");
    console.log(`URL: ${url}`);
    
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
  });