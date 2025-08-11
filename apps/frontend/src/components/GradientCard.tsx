import { VStack } from "@chakra-ui/react";

interface GradientCardProps extends React.ComponentProps<typeof VStack> {
	children: React.ReactNode;
}

export default function GradientCard({
	children,
	...props
}: GradientCardProps) {
	return (
		<VStack
			bgGradient="to-br"
			gradientFrom="teal.700"
			gradientTo="blue.700"
			p={4}
			gap={4}
			borderRadius="md"
			boxShadow="lg"
			{...props}
		>
			{children}
		</VStack>
	);
}
