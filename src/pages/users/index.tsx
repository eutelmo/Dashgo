import { 
  Box, Button, Checkbox, Flex, Heading, Text,
  Icon, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Spinner , Link
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setpage] = useState(1);
  const {data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userid: string) {
    await queryClient.prefetchQuery(['user', userid], async () => {
      const response = await api.get(`users/${userid}`)

      return response.data;
    },{
      staleTime: 1000 * 60 * 10, // 10 min
    })
  }
  
  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
      
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Lista de Users
               { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo User
              </Button>
            </NextLink>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ): error ? (
            <Flex justify="center">
              <Text> Falha na requisição</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="WhiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4","4","6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuario</Th>
                    { isWideVersion && <Th>Data de inscrição</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return(
                      <Tr key={user.id}>
                          <Td px={["4","4","6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          { isWideVersion && <Td>{user.createdAt}</Td>}
                          <Td> 
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setpage}
              />

            </>
          ) }
        </Box>
      </Flex>
    </Box>
  );
}