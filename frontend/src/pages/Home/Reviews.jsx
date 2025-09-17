import React from "react";
import Marquee from "react-fast-marquee";

const reviews = [
  {
    id: 1,
    name: "John Smith",
    role: "Business Owner",
    text: "This delivery service is amazing! Always on time and super reliable.",
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "E-commerce Seller",
    text: "My customers love the fast and safe deliveries. Highly recommend!",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Retailer",
    text: "Great support team, very responsive and helpful 24/7.",
  },
  {
    id: 4,
    name: "Sophia Williams",
    role: "Restaurant Owner",
    text: "They helped my business grow with their efficient courier service.",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Freelancer",
    text: "I can track every parcel live—super convenient and stress-free.",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    role: "Shop Owner",
    text: "The delivery process is smooth and hassle-free. Excellent service!",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Customer",
    text: "Best experience so far! Reliable, quick, and trustworthy.",
  },
];

const Reviews = () => {
  return (
    <div>
      <div className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-10">
          What Our Clients Say
        </h2>

        <Marquee
          direction="right"
          gradient={false}
          speed={50}
          pauseOnHover={true}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-xl p-6 mx-4 w-80 flex-shrink-0"
            >
              <p className="text-gray-700 italic mb-4">“{review.text}”</p>
              <h4 className="font-bold text-gray-900">{review.name}</h4>
              <span className="text-sm text-gray-500">{review.role}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Reviews;
