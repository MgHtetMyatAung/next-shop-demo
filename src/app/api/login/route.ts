import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PREDEFINED_USER = {
  email: "admin@gmail.com",
  password: "admin321",
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === PREDEFINED_USER.email &&
    password === PREDEFINED_USER.password
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
