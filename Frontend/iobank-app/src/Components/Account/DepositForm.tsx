import {
  Modal,
  Stack,
  Text,
  Group,
  TextInput,
  NumberInput,
  Select,
  Button,
  Loader,
  Center
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../Store/Store";
import { FaX } from "react-icons/fa6";
import {
  fetchAccount,
  depositFunds,
  depositToOther,
  getAccount,
  resetAccountStatus,
  fetchAccountStatus
} from "../../Slice/AccountSlice";
import { openLoader, closeLoader, showLoader } from "../../Slice/PageSlice";

interface DepositFormProps {
  setShowDepositForm: (show: boolean) => void;
  toOther?: boolean;
}

const DepositForm = ({ setShowDepositForm, toOther = false }: DepositFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const accountList = useSelector(fetchAccount);
  const status = useSelector(fetchAccountStatus);
  const loader = useSelector(showLoader);

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: 0,
    code: "INR"
  });

  const selectedAccount = accountList.find((acc: any) => acc.code === formData.code);

  // For self-deposit, auto-fill account number
  useEffect(() => {
    if (!toOther && selectedAccount) {
      setFormData((prev) => ({
        ...prev,
        accountNumber: selectedAccount.accountNumber.toString()
      }));
    }
  }, [formData.code, toOther, selectedAccount]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitDeposit = () => {
    if (formData.amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    dispatch(openLoader());
    const action = toOther ? depositToOther(formData) : depositFunds(formData);

    dispatch(action).then(() => {
      dispatch(getAccount());
      setTimeout(() => {
        dispatch(closeLoader());
        setShowDepositForm(false);
      }, 1000);
    });
  };

  useEffect(() => {
    if (status === "FAILED") {
      dispatch(closeLoader());
      alert("Deposit Failed");
    }
    if (status === "SUCCEEDED") {
      dispatch(resetAccountStatus());
    }
  }, [status, dispatch]);

  return (
    <Modal
      opened
      onClose={() => setShowDepositForm(false)}
      title={toOther ? "Deposit to Another Account" : "Deposit Funds"}
      size="lg"
      centered
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
          <Text size="sm" c="dimmed">
            Current Balance: {selectedAccount?.symbol} {selectedAccount?.balance.toFixed(2)}
          </Text>
        </Group>

        <Select
          label="Currency"
          value={formData.code}
          onChange={(val) => handleChange("code", val)}
          data={accountList.map((acc: any) => ({
            value: acc.code,
            label: `${acc.symbol} ${acc.balance.toFixed(2)}`
          }))}
        />

        <TextInput
          label="Account Number"
          value={formData.accountNumber}
          onChange={(e) => handleChange("accountNumber", e.currentTarget.value)}
          disabled={!toOther}
        />

        <NumberInput
          label="Amount"
          value={formData.amount}
          onChange={(val) => handleChange("amount", val)}
          min={0}
        />

        <Button fullWidth onClick={submitDeposit}>
          {toOther ? "Deposit to Another" : "Deposit Funds"}
        </Button>

        <Button
          variant="subtle"
          leftSection={<FaX size={16} />}
          color="red"
          onClick={() => setShowDepositForm(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default DepositForm;
