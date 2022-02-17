import { 
  Box, Button, Checkbox, Flex, Heading, Text,
  Icon, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue 
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
      
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Lista de Users</Heading>

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo User
              </Button>
            </Link>
          </Flex>

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
              <Tr>
                <Td px={["4","4","6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Telmo J. Moura</Text>
                    <Text fontSize="sm" color="gray.300">telmop1999@gmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>04 de Abril, 2022</Td>}
                <Td> 
                  <Button 
                    as="a" 
                    size="sm" 
                    fontSize="sm" 
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                  >
                    Editar
                  </Button> 
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}