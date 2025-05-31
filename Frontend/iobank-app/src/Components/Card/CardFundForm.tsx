import { useDispatch, useSelector } from "react-redux";
import { fetchAccount, getAccount } from "../../Slice/AccountSlice";
import type { AppDispatch } from "../../Store/Store";
import { useEffect, useState } from "react";
import {
  creditCard,
  fetchCardStatus,
  getCard,
  resetCardStatus,
} from "../../Slice/CardSlice";
import { closeLoader, openLoader, showLoader } from "../../Slice/PageSlice";
import Loaders from "../Loaders";


import {
  Box,
  Button,
  Select,
  Text,
  TextInput,
  Group,
  Title,
  CloseButton,
  Stack,
  Notification,
} from "@mantine/core";

interface CardFundFormProps {
  setShowFundCardForm: (show: boolean) => void;
}

const CardFundForm = ({ setShowFundCardForm }: CardFundFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loader = useSelector(showLoader);
  const accountList = useSelector(fetchAccount);
  const status = useSelector(fetchCardStatus);

  const [account, setAccount] = useState<{ balance?: number; code?: string } | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const usdAccount = accountList.find((acc: any) => acc.code === "USD") || null;
  setAccount(usdAccount);

  if (status === "SUCCEEDED") {
    // ✅ Refresh card data after successful credit
    dispatch(getCard());

    setTimeout(() => {
      dispatch(closeLoader());
      dispatch(resetCardStatus());
      setShowFundCardForm(false);
    }, 2000);
  }

  if (status === "FAILED") {
    setTimeout(() => {
      dispatch(closeLoader());
      dispatch(resetCardStatus());
      setError("Card funding failed. Please try again.");
    }, 2000);
  }
}, [status, dispatch, accountList, setShowFundCardForm]);


  const credit = () => {
    setError(null);
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (account == null) {
      setError("No USD account found.");
      return;
    }
    dispatch(openLoader());
    if (!account.code) {
      setError("Account code is missing.");
      dispatch(closeLoader());
      return;
    }
    dispatch(creditCard({ amount: Number(amount) }));
    dispatch(getAccount());
  };

  // Close modal when clicking overlay
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowFundCardForm(false);
    }
  };

  return (
    <Box
      onClick={onOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 8,
          width: "90vw",
          maxWidth: 400,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          position: "relative",
        }}
      >
        {loader && <Loaders />}
        <Group justify="space-between" mb="md">
          <Title order={4}>Fund Card</Title>
          <CloseButton onClick={() => setShowFundCardForm(false)} />
        </Group>

        {error && (
          <Notification color="red" onClose={() => setError(null)} mb="md">
            {error}
          </Notification>
        )}

        <Stack gap="md">
          <Box>
            <Text size="sm" fw={500} mb={4}>
              Select Account
            </Text>
            <Text size="xs" c="dimmed" mb={6}>
              Card Balance: {account?.code ?? "N/A"} ${account?.balance?.toFixed(2) ?? "0.00"}
            </Text>
            <Select disabled data={[{ value: "USD", label: "USD" }]} value="USD" />
          </Box>

          <TextInput
            label="Amount"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            min={0}
            required
          />

          <Button fullWidth color="blue" onClick={credit}>
            Credit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardFundForm;
