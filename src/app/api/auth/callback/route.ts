import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findOrCreateUser, generateToken, updateLastLogin } from "@/lib/auth";

interface GoogleIdTokenPayload {
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  sub: string; // The user's Google ID
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Invalid request: No code provided" },
      { status: 400 }
    );
  }

  try {
    // 1. Exchange code for tokens
    const redirectUri = `${origin}/api/auth/callback`; // Corrected redirect URI
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google OAuth Error:", tokenData);
      return NextResponse.json(
        { error: "Failed to exchange code for token", details: tokenData.error_description },
        { status: 400 }
      );
    }

    const { id_token } = tokenData;

    // 2. Decode ID token to get user info
    const decodedToken = jwt.decode(id_token) as GoogleIdTokenPayload | null;

    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid ID token" }, { status: 400 });
    }

    const {
      email,
      email_verified,
      given_name: firstName,
      family_name: lastName,
    } = decodedToken;

    if (!email_verified || !email) {
      return NextResponse.json(
        { error: "Google account email not verified or missing" },
        { status: 403 }
      );
    }

    // 3. Find or create user in the database
    const user = await findOrCreateUser({
      email,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    // 4. Update last login timestamp
    await updateLastLogin(user.id);

    // 5. Generate JWT for the user
    const token = generateToken(user.id, user.email);

    // 6. Redirect to a client-side page to save the token
    const finalRedirectUrl = new URL('/auth/callback', origin);
    finalRedirectUrl.searchParams.set('token', token);

    return NextResponse.redirect(finalRedirectUrl);

  } catch (error) {
    console.error("Server Error during OAuth callback:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
