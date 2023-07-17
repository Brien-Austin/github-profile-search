"use client"
import { Button, Input,useToast } from '@chakra-ui/react'

import React, { useState } from 'react'

export const Search = ({setUserData,setLoading}) => {
    const [query, setQuery] = useState("");
    const toast = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setUserData(null);
        try {
            const res = await fetch(`https://api.github.com/users/${query}`);
            const data = await res.json();
           
            if (data.message) {
                return toast({
                    title: 'Error',
                    description: data.message === "Not Found" ? "User not found" : data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
            setUserData(data);
            adduserToLocalStorage(data, query);
            
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            
        }
        finally {
            setLoading(false);
        }
    };
    const adduserToLocalStorage = (data,username) => {
    }
    return (
       <form onSubmit={handleSubmit}>
      <div>
         
                <Input
                     onChange={(e) =>setQuery(e.target.value)}
              variant={'outline'}
              placeholder='Type a username (i.e Brien-Austin)'
                    focusBorderColor='green.500' />
                <Button size='md' type="submit" colorScheme='whatsapp' mt={4} disabled={!query } opacity={!query ? 0.5 :1} >Search</Button>
      </div>
      </form>

  )
}
