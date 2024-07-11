import React, { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();

  const getLinks = () => {
    switch (location.pathname) {
      case "/algorithm/array":
        return [
          { href: "/algorithm/array", text: "Array" },
          { href: "/algorithm/array/sorted", text: "Sorted" },
        ];
      case "/algorithm/sorting":
        return [
          { href: "/algorithm/sorting", text: "Bubble" },
          { href: "/algorithm/sorting/selection", text: "Selection" },
          { href: "/algorithm/sorting/insertion", text: "Insertion" },
          { href: "/algorithm/sorting/merge", text: "Merge" },
          { href: "/algorithm/sorting/quick", text: "Quick" },
          { href: "/algorithm/sorting/randomquick", text: "Random Quick" },
          { href: "/algorithm/sorting/counting", text: "Counting" },
        ];
      case "/algorithm/linkedlist":
        return [
          { href: "/algorithm/linkedlist", text: "Linked List" },
          { href: "/algorithm/linkedlist/stack", text: "Stack" },
          { href: "/algorithm/linkedlist/queue", text: "Queue" },
          {
            href: "/algorithm/linkedlist/doublylinkedlist",
            text: "Doubly Linked List",
          },
          { href: "/algorithm/linkedlist/deque", text: "Deque" },
        ];
        case "/algorithm/binarytree":
        return [
          { href: "/algorithm/linkedlist", text: "Binary Search Tree" },
          { href: "/algorithm/linkedlist/AVL", text: "AVL Tree" },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <NextUINavbar isBordered className="bg-var(--background-color)">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/" className="hidden sm:block font-bold text-inherit">
            DSA
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <p>{link.text}</p>
          </Link>
        ))}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {!location.pathname.startsWith("/algorithm/") && (
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            type="search"
          />
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
