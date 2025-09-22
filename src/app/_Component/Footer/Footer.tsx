import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="max-w-full  bg-blue-300 dark:bg-gray-800 py-8 md:px-40 items-center grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" text-center">
          <h4>We are available all over the world</h4>
          <div className="space-x-2 text-2xl my-3">
            <Link href="https://www.facebook.com" target="_blank">
              <i className="fa-brands fa-facebook-f hover:text-pink-700"></i>
            </Link>
            <Link href="https://x.com/" target="_blank">
              <i className="fa-brands fa-twitter hover:text-pink-700"></i>
            </Link>
            <Link href="https://www.linkedin.com" target="_blank">
              <i className="fa-brands fa-linkedin-in hover:text-pink-700"></i>
            </Link>
            <Link href="https://www.google.com/" target="_blank">
              <i className="fa-brands fa-google hover:text-pink-700"></i>
            </Link>
          </div>
        </div>
        <div className=" text-center">
          <h4>Contact Us</h4>
          <h5>
            <span className="pe-2 text-pink-700">Address:</span> Str., block,
            city.
          </h5>
          <h5>
            <span className="pe-2 text-pink-700">Phone:</span> +123 456 7890
          </h5>
          <h5>
            <span className="pe-2 text-pink-700">Email:</span>
            online_store@gmail.com
          </h5>
        </div>
      </div>
      <div className=" max-w-full bg-blue-900 py-4 md:px-40 text-center text-white">
        <h3>Copyright © Online Store 2025</h3>
      </div>
    </>
  );
}
