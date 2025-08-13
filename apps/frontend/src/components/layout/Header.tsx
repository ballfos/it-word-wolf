import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<Box px={{ base: 4, md: 8 }} py="2" as="header" w="full" h="16">
			<HStack
				gap={4}
				align="center"
				borderBottom="4px solid"
				borderLeft="2px solid"
				borderColor="purple.600"
				roundedLeft="xl"
				w="fit-content"
			>
				<Link to="/" style={{ height: "100%" }}>
					<Image
						src="/logo.png"
						alt="Logo"
						h="14"
						rounded="xl"
						roundedRight="xl"
						borderRight="2px solid"
						borderTop="2px solid"
						borderColor="purple.600"
					/>
				</Link>
				<Heading size="2xl" fontWeight="bold">
					エンジニアワードウルフ
				</Heading>
			</HStack>
		</Box>
	);
}
