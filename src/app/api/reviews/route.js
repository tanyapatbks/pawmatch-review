import { connectMongoDB } from "../../../../lib/mongodb";
import Review from "../../../../models/review";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title, img, content } = await req.json();
    console.log(title, img, content)
    await connectMongoDB();
    await Review.create({ title, img, content });
    return NextResponse.json({ message: "Review Created"}, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const reviews = await Review.find({});
    return NextResponse.json({ reviews });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: "Review deleted"}, { status: 200 });
}