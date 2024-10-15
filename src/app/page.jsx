"use client";

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';

export default function Home() {

  const [reviewData, setReviewData] = useState([]); //สร้าง State เก็บค่าของ Review เก็บเป็น array เปล่าไว้
  console.log(reviewData);

  const getReviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews", {
        method: "GET",
        cache: "no-store"
      })

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await res.json();
      setReviewData(data.reviews);

    } catch(error) {
      console.log("Error loading reviews: ", error);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <main className="container mx-auto my-3">
      <h1>Pawmatch Review</h1>
      <hr className="my-3" />
      <button className='bg-green-500 p-3 text-white rounded'><Link href="/create">Create Review</Link></button>
      <div className='grid grid-cols-4 mt-3 gap-5'>
        {reviewData && reviewData.length > 0 ? (
          reviewData.map(val => (
            <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
              <h4>{val.title}</h4>
              <Image src={val.img} width={300} height={0} alt={val.title} />
              <p>{val.content}</p>
              <div className='mt-5'>
                <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg' href={` /edit/${val._id}`}>Edit</Link>
                <DeleteBtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className='bg-gray-300 p-3 ,y-3'>
            You do not have any review yet.
          </p>
        )}
      </div>
    </main>
      );
}