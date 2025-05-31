import {
  Card,
  Group,
  Text,
  SimpleGrid,
  Title,
  Stack,
  Box,
  rem,
  Button,
  Tooltip,
  Divider,
  Badge,
 
  Paper,
} from "@mantine/core";
import {
  FaCreditCard,
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaShieldAlt,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import SectionContainer from "./Section/SectionContainer";

interface PaymentOptionProps {
  icon: IconType;
  title: string;
  description: string;
  action?: () => void;
}

const paymentOptions: PaymentOptionProps[] = [
  {
    icon: FaMoneyBill,
    title: "Bills Payment",
    description: "Pay electricity, subscriptions, utilities, and more with ease.",
    action: () => alert("Opening Bills Payment..."),
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Invoice",
    description: "Manage and settle invoices conveniently and securely anytime.",
    action: () => alert("Opening Invoice Payment..."),
  },
  {
    icon: FaCreditCard,
    title: "Card",
    description: "Pay using your credit or debit card with top-grade encryption.",
    action: () => alert("Opening Card Payment..."),
  },
];

const benefitList = [
  { icon: FaShieldAlt, title: "Secure Transactions", desc: "Top-level encryption and fraud protection." },
  { icon: FaClock, title: "Instant Processing", desc: "Payments reflect in real-time with no delays." },
  { icon: FaThumbsUp, title: "User Friendly", desc: "Clean design for smooth payment experience." },
];

const Payment = () => {
  return (
    <SectionContainer extraStyle="py-8">
      {/* Header */}
      <Stack gap="xs" mb="xl">
        <Title order={2} c="blue.7" fw={700}>
          Payment Dashboard
        </Title>
        <Text c="dimmed" size="sm" maw={600}>
          Access a wide range of payment options and manage your transactions securely from one place.
        </Text>
      </Stack>

      {/* Summary Overview */}
      <Paper shadow="xs" p="md" radius="md" mb="xl" withBorder>
        <Group justify="space-between">
          <Stack gap={4}>
            <Text size="lg" fw={600}>Total Payments Made</Text>
            <Text size="xl" c="blue" fw={700}>₹ 25,750</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={4}>
            <Text size="lg" fw={600}>Last Transaction</Text>
            <Text size="sm" c="dimmed">Invoice • ₹1,250 • 24 May 2025</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={4}>
            <Text size="lg" fw={600}>Pending Bills</Text>
            <Badge color="red" size="lg" radius="md">2 Due</Badge>
          </Stack>
        </Group>
      </Paper>

      {/* Quick Payment Options */}
      <Title order={4} c="gray.7" fw={600} mb="sm">
        Quick Payments
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb="xl">
        {paymentOptions.map(({ icon: Icon, title, description, action }, idx) => (
          <Card
            key={idx}
            shadow="md"
            padding="xl"
            radius="lg"
            withBorder
            className="hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <Stack gap="sm">
              <Group align="center" gap="md">
                <Tooltip label={title} withArrow>
                  <Box
                    bg="blue.1"
                    p="sm"
                    style={{ borderRadius: rem(10) }}
                    className="transition duration-300 hover:bg-blue.2"
                  >
                    <Icon color="#2563eb" size={32} />
                  </Box>
                </Tooltip>

                <Stack gap={0} style={{ flex: 1 }}>
                  <Text fw={600} size="lg">{title}</Text>
                  <Text c="dimmed" size="sm">{description}</Text>
                </Stack>
              </Group>

              <Button
                mt="sm"
                variant="light"
                color="blue"
                radius="md"
                fullWidth
                onClick={action}
              >
                Pay Now
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Why Use This Section */}
      <Title order={4} c="gray.7" fw={600} mb="sm">
        Why Use Our Payment System?
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb="xl">
        {benefitList.map(({ icon: Icon, title, desc }, idx) => (
          <Group key={idx} align="flex-start" gap="md">
            <Box bg="blue.1" p="sm" style={{ borderRadius: rem(10) }}>
              <Icon color="#2563eb" size={24} />
            </Box>
            <Stack gap={0}>
              <Text fw={600}>{title}</Text>
              <Text size="sm" c="dimmed">{desc}</Text>
            </Stack>
          </Group>
        ))}
      </SimpleGrid>

      {/* CTA Banner */}
      <Card withBorder p="xl" radius="lg" shadow="md" bg="blue.0">
        <Group justify="space-between" wrap="wrap">
          <Stack gap={4}>
            <Title order={4} fw={700} c="blue.7">Need Assistance?</Title>
            <Text size="sm" c="dimmed">Our support team is available 24/7 to help you with your payments.</Text>
          </Stack>
          <Button size="md" color="blue" radius="md">Contact Support</Button>
        </Group>
      </Card>
    </SectionContainer>
  );
};

export default Payment;
