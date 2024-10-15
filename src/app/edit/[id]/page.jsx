"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditReviewPage({ params }) {

    const { id } = params;

    const [reviewData, setReviewData] = useState("");

    // New data of review 
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");

    const router = useRouter();

    const getReviewById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/reviews/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a review");
            }

            const data = await res.json();
            console.log("edit review", data)
            setReviewData(data.review);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReviewById(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/reviews/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })

            if (!res.ok) {
                throw new Error("Failed to update review");
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-bold'>Edit Review</h3>
        <hr className='my-3' />
        <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go Back</Link>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setNewTitle(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={reviewData.title} />
            <input onChange={(e) => setNewImg(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={reviewData.img} />
            <textarea onChange={(e) => setNewContent(e.target.value)} name="" id="" cols="30" rows="10" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={reviewData.content}></textarea>
            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Review</button>
        </form>
    </div>
  )
}

export default EditReviewPage
