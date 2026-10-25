import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const targetEmail = "supriyaghorai.dev@gmail.com";

    // Forward to FormSubmit AJAX endpoint for direct inbox delivery
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://supriyaghorai.dev",
        Referer: "https://supriyaghorai.dev",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `[Portfolio Inquiry] New message from ${name.trim()}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => null);
    const isSuccess = data?.success === true || data?.success === "true";

    if (!response.ok || !isSuccess) {
      const isActivationNeeded =
        typeof data?.message === "string" &&
        data.message.toLowerCase().includes("activation");

      return NextResponse.json(
        {
          success: false,
          needsActivation: isActivationNeeded,
          error: isActivationNeeded
            ? "Action required: FormSubmit has sent a 1-time activation link to supriyaghorai.dev@gmail.com. Please check your inbox (or spam) and click 'Activate Form' once. Afterwards, all messages will deliver directly!"
            : data?.message || "Failed to dispatch message to email service.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message successfully dispatched to your inbox",
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while dispatching your message.",
      },
      { status: 500 }
    );
  }
}
