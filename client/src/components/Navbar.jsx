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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        {isLoggedIn ? (
          <Dropdown
            placement="bottom-end"
            className="bg-var(--background-color)"
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="md"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="Signed in as"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings" textValue="My Settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings" textValue="Team Settings">
                Team Settings
              </DropdownItem>
              <DropdownItem key="analytics" textValue="Analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system" textValue="System">
                System
              </DropdownItem>
              <DropdownItem key="configurations" textValue="Configurations">
                Configurations
              </DropdownItem>
              <DropdownItem key="help_and_feedback" textValue="Help & Feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log Out"
                onPress={() => {
                  console.log("Logged out");
                  setIsLoggedIn(false);
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="#" color="secondary" onPress={onOpen}>
            Log In
          </Link>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                  <Input
                    endContent={
                      <LockClosedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      setIsLoggedIn(true);
                      onClose();
                    }}
                  >
                    Sign in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
