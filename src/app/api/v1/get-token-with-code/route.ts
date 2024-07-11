import { generateClientSecretJwt } from "@/utils/auth";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { code, redirectUrl } = await request.json();
    const clientId = process.env.NEXT_PUBLIC_SSO_AUTH_CLIENT_ID;
    const clientSecretKey = process.env.CLIENT_SECRET_KEY_SSO;
    const issuer = `${process.env.NEXT_PUBLIC_SSO_AUTH_URL}/realms/${process.env.NEXT_PUBLIC_SSO_REALMS}`;

    if (!code || !redirectUrl || !clientId) {
      return Response.json(
        {
          statusCode: 400,
          message: `code, redirectUrl, clientSecretKey is required`,
        },
        { status: 400 }
      );
    }

    // const clientSecretJwt = generateClientSecretJwt(
    //   clientId,
    //   clientSecretKey,
    //   issuer
    // );

    const data = {
      grant_type: "authorization_code",
      // client_id: clientId,
      // client_secret: clientSecretKey,
      code: code,
      redirect_uri: redirectUrl,
      // code_verifier: codeVerify,
      // client_assertion_type:
      //   "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      // client_assertion: clientSecretJwt,
    };

    const result = await axios({
      method: "POST",
      url: `http://192.168.1.84:8080/oauth2/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: "demo-client",
        password: "demo-secret",
      },
      data,
    });

    return Response.json(result.data);
  } catch (error: any) {
    return Response.json(
      {
        statusCode: 500,
        message: `Something went wrong`,
        error: error?.response?.data || error,
      },
      { status: 500 }
    );
  }
}
