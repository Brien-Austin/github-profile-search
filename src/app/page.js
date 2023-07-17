"use client";
import { useState } from "react";
import { Button, Container, Text } from "./chakra";
import { NavBar } from "./components/NavBar";
import { Search } from "./components/Search";
import UserProfile from "./components/UserProfile";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <Container maxW={"container.lg"}>
      <NavBar />
      <Text fontSize={"2xl"} textAlign={"center"} my={4}>
        Search users on Github
      </Text>
      <Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
      {userData && <UserProfile userData={userData} />}
    </Container>
  );
}
