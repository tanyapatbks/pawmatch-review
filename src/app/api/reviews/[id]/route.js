import { connectMongoDB } from "../../../../../lib/mongodb";
import Review from "../../../../../models/review";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const review = await Review.findOne({ _id: id });
    return NextResponse.json({ review }, {status: 200});
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newImg: img, newContent: content } = await req.json();
    await connectMongoDB();
    await Review.findByIdAndUpdate(id, { title, img, content });
    return NextResponse.json({ message: "Review updated "}, { status: 200 });
}