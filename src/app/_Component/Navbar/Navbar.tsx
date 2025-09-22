"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModeToggle from "../ToggleMode/ToggleMode";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { countContext } from "@/CountProvider";

export default function Navbar() {
  const { data, status } = useSession();
  const {count} = useContext(countContext)

  const MenuItems: { path: string; label: string; protected: boolean }[] = [
    { path: "/", label: "Home", protected: false },
    { path: "/category", label: "Category", protected: false },
    { path: "/products", label: "Products", protected: false },
    { path: "/Brands", label: "Brands", protected: false },
    { path: "/allorders", label: "Orders", protected: true },
  ];

  function logout(){
    signOut(
      { callbackUrl:"/login"}
    )
  }

  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      {/* declaration navbar with theme toggle */}
      <div className="max-w-full bg-blue-900 py-2 px-5 lg:px-40 flex justify-between items-center text-center text-pink-700 ">
        <h3 className="text-sm ">Fast Shipping</h3>
        <h1 className=" lg:text-3xl animate__animated animate__pulse animate__infinite	infinite">
          Welcome to Online Store
        </h1>
        <ModeToggle />
      </div>
      {/* main Navbar */}
      <NavigationMenu
        viewport={false}
        className="max-w-full flex justify-between lg:grid lg:grid-cols-3 items-center flex-wrap py-4 lg:px-40 bg-blue-200 dark:bg-gray-800"
      >
        {/* Logo */}
        <NavigationMenuList className="lg:col-span-1">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href="/"
                className="bg-transparent hover:bg-transparent my-3 focus:bg-transparent"
              >
                <Image
                  src={"/Images/logo.png"}
                  width={150}
                  height={351}
                  alt="Online-Store"
                  className="cursor-pointer w-24 lg:w-36"
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* responsive toggle */}
        <Button
          className="lg:hidden text-3xl text-black bg-transparent dark:text-white dark:bg-transparent hover:bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark "></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </Button>
        <div className={`${isOpen ? "flex": "hidden"} flex-col lg:col-span-2 lg:flex lg:flex-row lg:justify-between justify-center text-center items-center lg:space-x-4 absolute lg:static top-full left-0 w-full lg:w-auto bg-blue-200 dark:bg-gray-800 p-4 lg:p-0 z-50`}>
          {/* main navlinks */}
          <NavigationMenuList className="flex flex-col lg:flex-row self-center">
            {MenuItems.map((item) => {
              return (
                <NavigationMenuItem key={item.path}>
                  {item.protected && status == "authenticated" && (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.path}
                        className={`${
                          pathName == item.path && "active"
                        } bg-transparent hover:bg-transparent hover:text-pink-700 navbarFont focus:bg-transparent`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                  {!item.protected && (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.path}
                        className={`${
                          pathName == item.path && "active"
                        } bg-transparent hover:bg-transparent hover:text-pink-700 navbarFont focus:bg-transparent`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
          <NavigationMenuList className="flex flex-col lg:flex-row lg:items-center">
            {status == "authenticated" ? (
              <>
                {/* Cart Navbar */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href="/cart"
                      className={`${
                        pathName == "/cart" && "active"
                      } bg-transparent hover:bg-transparent hover:text-pink-700 navbarFont focus:bg-transparent relative`}
                    >
                      <i className="fa-solid fa-cart-arrow-down text-2xl align-middle "></i>
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2">{count}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Wish List Navbar */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href="/wishList"
                      className={`${
                        pathName == "/wishList" && "active"
                      } bg-transparent hover:bg-transparent hover:text-pink-700 focus:bg-transparent flex-row lg:flex-col`}
                    >
                      <i className="fa-solid fa-heart text-2xl align-middle focus:bg-transparent "></i>
                      Wish List
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Hello User Navbar */}
                <h3 className="text-pink-700 mx-2 hidden lg:block">Hello {data?.user.name}</h3>
                {/* logout button */}
                <Button
                onClick={logout}
                  className="bg-transparent hover:bg-transparent hover:text-pink-700 navbarFont focus:bg-transparent text-black dark:text-white dark:hover:text-pink-700 cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Auth Navlinks */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href="/login"
                      className={`${
                        pathName == "/login" && "active"
                      } bg-transparent hover:bg-transparent hover:text-pink-700 navbarFont focus:bg-transparent`}
                    >
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </>
  );
}
