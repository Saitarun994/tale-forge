import { GoogleAuth } from "google-auth-library";
import * as dotenv from "dotenv";
dotenv.config();

const ACESS_TOKEN = process.env.ACCESS_TOKEN;

async function sendRequest(options) {
  //const auth = new GoogleAuth({
  //  scopes: "https://www.googleapis.com/auth/cloud-platform",
  //});

  //const client = await auth.getClient();
  //const accessToken = (await client.getAccessToken()).token;
  const data = { instances: options.instances, parameters: options.parameters };
  
  const response = await fetch(
    `https://${options.apiEndpoint}/v1/projects/${options.projectId}/locations/us-central1/publishers/google/models/${options.modelId}:predict`, 
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
  );
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

export default sendRequest;