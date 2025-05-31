import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchAccountStatus,
  fetchRecipient,
  getAccount,
  getRecipient,
  resetAccountStatus,
  resetRecipient,
  transferFunds
} from "../../Slice/AccountSlice";
import { useEffect, useMemo, useState } from "react";
import {
  closeLoader,
  openLoader,
  showLoader
} from "../../Slice/PageSlice";
import type { AppDispatch } from "../../Store/Store";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Text,
  Loader,
  Stack,
  Center
} from "@mantine/core";
import { FaX } from "react-icons/fa6";


interface Account {
  id: string;
  code: string;
  balance: string;
  symbol?: string;
  [key: string]: any;
}

interface WithdrawFormProps {
  setShowWithdrawForm: (show: boolean) => void;
}

const WithdrawForm = ({ setShowWithdrawForm }: WithdrawFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const accountList = useSelector(fetchAccount);
  const status = useSelector(fetchAccountStatus);
  const recipient = useSelector(fetchRecipient);
  const loader = useSelector(showLoader);

  const [transactionInfo, setTransactionInfo] = useState({
    recipientAccountNumber: "",
    amount: "",
    code: "USD"
  });

  const disableInputs = useMemo(() => !recipient, [recipient]);

  const [formAccount, setFormAccount] = useState<Account>(
    accountList.find((acc: Account) => acc.code === "USD") || {}
  );

  useEffect(() => {
    if (transactionInfo.code) {
      const acc = accountList.find((a: Account) => a.code === transactionInfo.code);
      if (acc) setFormAccount(acc);
    }
  }, [transactionInfo.code, accountList]);

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...transactionInfo, [field]: value };
    setTransactionInfo(updated);

    if (field === "code") {
      const acc = accountList.find((a: Account) => a.code === value);
      if (acc) setFormAccount(acc);
    }

    if (field === "recipientAccountNumber" && value.toString().length === 10) {
      dispatch(openLoader());
      dispatch(getRecipient({ ...updated, recipientAccountNumber: value }));
    } else if (field === "recipientAccountNumber") {
      dispatch(resetRecipient());
    }
  };

  const findRecipient = () => {
    dispatch(openLoader());
    dispatch(getRecipient({ ...transactionInfo }));
  };

  const transfer = () => {
    if (Number(transactionInfo.amount) > Number(formAccount.balance)) {
      alert("Insufficient funds");
      return;
    }

    dispatch(openLoader());
    dispatch(transferFunds(transactionInfo));
    dispatch(getAccount());

    setTimeout(() => {
      closeWithdrawForm();
    }, 1000);
  };

  const closeWithdrawForm = () => {
    dispatch(resetRecipient());
    setShowWithdrawForm(false);
  };

  useEffect(() => {
    if (status === "SUCCEEDED" || status === "FAILED") {
      setTimeout(() => {
        dispatch(closeLoader());
        dispatch(resetAccountStatus());

        if (status === "FAILED") {
          alert("Transaction Failed");
        }
      }, 2000);
    }
  }, [status, dispatch]);

  useEffect(() => {
  if (recipient && recipient.accountNumber) {
    setTransactionInfo((prev) => ({
      ...prev,
      recipientAccountNumber: recipient.accountNumber,
    }));
  }
}, [recipient]);


  return (
    <Modal
      opened
      onClose={closeWithdrawForm}
      title="Withdraw Funds"
      centered
      size="lg"
      overlayProps={{ blur: 2 }}
      withCloseButton={false}
    >
      <Stack gap={16}>
        {loader && (
          <Center>
            <Loader />
          </Center>
        )}

        <Group justify="space-between">
          <Text fw={500}>Select Account</Text>
          <Text size="sm" color="gray">
            Balance: {formAccount?.symbol || "$"} {formAccount?.balance}
          </Text>
        </Group>

        <Select
          label="Currency"
          value={transactionInfo.code}
          onChange={(val) => handleInputChange("code", val)}
          data={accountList.map((acc: Account) => ({
            value: acc.code,
            label: `${acc.symbol} ${acc.balance}`
          }))}
          placeholder="Select account"
        />

        <Select
          label="Select Bank"
          data={[{ value: "IO Bank", label: "IO Bank" }]}
          value="IO Bank"
          disabled
        />

        <TextInput
          label="Recipient Account Number"
          value={transactionInfo.recipientAccountNumber}
          onChange={(e) => handleInputChange("recipientAccountNumber", e.currentTarget.value)}
          disabled={false}
        />
        {recipient && (
          <Text size="sm" color="blue">
            Recipient: {recipient.accountName}
          </Text>
        )}

        <Button variant="light" onClick={findRecipient}>
          Find Recipient
        </Button>

        <NumberInput
          label="Amount"
          value={Number(transactionInfo.amount)}
          onChange={(val) => handleInputChange("amount", val)}
          disabled={disableInputs}
          min={0}
        />

        <Text size="xs" ta="right">
          You'll be charged: {formAccount?.symbol} {Number(transactionInfo.amount) * 0.01}
        </Text>

        <Button
          fullWidth
          onClick={transfer}
          disabled={
            disableInputs ||
            Number(transactionInfo.amount) > Number(formAccount.balance) ||
            Number(transactionInfo.amount) <= 0
          }
        >
          Withdraw Funds
        </Button>

        <Button
          variant="subtle"
          leftSection={<FaX size={16} />}
          color="red"
          onClick={closeWithdrawForm}
        >
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default WithdrawForm;
