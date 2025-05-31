import {
  Box,
  Title,
  Text,
  Stack,
  Divider,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { fetchCard } from "../../Slice/CardSlice";
import dayjs from "dayjs";
import { useState } from "react";
import {
  FaCreditCard,
  FaUser,
  FaMoneyBillWave,
  FaCalendarPlus,
  FaCalendarTimes,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapMarkedAlt,
  FaClock,
} from "react-icons/fa";

const generateRandomCVV = () => Math.floor(100 + Math.random() * 900).toString();
const generateRandomPIN = () => Math.floor(1000 + Math.random() * 9000).toString();

const maskCardNumber = (cardNumber: string | number) =>
  "**** **** **** " + String(cardNumber).slice(-4);

const formatCardNumber = (cardNumber: string | number) =>
  String(cardNumber).replace(/(.{4})/g, "$1 ").trim();


const iconStyles: React.CSSProperties = {
  minWidth: "1.25rem",
};

const CardDetails = () => {
  const card = useSelector(fetchCard);
  const [showCVV, setShowCVV] = useState(false);
  const [showPIN, setShowPIN] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const [_randomCVV] = useState(generateRandomCVV());
  const [randomPIN] = useState(generateRandomPIN());

  if (!card) {
    return (
      <Box mt="xl" ta="center">
        <Text c="dimmed">No card information available</Text>
      </Box>
    );
  }

  const fullCard = formatCardNumber(card.cardNumber);

  return (
    <Box
      className="w-full"
      mx="auto"
      mt="xl"
      p="lg"
      bg="gray.0"
      style={{
        borderRadius: 'var(--mantine-radius-lg)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Title order={3} mb="md" ta="center" c="indigo">
        Card Details
      </Title>

      <Stack gap="sm">
        {/* Card Number */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaCreditCard color="#4C6EF5" style={iconStyles} />
            <Text fw={500}>Card Number:</Text>
          </Group>
          <Group>
            <Text>{showCardNumber ? fullCard : maskCardNumber(card.cardNumber)}</Text>
            <Tooltip label={showCardNumber ? "Hide Card Number" : "Show Card Number"}>
              <ActionIcon onClick={() => setShowCardNumber((prev) => !prev)} variant="light">
                {showCardNumber ? <FaEyeSlash /> : <FaEye />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Card Holder */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaUser color="#228BE6" style={iconStyles} />
            <Text fw={500}>Card Holder:</Text>
          </Group>
          <Text>{card.cardHolder}</Text>
        </Group>

        {/* Balance */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaMoneyBillWave color="#40C057" style={iconStyles} />
            <Text fw={500}>Balance:</Text>
          </Group>
          <Text>${card.balance?.toFixed(2)}</Text>
        </Group>

        {/* Issue Date */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaCalendarPlus color="#FAB005" style={iconStyles} />
            <Text fw={500}>Issued On:</Text>
          </Group>
          <Text>{dayjs(card.iss).format("MMMM D, YYYY")}</Text>
        </Group>

        {/* Expiry Date */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaCalendarTimes color="#FA5252" style={iconStyles} />
            <Text fw={500}>Expires On:</Text>
          </Group>
          <Text>{dayjs(card.exp).format("MMMM D, YYYY")}</Text>
        </Group>

        {/* CVV */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaLock color="#7950F2" style={iconStyles} />
            <Text fw={500}>CVV:</Text>
          </Group>
          <Group>
            <Text>{showCVV ? card.cvv : "***"}</Text>
            <Tooltip label={showCVV ? "Hide CVV" : "Show CVV"}>
              <ActionIcon onClick={() => setShowCVV((prev) => !prev)} variant="light">
                {showCVV ? <FaEyeSlash /> : <FaEye />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* PIN */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaLock color="#BE4BDB" style={iconStyles} />
            <Text fw={500}>PIN:</Text>
          </Group>
          <Group>
            <Text>{showPIN ? randomPIN : "****"}</Text>
            <Tooltip label={showPIN ? "Hide PIN" : "Show PIN"}>
              <ActionIcon onClick={() => setShowPIN((prev) => !prev)} variant="light">
                {showPIN ? <FaEyeSlash /> : <FaEye />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Billing Address */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaMapMarkedAlt color="#15AABF" style={iconStyles} />
            <Text fw={500}>Billing Address:</Text>
          </Group>
          <Text>{card.billingAddress || "N/A"}</Text>
        </Group>

        <Divider my="sm" />

        {/* Last Updated */}
        <Group justify="space-between">
          <Group gap="xs">
            <FaClock color="#868E96" style={iconStyles} />
            <Text fw={500}>Last Updated:</Text>
          </Group>
          <Text size="sm" c="gray">
            {dayjs(card.updatedAt).format("MMMM D, YYYY h:mm A")}
          </Text>
        </Group>
      </Stack>
    </Box>
  );
};

export default CardDetails;
