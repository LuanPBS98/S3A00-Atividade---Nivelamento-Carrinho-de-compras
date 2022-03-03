import { useState } from "react";
import { Box, FormControl, Input, Text,FormLabel, Button, Container, UnorderedList, ListItem} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "react-toastify";

const Page = () => {
    const [ filter,setFilter ] = useState("");
    const [ products,setProducts ] = useState([]);
    const [ productId,setProductId ] = useState(0);
    const FormSchema = yup.object().shape({
        name:yup.string().required("nome do produto obrigatório"),
        description:yup.string().required("descrição do produto obrigatório"),
        price:yup.number().required("preço do produto obrigatório"),
        discount:yup.number().required("valor do desconto obrigatório"),
    });
    const { register,handleSubmit,formState: { errors }} = useForm({
        resolver:yupResolver(FormSchema)
    });
    const handleRegister = (data) => {
        if(data.price >= data.discount){
            setProducts([...products,{...data,productId}]);
            setProductId(productId+1);
        }else{
            toast.error("desconto maior que o valor do produto");
        }
    };
    return (
        <Box 
        w="100vw" 
        d="flex"
        justifyContent="space-evenly">
            <Box 
            d="flex"
            flexDir="column">
                <Box
                w="300px"
                h="100px"
                bg="#A0302E"
                border="1px solid #AF5138"
                borderRadius="4px"
                d="flex"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
                color="#D6B5AD"
                mb="30px">
                    <Text>Valor da compra : {products.reduce((acc,cur)=>acc+cur.price,0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                    <Text>Valor de desconto : {products.reduce((acc,cur)=>acc+cur.discount,0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                </Box>
                <Box
                bg="#A0302E"
                border="1px solid #AF5138"
                borderRadius="4px"
                h="600px"
                >
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <FormControl 
                        flexDir="column"
                        alignItems="center"
                        w="300px"
                        h="600px"
                        d="flex"
                        justifyContent="space-evenly"
                        color="#D6B5AD">
                            {/*===================================================*/}
                            <Box name="name">
                                <FormLabel 
                                fontSize="18px">
                                    Nome do produto
                                </FormLabel>
                                <Input
                                {...register("name")}
                                bg="#868E96">
                                </Input>
                                <Text 
                                color="red" 
                                marginBottom="20px"
                                fontSize="10px"
                                fontStyle="italic">
                                    {errors.name?.message}
                                </Text>
                            </Box>
                            {/*===================================================*/}
                            <Box name="description">
                                <FormLabel 
                                fontSize="18px">
                                    Descrição do produto
                                </FormLabel>
                                <Input
                                {...register("description")}
                                bg="#868E96">
                                </Input>
                                <Text 
                                color="red" 
                                marginBottom="20px"
                                fontSize="10px"
                                fontStyle="italic">
                                    {errors.description?.message}
                                </Text>
                            </Box>
                            {/*===================================================*/}
                            <Box name="price">
                                <FormLabel 
                                fontSize="18px">
                                    Preço do produto
                                </FormLabel>
                                <Input
                                {...register("price")}
                                bg="#868E96">
                                </Input>
                                <Text 
                                color="red" 
                                marginBottom="20px"
                                fontSize="10px"
                                fontStyle="italic">
                                    {errors.price?.message}
                                </Text>
                            </Box>
                            {/*===================================================*/}
                            <Box name="discount">
                                <FormLabel 
                                fontSize="18px">
                                    Desconto do produto
                                </FormLabel>
                                <Input
                                {...register("discount")}
                                bg="#868E96">
                                </Input>
                                <Text 
                                color="red" 
                                marginBottom="20px"
                                fontSize="10px"
                                fontStyle="italic">
                                    {errors.discount?.message}
                                </Text>
                            </Box>
                            {/*===================================================*/} 
                            <Button 
                            bg="#D6B5AD"
                            color="#020526"
                            type="submit">adicionar produto</Button>                      
                        </FormControl>
                    </form>
                </Box>
            </Box>
            <Box
            d="flex"
            flexDir="column">
                <Box
                w="300px"
                h="100px"
                bg="#A0302E"
                border="1px solid #AF5138"
                borderRadius="4px"
                d="flex"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
                color="#D6B5AD"
                mb="30px">
                    <Text>Pesquisa</Text>
                    <Input 
                    bg="#D6B5AD"
                    w="80%"
                    type="text" 
                    value={filter} 
                    color="#020526"
                    onChange={(evt) => setFilter(evt.target.value)}/>
                </Box>
                <UnorderedList
                w="300px"
                bg="#A0302E"
                border="1px solid #AF5138"
                borderRadius="4px"
                d="flex"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
                color="#D6B5AD"
                margin="0px"
                listStyleType="none"
                padding="10px">
                    {products.filter((item) =>item.name.toLowerCase().includes(filter)).map((item,index) => (
                        <ListItem 
                        key={`key ${index}`}
                        bg="#020526"
                        w="90%"
                        borderRadius="4px"
                        mb="15px">
                            <Text
                            borderBottom="2px solid #AF5138"
                            borderRadius="4px"
                            padding="5px">nome: {item.name}</Text>
                            <Text
                            borderBottom="2px solid #AF5138"
                            borderRadius="4px"
                            padding="5px">id: {item.productId}</Text>
                            <Text
                            borderBottom="2px solid #AF5138"
                            borderRadius="4px"
                            padding="5px">preço: {item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                            <Text
                            borderRadius="4px"
                            padding="5px">desconto: {item.discount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </Box>
    )
}

export default Page;