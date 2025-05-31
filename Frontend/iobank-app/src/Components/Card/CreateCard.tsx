import { useDispatch, useSelector } from "react-redux";
import { closeLoader, openLoader, showLoader } from "../../Slice/PageSlice";
import { createCard, fetchCardStatus, resetCardStatus } from "../../Slice/CardSlice";
import type { AppDispatch } from "../../Store/Store";
import { fetchAccount } from "../../Slice/AccountSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loaders from "../Loaders";

import {
  Card,
  Text,
  Button,
  TextInput,
  Stack,
  Group,
  Center,
  Container,
} from "@mantine/core";
import { FaPlus, FaDollarSign } from "react-icons/fa";

const CreateCard = () => {
  const loader = useSelector(showLoader);
  const status = useSelector(fetchCardStatus);
  const dispatch = useDispatch<AppDispatch>();
  const accountList = useSelector(fetchAccount);
  const [usdAccount, setUsdAccount] = useState<any>(null);
  const navigate = useNavigate();

  const createUsdAccount = () => {
    navigate("/dashboard/accounts");
  };

  useEffect(() => {
    setUsdAccount(accountList.filter((account: any) => account.code === "USD")[0]);
  }, [status, accountList]);

  const CreateCardForm = ({ status }: { status: string }) => {
    const [amount, setAmount] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
    };

    const CreateCreditCard = () => {
      dispatch(openLoader());
      dispatch(createCard({ accountCode: usdAccount.code, amount: Number(amount) }));
    };

    useEffect(() => {
      if (status === "SUCCEEDED" || status === "FAILED") {
        setTimeout(() => {
          dispatch(closeLoader());
          dispatch(resetCardStatus());
        }, 3000);
      }
    }, [status, dispatch]);

    return (
      <Container size="sm" mt="md">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
              You'll be charged a <strong>$1 service fee</strong> and must deposit a minimum of <strong>$1</strong> to fund your card.
            </Text>

            {loader && (
              <Center>
                <Loaders />
              </Center>
            )}

            <TextInput
              leftSection={<FaDollarSign />}
              label="Funding Amount"
              placeholder="Amount to fund card"
              value={amount}
              type="number"
              onChange={handleInputChange}
              disabled={loader}
              required
            />

            <Group justify="center" mt="md">
              <Button
                leftSection={<FaPlus />}
                onClick={CreateCreditCard}
                disabled={!amount || Number(amount) < 1 || loader}
                loading={loader}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                {loader ? "Processing..." : "Create Card"}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    );
  };

  return (
    <>
      {usdAccount ? (
        <CreateCardForm status={status} />
      ) : (
        <Container size="sm" mt="xl">
          <Card shadow="sm" p="xl" radius="md" withBorder>
            <Stack gap="lg" justify="center">
              <Text size="sm" c="red" style={{ textAlign: "center" }}>
                You need to have a USD account before creating a card.
              </Text>
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "blue" }}
                leftSection={<FaPlus />}
                onClick={createUsdAccount}
              >
                Create USD Account
              </Button>
            </Stack>
          </Card>
        </Container>
      )}
    </>
  );
};

export default CreateCard;
