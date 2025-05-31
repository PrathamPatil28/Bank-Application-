import {
    Modal,
    Stack,
    Text,
    Select,
    Button,
    Loader,
    Center,
   
    Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../Store/Store";
import {
    createAccount,
    fetchAccount,
    fetchAccountStatus,
    getAccount,
    resetAccountStatus,
} from "../../Slice/AccountSlice";
import { closeLoader, openLoader, showLoader } from "../../Slice/PageSlice";
import { FaTimes } from "react-icons/fa";

interface NewAccountProps {
    setShowCreateAccountForm: (show: boolean) => void;
}

const NewAccount = ({ setShowCreateAccountForm }: NewAccountProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(fetchAccountStatus);
    const loader = useSelector(showLoader);
    const accountList = useSelector(fetchAccount);
    const [currency, setCurrency] = useState("USD");
    const [accountType, setAccountType] = useState([
        { code: "USD", symbol: "$", label: "United States" },
        { code: "EUR", symbol: "€", label: "European Union" },
        { code: "GBP", symbol: "£", label: "United Kingdom" },
        { code: "JPY", symbol: "¥", label: "Japan" },
        { code: "NGN", symbol: "₦", label: "Nigeria" },
        { code: "INR", symbol: "₹", label: "India" },
    ]);

    const accountTypeList = accountList.map((account: any) => account.code);

    const create = () => {
        const accountDetails = accountType.find((acc) => acc.code === currency);
        if (!accountDetails) return;

        dispatch(openLoader());
        dispatch(createAccount(accountDetails));
        dispatch(getAccount());
    };

    useEffect(() => {
        if (status === "SUCCEEDED") {
            setTimeout(() => {
                dispatch(closeLoader());
                setShowCreateAccountForm(false);
                dispatch(resetAccountStatus());
            }, 1500);
        }

        if (status === "FAILED") {
            setTimeout(() => {
                dispatch(closeLoader());
                dispatch(resetAccountStatus());
                alert("Account Creation Failed");
            }, 1500);
        }

        const updateList = () => {
            const filteredList = accountType.filter(
                (account) => !accountTypeList.includes(account.code)
            );
            setAccountType(filteredList);
            if (filteredList.length > 0) setCurrency(filteredList[0].code);
        };

        updateList();
    }, [dispatch, status]);

    return (
        <Modal
            opened
            onClose={() => setShowCreateAccountForm(false)}

            centered
            size="md"
            withCloseButton={false}
            overlayProps={{ blur: 2 }}
        >
            <Stack gap="lg" pos="relative">
                {loader && (
                    <Center className="absolute inset-0 bg-white/80 z-10 rounded-lg">
                        <Loader />
                    </Center>
                )}

                <Group justify="space-between" align="center" mb="md">
                    <Text size="xl" fw={700}>
                        Create New Bank Account
                    </Text>

                    <Button
                        variant="subtle"
                        color="red"
                        radius="md"
                        size="md"
                        onClick={() => setShowCreateAccountForm(false)}
                        leftSection={<FaTimes size={14} />}
                    >
                        Cancel
                    </Button>
                </Group>



                <Text fw={600}>Choose Currency Type</Text>

                <Select
                    data={accountType.map((type) => ({
                        value: type.code,
                        label: `${type.label} (${type.symbol})`,
                    }))}
                    value={currency}
                    onChange={(val) => setCurrency(val!)}
                    placeholder="Select currency"
                    radius="md"
                    withAsterisk
                />

                <Button
                    fullWidth
                    onClick={create}
                    disabled={accountType.length === 0}
                    color="blue"
                    radius="md"
                >
                    Create Bank Account
                </Button>
            </Stack>
        </Modal>
    );
};

export default NewAccount;
