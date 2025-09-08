import { NextRequest, NextResponse } from "next/server";
import blogPostAutomation from "@/ai-agent/blog-post-automation";

// API Key validation function
function validateApiKey(request: NextRequest): boolean {
  const apiKey =
    request.headers.get("X-API-Key") ||
    request.headers.get("Authorization")?.replace("Bearer ", "");
  const validApiKey = process.env.PUBLISH_API_KEY;

  if (!validApiKey) {
    console.error("PUBLISH_API_KEY environment variable is not set");
    return false;
  }

  return apiKey === validApiKey;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API Key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Invalid or missing API key",
        },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();

    // Call the AI agent to generate and publish social media content
    const result = await blogPostAutomation(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    // Return the success response
    return NextResponse.json({
      success: true,
      data: {
        message: "Post published successfully!",
      },
    });
  } catch (error) {
    console.error("API Error:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests with authorization
export async function GET(request: NextRequest) {
  // Validate API Key for GET requests too
  if (!validateApiKey(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized - Invalid or missing API key",
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed. Use POST to submit blog content.",
    },
    { status: 405 }
  );
}
