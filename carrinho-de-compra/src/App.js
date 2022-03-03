import { ChakraProvider } from "@chakra-ui/react";
import Page from "./Pages";

function App() {
  return (
    <ChakraProvider>
      <Page/>
    </ChakraProvider>
  )
}

export default App;