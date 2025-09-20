"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productList } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

export default function SearchProducts({
  products,
}: {
  products: productList[];
}) {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleSearch = () => {
    setSearchValue(search);
  };
  const handleClear = () => {
    setSearch("");
    setSearchValue("");
  };

  return (
    <>
      <div className="flex w-full lg:w-3/4 mx-auto my-10 items-center gap-2">
        <Input
        className="border-pink-700"
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)
          }
        />
        <Button className="border-pink-700 hover:text-pink-700" type="submit" variant="outline" onClick={handleSearch}>
          Search
        </Button>
        <Button className="border-pink-700 hover:text-pink-700" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
      {searchValue && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl my-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between"
              >
                <Link href={"/products/" + product._id}>
                  <div className="space-y-4">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-72 object-cover rounded-t-2xl"
                    />
                    <h4 className="text-start  text-pink-700">
                      {product.category.name}
                    </h4>
                    <h3 className=" text-blue-900 text-start ">
                      {product.title}
                    </h3>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <h4>{product.price} EG</h4>
                  <h4>
                    <i className="fa-solid fa-star text-orange-400"></i>{" "}
                    {product.ratingsAverage}
                  </h4>
                </div>
                <AddToCartBtn id={product._id} />
              </div>
            ))
          ) : (
            <h3 className="col-span-full text-center text-gray-600 text-2xl mx-auto">No Products Found!</h3>
          )}
        </div>
      )}
      <hr className="border-2 border-gray-300 dark:border-pink-700 my-10"/>
    </>
  );
}
