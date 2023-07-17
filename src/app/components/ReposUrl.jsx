"use client"
import React, { useState, useEffect } from 'react';
import { useToast,Text, Flex ,Badge,Spinner, Button} from '@chakra-ui/react';
import Link from  '../chakra-next'

const ReposUrl = ({ reposUrl }) => {
  const toast = useToast();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    console.log("Git repos here",repos)

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch repository data');
        }
        setRepos(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reposUrl, toast]);

    return (
      <>
      <Text
          textAlign={'center'}
          letterSpacing={1.5}
          fontSize={'3xl'}
          fontWeight={'bold'}
          color={'green.400'}
          mt={-10}>
          REPOSITORIES
          
      </Text>
      
      {
        loading && (
                    <Flex justifyContent={'center'}>
                        <Spinner size={'xl'} my={4}/>
            </Flex>
        )
            }
           {repos.sort((a,b) => b.stargazers_count - a.stargazers_count).map((repo,index) => 
 
           {
               if (index > 4 && !showMore) return null;
               return (
                    <Flex key={repo.id} padding={4} bg={"whiteAlpha.200"} _hover={{ bg: "whiteAlpha.400" }} my={4} px={10} gap={4} transition={'all 0.3s ease'} justifyContent={'space-between'} alignItems={'center'}>
    <Flex flex={1} direction={'column'}>
   <a href={repo.html_url}  _hover={{ textDecoration: 'underline', textDecorationColor: 'whiteAlpha.400'  }} fontSize={'md'} fontWeight={'bold'} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </a>
      <Badge fontSize={'0.7rem'} mt={1} colorScheme={'whatsapp'} w={'min-content'} textAlign={'center'} px={'1'}>
        Language: {repo.language || 'Not Specified'}
      </Badge>
                   </Flex>
                   <Flex flex={1} gap={4}
                       ml={6}>
                       <Badge colorScheme='orange' fontSize={'0.9em'}  flex={1} textAlign={'center'}>
                           Stars:{repo.stargazers_count}
                       </Badge>
                        <Badge  colorScheme='pink'fontSize={'0.9rem'}  flex={1} textAlign={'center'}>
                           Forks:{repo.forks_count}
                       </Badge>
                       <Badge colorScheme='cyan' fontSize={'0.9rem'}  flex={1} textAlign={'center'}>
                           Watchers:{repo.watchers_count}
                       </Badge>
                       </Flex>
               </Flex>
               )
           })}
            {showMore && (
                <Flex justifyContent={'center'} py={4}>
                    <Button  size={'md'} colorScheme='whatsapp' onClick={()=>setShowMore(false)}>Show Less</Button>
                </Flex>
            )}
             {!showMore && repos.length > 5  &&(
                <Flex justifyContent={'center'} py={4}>
                    <Button  size={'md'} colorScheme='whatsapp' onClick={()=>setShowMore(true)}>Show More</Button>
                </Flex>
            )}

    </>
  );
};

export default ReposUrl;
