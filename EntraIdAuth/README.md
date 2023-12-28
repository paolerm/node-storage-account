# Description

This Node.js project shows how to store a Playwright trace zip file into an Azure storage account and generates a URL to view traces using [Playwright Trace Viewer](https://trace.playwright.dev/).

## Prerequisites
- You need an Azure storage account with access level set to Blob (anonymous read access for blobs), in this way Playwright Trace Viewer can access the file. There are default values for Storage Account name and containerName, but you can override those defining `ACCOUNT_NAME` and `CONTAINER_NAME` environment variables.
- Add an `.env` file to define `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_CLIENT_SECRET` configurations. There params define an Azure app registration with Blob write access to the Azure storage account.