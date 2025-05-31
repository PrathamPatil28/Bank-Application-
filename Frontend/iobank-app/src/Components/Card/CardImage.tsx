import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCard, getCard } from "../../Slice/CardSlice";

import {
  Box,
  Text,
  Group,
  Button,
  ThemeIcon,
  Flex,
} from "@mantine/core";
import { FaExchangeAlt, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiSimCard2Fill } from "react-icons/ri"; // Chip icon
import type { AppDispatch } from "../../Store/Store";

interface CardImageProps {
  setShowFundCardForm: (show: boolean) => void;
  setShowWithdrawForm: (show: boolean) => void;
}

const CardImage = ({ setShowFundCardForm, setShowWithdrawForm }: CardImageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector(fetchCard);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  return (
    <Box maw={400} mx="auto" mt="xl" style={{ perspective: 1000 }}>
      {/* Card Container with flip animation */}
      <Box
        onClick={() => setFlipped((f) => !f)}
        className="lg:!h-[220px] lg:!w-[400px]"
        style={{
          width: "100%",
          height: 220,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s",
          cursor: "pointer",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          borderRadius: 20,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          userSelect: "none",
        }}
      >
        {/* Front Side */}
        <Box 
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: 20,
            background: "linear-gradient(135deg, #101B3A, #2F4A8A)",
            color: "white",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Icons */}
          <Group justify="space-between" style={{ marginBottom: 16 }}>
            <ThemeIcon variant="light" color="#EFBF04" size={40} radius="md">
              <RiSimCard2Fill size={24} />
            </ThemeIcon>

            {/* Mastercard-style circles */}
            <Group gap={5}>
              <ThemeIcon size={36} radius="xl" color="red" />
              <ThemeIcon size={36} radius="xl" color="yellow" style={{ opacity: 0.7 }} />
            </Group>
          </Group>

          {/* Card Number */}
          <Text fw={600} size="xl" style={{ letterSpacing: 2 }}>
            {card?.cardNumber
              ? `**** **** **** ${card.cardNumber.toString().slice(-4)}`
              : "**** **** **** 1234"}
          </Text>

          {/* Card Details */}
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="gray.4" style={{ marginBottom: 4 }}>
                CARD HOLDER
              </Text>
              <Text fw={700}>{card?.cardHolder || "Card Holder"}</Text>
            </Box>

            <Box>
              <Text size="xs" c="gray.4" style={{ marginBottom: 4 }}>
                BALANCE
              </Text>
              <Text fw={700}>${card?.balance?.toFixed(2) || "0.00"}</Text>
            </Box>
          </Group>
        </Box>

        {/* Back Side */}
        <Box
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: 20,
            background: "#2E2E2E",
            color: "white",
            padding: 24,
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Magnetic strip */}
          <Box
            style={{
              height: 40,
              backgroundColor: "black",
              borderRadius: 4,
              marginBottom: 24,
            }}
          />

          {/* Signature and CVV container */}
          <Flex
            justify="space-between"
            align="center"
            style={{
              backgroundColor: "white",
              padding: "8px 16px",
              borderRadius: 4,
              marginBottom: 24,
              height: 40,
            }}
          >
            <Box
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "#f0f0f0",
              }}
            />

            <Box
              style={{
                width: "25%",
                height: "100%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                color: "#000",
                fontFamily: "'Courier New', Courier, monospace",
                letterSpacing: 2,
                fontSize: 18,
                borderRadius: 2,
              }}
            >
              {card?.cvv || "***"}
            </Box>
          </Flex>

          <Text size="xs" c="gray.5" style={{ marginTop: "auto", textAlign: "center", userSelect: "none" }}>
            © Your Bank • Customer Service: 1-800-123-4567
          </Text>
        </Box>
      </Box>

      {/* Action Buttons in one line */}
      <Flex mt="lg" justify="space-between" gap="sm">
        <Button
          variant="light"
          color="blue"
          fullWidth
          leftSection={<FaPlus />}
          onClick={() => setShowFundCardForm(true)}
        >
          Fund
        </Button>

        <Button
          variant="light"
          color="teal"
          fullWidth
          leftSection={<FaExchangeAlt />}
          onClick={() => setShowWithdrawForm(true)}
        >
          Withdraw
        </Button>

        <Button
          variant="light"
          color="red"
          fullWidth
          leftSection={<MdDelete />}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default CardImage;
