import GradientCard from "@/components/GradientCard";
import { Center, Text, Heading, Button, Separator } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<Center minH="100svh" w="100vw" p={4}>
			<GradientCard w="full" maxW="md">
				<Heading size="2xl">ITエンジニアワードウルフ</Heading>
				<Separator w="full" />
				<Text fontSize="lg">
					ITエンジニア用語で遊ぶ、新感覚のワードウルフ！1000個以上のお題から難易度、ジャンルが選べるので初心者から上級者まで楽しめます！
					完全無料、ダウンロードなしでブラウザ上でいつでもどこでも遊べます！
				</Text>
				<Button colorScheme="teal" size="lg" asChild>
					<Link to="/config">ゲームを始める</Link>
				</Button>
			</GradientCard>
		</Center>
	);
}
