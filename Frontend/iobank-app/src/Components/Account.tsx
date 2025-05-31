import { useLocation, useNavigate } from "react-router-dom";
import SectionContainer from "./Section/SectionContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount, fetchAccountStatus, getAccount } from "../Slice/AccountSlice";
import type { AppDispatch } from "../Store/Store";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import NewAccount from "./Account/NewAccount";
import WithdrawForm from "./Account/WithdrawForm";
import DepositForm from "./Account/DepositForm";
import ActionButtons from "./Account/Button";
import { Button, Group, Paper, Text, Image, Stack, } from "@mantine/core";


import { Grid, Box } from "@mantine/core";
import { FaUser, FaHashtag, FaMoneyBill, FaGlobe, FaCode, FaTag, FaDollarSign, FaCheck, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";




// Map currency codes to ISO 3166-1 alpha-2 country codes
const currencyToCountryMap: { [key: string]: string } = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  NGN: "ng",
  INR: "in",
};

type AccountType = {
  accountId: string;
  accountName: string;
  accountNumber: number;
  balance: number;
  currency: string;
  code: string;
  label: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  type: string;
};


const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const accountList = useSelector(fetchAccount) as AccountType[];
  const accountStatus = useSelector(fetchAccountStatus);

  const [currentAccount, setCurrentAccount] = useState<AccountType | null>(null);
  const [currency, setCurrency] = useState<string>("");

  const [showAcconutCreateForm, setShowAccountCreateForm] = useState(false);
  const [showWidthdrawForm, setShowWithdrawForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [toOther, setToOther] = useState(false); // ✅ this is what was missing


  const navigateCurrency = (code: string) => {
    navigate(`/dashboard/accounts?currency=${code}`);
  };

  const navigatePage = (path: string) => {
    navigate(path);
  };

  // ✅ Fetch accounts on mount
  useEffect(() => {
    dispatch(getAccount());
  }, []);

  // ✅ Set currency & current account when accountList or URL changes
  useEffect(() => {
    if (accountList.length > 0) {
      const currencyParams = new URLSearchParams(location.search);
      const paramCurrency = currencyParams.get("currency") ?? accountList[0].code;

      if (paramCurrency !== currency) {
        setCurrency(paramCurrency);
      }

      const matched = accountList.find(acc => acc.code === paramCurrency);

      // Avoid repeatedly setting the same value
      if (matched && matched !== currentAccount) {
        setCurrentAccount(matched);
      }

      console.log("currency param:", paramCurrency, "| matchedAccount:", matched);
    }
  }, [accountList, location.search]); // correct dependencies


  if (accountStatus === "LOADING") {
    return (
      <section>
        <SectionContainer>
          <p>Loading accounts...</p>
        </SectionContainer>
      </section>
    );
  }



  return (
    <section className="fontFamily-roboto ">

      {showAcconutCreateForm && <NewAccount setShowCreateAccountForm={setShowAccountCreateForm} />}

      {showWidthdrawForm && <WithdrawForm setShowWithdrawForm={setShowWithdrawForm} />}

      {showDepositForm && <DepositForm setShowDepositForm={setShowDepositForm} />}
      {/* Header Section */}
      <SectionContainer extraStyle="overflow-x-auto items-center h-[560px]">
        {/* Top Bar */}
        <Group justify="space-between" align="center" wrap="wrap" className="w-full">
          <Text fw={700} c="gray.6" size="sm">
            Balances ({accountList.length})
          </Text>
          <Button
            leftSection={<FaPlus />}
            color="blue"
            size="sm"
            radius="md"
            onClick={() => setShowAccountCreateForm(true)}
          >
            Create New Account
          </Button>
        </Group>

        {/* Currency Tabs */}
        {accountList.length > 0 && (
          <Group
            justify="center"
            wrap="wrap"
            mt="md"
            className="sm:flex-row sm:flex-wrap flex-col"
          >
            <Paper
              shadow="xs"
              radius="xl"
              p="xs"
              className="bg-gray-200 text-sm sm:text-xl !flex !gap-3"
            >
              {accountList.map((acc: AccountType, id: number) => (
                <Button
                  key={id}
                  onClick={() => navigateCurrency(acc.code)}
                  variant={acc.code === currency ? "filled" : "light"}
                  color="gray"
                  size="sm"
                  radius="md"
                  className={`pt-2 pb-2 ${acc.code === currency ? "font-semibold" : ""}`}
                >
                  {acc.code}
                </Button>
              ))}
            </Paper>
          </Group>
        )}

        {/* Current Account Section */}
        {currentAccount ? (
          <>
            <Stack align="center" mt="lg" gap="md">
              <Text className="!text-2xl" fw={700} c="gray.7">
                Available Balance
              </Text>

              <Stack align="center" gap="xs">
                <Image
                  src={`https://flagcdn.com/64x48/${currencyToCountryMap[currentAccount.code] || "un"}.png`}
                  w={130}
                  h={82}
                  alt={`${currentAccount.code} Flag`}
                  radius="sm"
                  className="shadow-md"
                />
                <Text className="!text-xl cursor-pointer" fw={700} c="gray.7" >
                  {`${currentAccount.symbol} ${currentAccount.balance.toFixed(2)} `}
                </Text>


              </Stack>
            </Stack>

            {/* Deposit Options */}
            <ActionButtons
              setShowDepositForm={setShowDepositForm}
              setToOther={setToOther}
              setShowWithdrawForm={setShowWithdrawForm}
              navigatePage={navigatePage}
              showDepositForm={showDepositForm}
              toOther={toOther}
            />


          </>


        ) : (
          <div className="mt-5 text-center text-gray-500">No account found for selected currency.</div>
        )}


      </SectionContainer>
      {/* Detailed Account Info Section */}
<SectionContainer extraStyle="mt-6">
  <Box className="w-full max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
    <Text fw={700} size="xl" mb="lg" c="gray.8" className="text-center">
      Account Details
    </Text>
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaUser className="inline mr-2 text-blue-500" /> <strong>Name:</strong> {currentAccount?.accountName}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaHashtag className="inline mr-2 text-green-600" /> <strong>Number:</strong> {currentAccount?.accountNumber}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaMoneyBill className="inline mr-2 text-emerald-600" /> <strong>Balance:</strong> {currentAccount?.symbol} {currentAccount?.balance.toFixed(2)}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaGlobe className="inline mr-2 text-yellow-600" /> <strong>Currency:</strong> {currentAccount?.currency}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaCode className="inline mr-2 text-purple-600" /> <strong>Code:</strong> {currentAccount?.code}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaTag className="inline mr-2 text-pink-600" /> <strong>Label:</strong> {currentAccount?.label}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaDollarSign className="inline mr-2 text-indigo-600" /> <strong>Symbol:</strong> {currentAccount?.symbol}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaCheck className="inline mr-2 text-teal-600" /> <strong>Status:</strong> <span className="text-base font-semibold"> Active</span></Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaLayerGroup className="inline mr-2 text-rose-600" /> <strong>Type:</strong> Saving</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaCalendarAlt className="inline mr-2 text-gray-600" /> <strong>Created:</strong> {currentAccount?.createdAt ? new Date(currentAccount.createdAt).toLocaleString() : "N/A"}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Text><FaCalendarAlt className="inline mr-2 text-gray-600" /> <strong>Updated:</strong> {currentAccount?.updatedAt ? new Date(currentAccount.updatedAt).toLocaleString() : "N/A"}</Text>
      </Grid.Col>
    </Grid>
  </Box>
</SectionContainer>

    </section>

  );
};

export default Account;


